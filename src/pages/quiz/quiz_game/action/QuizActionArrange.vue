<template>
  <q-page-sticky style="z-index: 999" position="top-right" :offset="[0, 0]">
    <GlobalLabel
      shape="skew"
      position="top-right"
      backgroundColor="#ff1744"
      textColor="#ffffff"
    >
      TUTUP
    </GlobalLabel>
  </q-page-sticky>

  <InitLoading v-if="get_init_aktivitas"></InitLoading>
  <q-page v-else id="QuizAction" class="flex flex-center q-pa-sm bg-transparent">
    <template v-if="get_aktivitas_tugasable?.konten">
      <QuizMediaComponent />
      <WinLottie />
      <div v-show="!is_quiz_done && is_not_error" class="game">
        <q-card id="quizCard" bordered class="quiz-card">
          <q-card-section>
            <div class="title">🚀 Quiz Action</div>
            <!-- <div class="subtitle">Match - Present Tense!</div> -->
            <div class="question">Susun kata dengan tepat</div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-actions align="between" class="q-pa-none q-pa-md">
            <div class="timer" id="timer">⏱️ 0</div>
            <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
          </q-card-actions>

          <q-card-section>
            <div class="answer" id="answer"></div>
            <div class="controls">
              <button class="check" id="btnCheck">✔️&nbsp;&nbsp;CEK</button>
              <button class="reset" id="btnReset">❌&nbsp;&nbsp;RESET</button>
            </div>
            <div class="life">❤️ Peluang x <span id="lifeCount">3</span></div>
          </q-card-section>
        </q-card>
      </div>
      <Lottie_1_404 v-if="!is_quiz_done && !is_not_error">
        <q-btn round to="/" color="pink" size="xl" icon="home" />
      </Lottie_1_404>
    </template>
    <EmptyBlock class="full-width" v-else></EmptyBlock>
  </q-page>
</template>

<script>
import playErrorFX from "src/composables/quiz/playErrorFX";
import playTrueFX from "src/composables/quiz/playTrueFX";
import confetti from "src/composables/quiz/confetti";

import { QuizActionBeforeRouteLeave } from "src/utils/sweetAlert";

// import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore.js";
import { myMixin } from "./mixinQuiz.js";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore.js";

export default {
  mixins: [myMixin],
  async preFetch({ store, currentRoute }) {
    const mystore = useLmsTugasStore(store);
    if (!mystore.get_aktivitas_tugasable?.konten) await mystore.onAktivitasTugas();
  },
  beforeRouteLeave(to, from, next) {
    // const answer = window.confirm('Do you really want to leave?')
    // if (!answer) return false // Cancels the back navigation
    if (this.is_quiz_done || !this.is_not_error) return next();
    return QuizActionBeforeRouteLeave(next);
  },

  mounted() {
    this.onStart();
  },
  created() {
    this.dummyOnCreate("arrange");
  },
  data() {
    return {
      my_time: 100,
    };
  },
  methods: {
    onStart() {
      console.log(
        "this.get_aktivitas_tugasable?.konten",
        this.get_aktivitas_tugasable,
        this.get_aktivitas_tugasable?.kategori,
        this.get_aktivitas_tugasable?.konten
      );

      const vm = this;

      if (this.get_aktivitas_tugasable?.kategori != "arrange") {
        this.notifFailed("data gagal diproses", "Salah Quiz");
        this.is_not_error = false;
        return;
      }
      // const list_questions = this.parseUnknown(this.get_aktivitas_tugasable?.konten) // di laravel sudah diperbaiki pake getter, biar praktis

      // const list_questions = this.get_aktivitas_tugasable?.konten;
      const list_questions = [{"w":["<svg width='36' height='36'><circle cx='18' cy='18' r='14' fill='gold' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","lingkaran"]},{"w":["<svg width='36' height='36'><circle cx='18' cy='18' r='14' fill='white' stroke='black' stroke-width='2'\/><line x1='18' y1='18' x2='18' y2='10' stroke='black' stroke-width='2'\/><line x1='18' y1='18' x2='25' y2='18' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","lingkaran"]},{"w":["<svg width='36' height='36'><circle cx='18' cy='18' r='14' fill='silver' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","lingkaran"]},{"w":["<svg width='36' height='36'><circle cx='18' cy='18' r='14' fill='wheat' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","lingkaran"]},{"w":["<svg width='36' height='36'><circle cx='18' cy='18' r='14' fill='orange' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","lingkaran"]},{"w":["<svg width='48' height='36'><rect x='5' y='4' width='38' height='28' fill='sienna' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi panjang"]},{"w":["<svg width='48' height='36'><rect x='5' y='4' width='38' height='28' fill='skyblue' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi panjang"]},{"w":["<svg width='48' height='36'><rect x='5' y='4' width='38' height='28' fill='lightgreen' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi panjang"]},{"w":["<svg width='48' height='36'><rect x='5' y='6' width='38' height='24' fill='white' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi panjang"]},{"w":["<svg width='48' height='36'><rect x='5' y='5' width='38' height='26' fill='gray' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi panjang"]},{"w":["<svg width='36' height='36'><rect x='5' y='5' width='26' height='26' fill='lightgray' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi"]},{"w":["<svg width='36' height='36'><rect x='5' y='5' width='26' height='26' fill='pink' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi"]},{"w":["<svg width='36' height='36'><rect x='5' y='5' width='26' height='26' fill='lightyellow' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi"]},{"w":["<svg width='36' height='36'><rect x='5' y='5' width='26' height='26' fill='white' stroke='black' stroke-width='2'\/><line x1='18' y1='5' x2='18' y2='31' stroke='black'\/><\/svg>","berbentuk","persegi"]},{"w":["<svg width='36' height='36'><rect x='5' y='5' width='26' height='26' fill='beige' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi"]},{"w":["<svg width='36' height='36'><polygon points='18,4 32,30 4,30' fill='gold' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","segitiga"]},{"w":["<svg width='36' height='36'><polygon points='18,4 32,30 4,30' fill='red' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","segitiga"]},{"w":["<svg width='36' height='36'><polygon points='18,4 32,30 4,30' fill='orange' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","segitiga"]},{"w":["<svg width='36' height='36'><polygon points='18,4 32,30 4,30' fill='yellowgreen' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","segitiga"]},{"w":["<svg width='36' height='36'><polygon points='18,4 32,30 4,30' fill='deepskyblue' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","segitiga"]},{"w":["<svg width='36' height='36'><polygon points='18,3 33,18 18,33 3,18' fill='deepskyblue' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","belah ketupat"]},{"w":["<svg width='36' height='36'><polygon points='18,3 33,18 18,33 3,18' fill='violet' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","belah ketupat"]},{"w":["<svg width='36' height='36'><polygon points='18,3 33,18 18,33 3,18' fill='limegreen' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","belah ketupat"]},{"w":["<svg width='36' height='36'><polygon points='18,3 33,18 18,33 3,18' fill='gold' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","belah ketupat"]},{"w":["<svg width='36' height='36'><polygon points='18,3 33,18 18,33 3,18' fill='tomato' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","belah ketupat"]},{"w":["<svg width='36' height='36'><circle cx='18' cy='18' r='14' fill='gold' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","lingkaran"]},{"w":["<svg width='48' height='36'><rect x='5' y='4' width='38' height='28' fill='skyblue' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi panjang"]},{"w":["<svg width='36' height='36'><rect x='5' y='5' width='26' height='26' fill='lightgray' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","persegi"]},{"w":["<svg width='36' height='36'><polygon points='18,4 32,30 4,30' fill='gold' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","segitiga"]},{"w":["<svg width='36' height='36'><polygon points='18,3 33,18 18,33 3,18' fill='deepskyblue' stroke='black' stroke-width='2'\/><\/svg>","berbentuk","belah ketupat"]}];

      if (!list_questions)
        return this.notifFailed("periksa database kembali", "Konten Kosong");

      console.log("list_questions", list_questions);

      let checkingHTML = {};

      let questions = [];
      const max_questions = 9; // karena index dimulai dari 0-9 = 10

      const shuffled = [...list_questions].sort(() => Math.random() - 0.5);

      for (let i = 0; i <= max_questions; i++) {
        questions.push(shuffled[i]);
      }

      console.log(questions);

      const totalSoal = questions.length;
      let current = 0,
        currentSoal = 0,
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
      const default_timer = vm.my_time;
      let time = default_timer,
        timerInterval = null;
      const timerEl = document.getElementById("timer");

      function startTimer() {
        clearInterval(timerInterval);
        timerEl.textContent = "⏱️ " + time;
        timerInterval = setInterval(() => {
          if (
            vm.is_quiz_done ||
            !vm.is_not_error ||
            vm?.$route?.params?.quiz != "arrange"
          )
            return clearInterval(timerInterval);

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

      let maxLife = 3;

      function updateLife() {
        maxLife--;
        if (maxLife < 0) {
          maxLife = 3;

          current++;
          currentSoal++;

          showSnackbar("💀 Kesempatan habis!", "out");

          forceCancelDrag(); // ⬅️ FIX UTAMA (STOP DRAG AKTIF)
          playErrorFX("timeout");
          // loadQuestion();
          setTimeout(loadQuestion, 700);
        }

        const el = document.getElementById("lifeCount");
        if (el) el.textContent = maxLife;
      }

      /* ================= ELEMENT ================= */
      const answerEl = document.getElementById("answer");
      // const questionEl = document.getElementById("question");
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
        const isTouch = e.pointerType === "touch";

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
        scoreEl.textContent = `🏆 Score: ${score} | 📘 Soal: ${
          currentSoal + 1
        }/${totalSoal}`;
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

        checkingHTML[currentSoal] = document.getElementById("quizCard").outerHTML;
        record_quiz.checking = checkingHTML;

        record_quiz.question.forEach((q) => {
          record_quiz.total_time_left += q.time_left;
          record_quiz.total_check_trail += q.check_trial;
        });

        // simpan persisten
        localStorage.setItem("record_quiz_arrange", JSON.stringify(record_quiz));

        vm.setForm(record_quiz);
      }

      function resetAnswerOnly() {
        const q = questions[current];
        if (!q) return;

        // answerEl.innerHTML = "";
        // [...q.w]
        //   .sort(() => Math.random() - 0.5)
        //   .forEach((w) => {
        //     const el = document.createElement("div");
        //     el.className = "word";
        //     if (typeof w === "string" && w.trim().startsWith("<svg")) {
        //       el.innerHTML = w;
        //     } else {
        //       el.textContent = w;
        //     }
        //     answerEl.appendChild(el);
        //     bindDrag(el);
        //   });


        answerEl.innerHTML = "";

        const shuffled = q.w
          .map((value, index) => ({
            value,
            index,
          }))
          .sort(() => Math.random() - 0.5);

        shuffled.forEach((item) => {
          const el = document.createElement("div");
          el.className = "word";

          el.dataset.index = item.index;

          if (
            typeof item.value === "string" &&
            item.value.trim().startsWith("<svg")
          ) {
            el.innerHTML = item.value;
          } else {
            el.textContent = item.value;
          }

          answerEl.appendChild(el);
          bindDrag(el);
        });


      }

      function loadQuestion() {
        if (currentSoal >= totalSoal) {
          console.log("GAME OVER");
          vm.onCreate();
          // GAME OVER

          // soal terakhir sudah selesai, tampilkan snackbar khusus
          showSnackbar("🎉 Quiz Selesai!", "success", 2000);

          // beri delay sebelum redirect supaya snackbar terlihat
          clearInterval(timerInterval); // ⛔ stop timer langsung

          setTimeout(() => {
            // window.location.href = "result.html";
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
        // answerEl.innerHTML = "";
        // [...q.w]
        //   .sort(() => Math.random() - 0.5)
        //   .forEach((w) => {
        //     const el = document.createElement("div");
        //     el.className = "word";
        //     if (typeof w === "string" && w.trim().startsWith("<svg")) {
        //       el.innerHTML = w;
        //     } else {
        //       el.textContent = w;
        //     }
        //     answerEl.appendChild(el);
        //     bindDrag(el);
        //   });


        answerEl.innerHTML = "";

        const shuffled = q.w
          .map((value, index) => ({
            value,
            index, // simpan urutan asli
          }))
          .sort(() => Math.random() - 0.5);

        shuffled.forEach((item) => {
          const el = document.createElement("div");
          el.className = "word";

          // simpan index asli
          el.dataset.index = item.index;

          if (
            typeof item.value === "string" &&
            item.value.trim().startsWith("<svg")
          ) {
            el.innerHTML = item.value;
          } else {
            el.textContent = item.value;
          }

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

          updateLife();
          // ⏸️ PAUSE TIMER
          // clearInterval(timerInterval); // tidak perlu ini

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
      var total_question_true = 0;
      var total_question_false = 0;
      function checkAnswer() {
        if (!questions[current]) return;


        const userOrder = [...answerEl.children].map((e) =>
          Number(e.dataset.index)
        );

        console.log("User :", userOrder);
        console.log(
          "Benar:",
          questions[current].w.map((_, i) => i)
        );

        const isCorrect = userOrder.every((index, i) => index === i);

        if (isCorrect) {
          score += 100;
          updateScore();
          playTrueFX();

          current++;
          currentSoal++;
          confetti();

          showSnackbar("✔️ Jawaban Benar! +100", "success");

          total_question_true++;

          maxLife = 3;

          setTimeout(loadQuestion, 700);
        } else {
          score -= 20;
          minusThisQuestion += 20;
          updateScore();
          playErrorFX("error");

          showSnackbar("❌ Jawaban Salah! -20", "error");

          total_question_false++;
        }
      }

      function forceCancelDrag() {
        if (dragged) {
          try {
            dragged.releasePointerCapture?.(0);
          } catch (e) {}
        }
        cleanup(); // hapus ghost & state drag
      }

      /* ================= INIT ================= */
      localStorage.removeItem("record_quiz_arrange");
      updateScore();
      loadQuestion();

      /* ===== SNACKBAR ===== */
      let sb;
      function showSnackbar(msg, type = "success", duration = 1800) {
        vm.$q.notify({
          message: "Jawaban: " + msg,
          color: "white",
          textColor: "dark",
          group: type,
          position: "top",
        });

        // ✅ Simpan record hanya saat snackbar muncul
        recordQuizEvent(type === "success" ? "benar" : "salah", minusThisQuestion);
      }

      document.getElementById("btnCheck").addEventListener("click", safeCheck);

      document.getElementById("btnReset").addEventListener("click", safeReset);
    },
  },
};
</script>

<style lang="scss">
.word {
  text-align: center;
  font-size: 20px;
  background: linear-gradient(135deg, #34d399, #60a5fa);
  padding: 20px 25px 15px 25px;
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

#QuizAction {
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
    // display: flex;
    // gap: 12px;
    margin-top: 18px;
  }

  .controls button {
    // flex: 1;
    padding: 12px;
    border-radius: 16px;
    border: none;
    font-weight: bold;
  }

  .check {
    background: linear-gradient(
      135deg,
      rgba(34, 197, 94, 0.75),
      rgba(74, 222, 128, 0.75)
    );
  }

  .reset {
    background: linear-gradient(
      135deg,
      rgba(251, 113, 133, 0.75),
      rgba(244, 63, 94, 0.75)
    );
    color: #fff;
  }

  /* ===== RESPONSIVE MOBILE ===== */
  @media screen and (max-width: 600px) {
    .word {
      width: 100%;
      font-size: 30px;
      // padding: 20px 20px 25px 25px;
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
