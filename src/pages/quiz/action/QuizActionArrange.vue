<template>
  <q-page id="QuizActionArrange" class="flex flex-center q-pa-sm bg-transparent">
    <QuizMediaComponent />
    <div class="game">
      <q-card class="quiz-card">
        <q-card-section>
          <div class="title">🚀 Quiz Action</div>
          <!-- <div class="subtitle">Match - Present Tense!</div> -->
          <div class="question">Susun kata dengan tepat</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="between" class="q-pa-none q-pa-md">
          <div class="timer" id="timer">⏱️ {{ timeLeft }}</div>
          <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
        </q-card-actions>

        <q-card-section>
          <div class="answer" id="answer"></div>
          <div class="controls">
            <button class="check" id="btnCheck">✔️&nbsp;&nbsp;CEK</button>
            <button class="reset" id="btnReset">❌&nbsp;&nbsp;RESET</button>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import playErrorFX from "src/composables/quiz/playErrorFX";
import playTrueFX from "src/composables/quiz/playTrueFX";
import confetti from "src/composables/quiz/confetti";
import shake from "src/composables/quiz/shake";

import { mapActions, mapState } from "pinia";
import { useTimerStore } from "src/stores/useTimerStore";

export default {
  computed: {
    ...mapState(useTimerStore, ["timeDefault", "timeLeft"]),
  },
  methods: {
    ...mapActions(useTimerStore, ["startTimer", "resetTimer"]),
  },
  mounted() {
    const vm = this;

    /* ================= DATA ================= */
    const list_questions = [
      // he / she
      { w: ["he", "plays", "football"] },
      { w: ["he", "reads", "books"] },
      { w: ["he", "likes", "music"] },
      { w: ["he", "watches", "tv"] },
      { w: ["he", "drinks", "milk"] },
      { w: ["he", "eats", "rice"] },
      { w: ["he", "runs", "fast"] },
      { w: ["he", "writes", "letters"] },
      { w: ["he", "drives", "cars"] },
      { w: ["he", "opens", "door"] },

      { w: ["she", "plays", "piano"] },
      { w: ["she", "reads", "stories"] },
      { w: ["she", "likes", "flowers"] },
      { w: ["she", "watches", "movies"] },
      { w: ["she", "drinks", "juice"] },
      { w: ["she", "eats", "fruit"] },
      { w: ["she", "runs", "daily"] },
      { w: ["she", "writes", "notes"] },
      { w: ["she", "draws", "pictures"] },
      { w: ["she", "sings", "songs"] },

      // I
      { w: ["I", "play", "games"] },
      { w: ["I", "read", "books"] },
      { w: ["I", "like", "music"] },
      { w: ["I", "watch", "tv"] },
      { w: ["I", "drink", "coffee"] },
      { w: ["I", "eat", "noodles"] },
      { w: ["I", "study", "english"] },
      { w: ["I", "write", "homework"] },
      { w: ["I", "use", "computer"] },
      { w: ["I", "learn", "daily"] },

      // you
      { w: ["you", "play", "football"] },
      { w: ["you", "read", "news"] },
      { w: ["you", "like", "coffee"] },
      { w: ["you", "watch", "movies"] },
      { w: ["you", "drink", "tea"] },
      { w: ["you", "eat", "breakfast"] },
      { w: ["you", "study", "math"] },
      { w: ["you", "write", "email"] },
      { w: ["you", "use", "phone"] },
      { w: ["you", "open", "window"] },

      // we
      { w: ["we", "play", "together"] },
      { w: ["we", "read", "books"] },
      { w: ["we", "like", "games"] },
      { w: ["we", "watch", "tv"] },
      { w: ["we", "drink", "water"] },
      { w: ["we", "eat", "lunch"] },
      { w: ["we", "study", "english"] },
      { w: ["we", "write", "notes"] },
      { w: ["we", "use", "internet"] },
      { w: ["we", "learn", "fast"] },

      // they
      { w: ["they", "play", "games"] },
      { w: ["they", "read", "books"] },
      { w: ["they", "like", "music"] },
      { w: ["they", "watch", "movies"] },
      { w: ["they", "drink", "juice"] },
      { w: ["they", "eat", "rice"] },
      { w: ["they", "study", "together"] },
      { w: ["they", "write", "letters"] },
      { w: ["they", "use", "computers"] },
      { w: ["they", "visit", "friends"] },

      // nouns (singular)
      { w: ["the", "cat", "runs"] },
      { w: ["the", "dog", "barks"] },
      { w: ["the", "bird", "flies"] },
      { w: ["the", "baby", "cries"] },
      { w: ["the", "teacher", "teaches"] },
      { w: ["the", "student", "studies"] },
      { w: ["the", "boy", "plays"] },
      { w: ["the", "girl", "smiles"] },
      { w: ["the", "sun", "shines"] },
      { w: ["the", "clock", "ticks"] },
    ];

    let questions = [];
    const max_questions = 10;

    const shuffled = [...list_questions].sort(() => Math.random() - 0.5);

    for (let i = 0; i < max_questions; i++) {
      questions.push(shuffled[i]);
    }

    console.log(questions);

    const totalSoal = questions.length;
    let current = 0,
      currentSoal = 1,
      score = 0;
    let dragged = null,
      ghost = null,
      startPos = new Map();
    let checkTrial = 0;
    let minusThisQuestion = 0;
    let questionRecorded = false;

    /* ================= RECORD ================= */
    let record_quiz = {
      total_question: totalSoal,
      total_time_left: 0,
      total_check_trail: 0,
      total_current_score: 0,
      question: [],
    };

    /* ================= TIMER ================= */
    const default_timer = 60;
    let time = default_timer,
      timerInterval = null;
    const timerEl = document.getElementById("timer");

    function startTimer() {
      clearInterval(timerInterval);
      timerEl.textContent = "⏱️ " + time;
      timerInterval = setInterval(() => {
        if (!document.getElementById("timer")) return clearInterval(timerInterval);
        time--;
        timerEl.textContent = "⏱️ " + time;
        if (time <= 0) {
          clearInterval(timerInterval);
          timerEl.textContent = "⏱️ 0";
          timeOutReset();
        }
      }, 1000);
    }

    /* ================= ELEMENT ================= */
    const answerEl = document.getElementById("answer");
    const questionEl = document.getElementById("question");
    const scoreEl = document.getElementById("score");
    const btnCheck = document.getElementById("btnCheck");
    const btnReset = document.getElementById("btnReset");

    /* ================= DRAG ================= */
    function record() {
      startPos.clear();
      [...answerEl.children].forEach((el) =>
        startPos.set(el, el.getBoundingClientRect())
      );
    }
    function animate() {
      [...answerEl.children].forEach((el) => {
        const f = startPos.get(el);
        if (!f) return;
        const l = el.getBoundingClientRect();
        const dx = f.left - l.left,
          dy = f.top - l.top;
        if (dx || dy) {
          el.style.transform = `translate(${dx}px,${dy}px)`;
          el.style.transition = "none";
          requestAnimationFrame(() => {
            el.style.transform = "";
            el.style.transition = "transform .35s cubic-bezier(.4,0,.2,1)";
          });
        }
      });
    }

    function bindDrag(el) {
      el.addEventListener("pointerdown", (e) => {
        dragged = el;
        el.classList.add("dragging");
        record();
        ghost = el.cloneNode(true);
        ghost.className = "word drag-ghost";
        document.body.appendChild(ghost);
        moveGhost(e);
        el.setPointerCapture(e.pointerId);
      });
      el.addEventListener("pointermove", (e) => ghost && moveGhost(e));
      el.addEventListener("pointerup", (e) => {
        if (!ghost) return;
        const t = document.elementFromPoint(e.clientX, e.clientY);
        if (t && t.classList.contains("word") && t !== dragged) {
          swap(t);
          animate();
        }
        cleanup();
      });
      el.addEventListener("pointercancel", cleanup);
    }
    function moveGhost(e) {
      //ghost.style.left=e.clientX+"px";
      //ghost.style.top=e.clientY+"px";

      const isTouch = e.pointerType === "touch";

      //  const offsetY = isTouch ? 60 : 0; // 👆 naik 60px di mobile
      //  const offsetX = isTouch ? 0 : 0;

      const offsetY = isTouch ? 50 : 0;
      const offsetX = isTouch ? -10 : 0;

      ghost.style.left = e.clientX + offsetX + "px";
      ghost.style.top = e.clientY - offsetY + "px";
    }
    function cleanup() {
      ghost && ghost.remove();
      ghost = null;
      dragged && dragged.classList.remove("dragging");
      dragged = null;
    }
    function swap(target) {
      const items = [...answerEl.children];
      const a = items.indexOf(dragged),
        b = items.indexOf(target);
      if (a < 0 || b < 0) return;
      answerEl.insertBefore(dragged, a < b ? target.nextSibling : target);
    }

    /* ================= GAME ================= */
    function updateScore() {
      scoreEl.textContent = `🏆 Score: ${score} | 📘 Soal: ${currentSoal}/${totalSoal}`;
    }

    function recordQuizEvent(status, minusScore) {
      const qIndex = currentSoal - 1; // index soal saat ini

      // jika belum ada object soal ini, buat baru
      if (!record_quiz.question[qIndex]) {
        record_quiz.question[qIndex] = {
          status_question: status,
          current_score: score,
          current_question: currentSoal,
          time_left: time,
          check_trial: checkTrial,
          current_minus_score: minusScore,
        };
      } else {
        // update nilai soal yang sama (jika user salah lagi)
        record_quiz.question[qIndex].status_question = status;
        record_quiz.question[qIndex].current_score = score;
        record_quiz.question[qIndex].time_left = time;
        record_quiz.question[qIndex].check_trial = checkTrial;
        record_quiz.question[qIndex].current_minus_score = minusScore;
      }

      // total summary
      record_quiz.total_time_left = 0;
      record_quiz.total_check_trail = 0;
      record_quiz.total_current_score = score;

      record_quiz.question.forEach((q) => {
        record_quiz.total_time_left += q.time_left;
        record_quiz.total_check_trail += q.check_trial;
      });

      // simpan persisten
      localStorage.setItem("record_quiz", JSON.stringify(record_quiz));
    }

    function resetAnswerOnly() {
      const q = questions[current];
      if (!q) return;

      answerEl.innerHTML = "";
      [...q.w]
        .sort(() => Math.random() - 0.5)
        .forEach((w) => {
          const el = document.createElement("div");
          el.className = "word";
          el.textContent = w;
          answerEl.appendChild(el);
          bindDrag(el);
        });
    }

    function loadQuestion() {
      if (currentSoal > totalSoal) {
        // soal terakhir sudah selesai, tampilkan snackbar khusus
        showSnackbar("🎉 Quiz Selesai!", "success", 2000);

        // beri delay sebelum redirect supaya snackbar terlihat
        setTimeout(() => {
          window.location.href = "result.html";
        }, 2000);

        return;
      }

      questionRecorded = false;
      checkTrial = 0;
      minusThisQuestion = 0; // ✅ FIX PENTING
      time = default_timer;

      startTimer();
      const q = questions[current];
      //questionEl.textContent=q.q;
      answerEl.innerHTML = "";
      [...q.w]
        .sort(() => Math.random() - 0.5)
        .forEach((w) => {
          const el = document.createElement("div");
          el.className = "word";
          el.textContent = w;
          answerEl.appendChild(el);
          bindDrag(el);
        });
      updateScore();
    }

    /* ===== TIME OUT ===== */
    function timeOutReset() {
      forceCancelDrag(); // ⬅️ FIX UTAMA (STOP DRAG AKTIF)

      minusThisQuestion += 50;
      score -= 50;
      playErrorFX("timeout");
      current++;
      currentSoal++;

      showSnackbar("⏰ Waktu Habis! -50", "error");

      loadQuestion();
    }

    /* ===== BUTTON LOCK ===== */
    let locked = false;
    function lockButtons(ms) {
      locked = true;
      btnCheck.disabled = true;
      btnReset.disabled = true;
      setTimeout(() => {
        locked = false;
        btnCheck.disabled = false;
        btnReset.disabled = false;

        // ▶️ LANJUTKAN TIMER SETELAH PAUSE
        if (questions[current] && !questionRecorded) {
          startTimer();
        }
      }, ms);
    }

    /* ===== BUTTON ACTION ===== */
    function safeCheck() {
      if (!locked) {
        checkTrial++;

        // ⏸️ PAUSE TIMER
        clearInterval(timerInterval);

        lockButtons(800);
        checkAnswer();
      }
    }

    function safeReset() {
      if (!locked) {
        lockButtons(600);
        resetAnswerOnly(); // timer tetap berjalan
      }
    }

    /* ===== CHECK ANSWER ===== */
    function checkAnswer() {
      if (!questions[current]) return;

      const user = [...answerEl.children].map((e) => e.textContent);
      if (user.every((w, i) => w === questions[current].w[i])) {
        score += 100;
        updateScore();
        playTrueFX();

        current++;
        currentSoal++;
        confetti();

        showSnackbar("✔️ Jawaban Benar! +100", "success");

        setTimeout(loadQuestion, 700);
      } else {
        score -= 20;
        minusThisQuestion += 20;
        updateScore();
        playErrorFX("error");

        showSnackbar("❌ Jawaban Salah! -20", "error");
      }
    }

    function forceCancelDrag() {
      if (dragged) {
        try {
          dragged.releasePointerCapture?.(0);
        } catch (e) { }
      }
      cleanup(); // hapus ghost & state drag
    }

    /* ================= INIT ================= */
    localStorage.removeItem("record_quiz");
    updateScore();
    loadQuestion();

    /* ===== SNACKBAR ===== */
    let sb;
    function showSnackbar(msg, type = "success", duration = 1800) {
      // const container = document.getElementById("snackbar-container");

      // const bar = document.createElement("div");
      // bar.className = `snackbar ${type}`;
      // bar.textContent = msg;

      // container.appendChild(bar);

      // // force browser baca state awal (.snackbar)
      // bar.getBoundingClientRect();

      // // transisi ke .show
      // bar.classList.add("show");

      vm.$q.notify({
        message: "Jawaban: " + msg,
        // icon: type == "success" ? 'ion-checkmark-circle' : 'ion-close-circle',
        // color: type == "success" ? 'positive' : 'negative',
        color: "white",
        textColor: "dark",
        group: type,
      });

      // ✅ Simpan record hanya saat snackbar muncul
      recordQuizEvent(type === "success" ? "benar" : "salah", minusThisQuestion);

      // setTimeout(() => {
      //   bar.classList.remove("show");
      //   setTimeout(() => bar.remove(), 450);
      // }, duration);
    }

    document.getElementById("btnCheck").addEventListener("click", safeCheck);

    document.getElementById("btnReset").addEventListener("click", safeReset);
  },
};
</script>

<style lang="scss">
.word {
  background: linear-gradient(135deg, #34d399, #60a5fa);
  padding: 20px 25px;
  border-radius: 999px;
  font-weight: bold;
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
  width: auto;
}

.word.dragging {
  opacity: 0.8;
  transform: scale(1.15);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
}

.drag-ghost {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  background: linear-gradient(135deg, #f472b6, #c084fc);
  color: #fff;
  opacity: 0.9;
  transform: translate(-50%, -50%) scale(1.18);
  box-shadow: 0 18px 40px rgba(192, 132, 252, 0.55);
  width: auto;
}


#QuizActionArrange {

  .answer {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    border: 3px dashed #93c5fd;
    padding: 16px;
    border-radius: 16px;
    background: #f0f9ff;
  }

  .controls {
    display: flex;
    gap: 12px;
    margin-top: 18px;
  }

  .controls button {
    flex: 1;
    padding: 12px;
    border-radius: 16px;
    border: none;
    font-weight: bold;
  }

  .check {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.75), rgba(74, 222, 128, 0.75));
  }

  .reset {
    background: linear-gradient(135deg, rgba(251, 113, 133, 0.75), rgba(244, 63, 94, 0.75));
    color: #fff;
  }

  /* ===== RESPONSIVE MOBILE ===== */
  @media screen and (max-width: 600px) {
    .word {
      width: 100%;
      font-size: 20px;
      padding: 20px 20px 25px 25px;
    }

    .drag-ghost {
      width: auto !important;
    }
  }

  #btnReset {
    display: none;
  }

  #btnCheck,
  #btnReset {
    cursor: pointer;
    user-select: none;
  }
}
</style>
