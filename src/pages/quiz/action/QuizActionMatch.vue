<template>
  <q-page id="QuizAction" class="flex flex-center q-pa-sm bg-transparent">
    <QuizMediaComponent />
    <WinLottie />
    <div v-show="!is_quiz_done && is_not_error" class="game">
      <q-card id="quizCard" bordered class="quiz-card">
        <q-card-section>
          <div class="title">🚀 Quiz Action</div>
          <!-- <div class="subtitle">Match - Present Tense!</div> -->
          <div class="question">Cocokkan kalimat dengan artinya</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="between" class="q-pa-none q-pa-md">
          <div class="timer" id="timer">⏱️ 0</div>
          <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
        </q-card-actions>

        <q-card-section>
          <div id="blockQ" class="match-grid">
            <div class="quiz-col" id="colQ">
              <!-- <h4>SOAL</h4> -->
            </div>
            <div class="quiz-col" id="colA">
              <!-- <h4>JAWABAN</h4> -->
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <Lottie_1_404 v-if="!is_quiz_done && !is_not_error">
      <q-btn round to="/" color="pink" size="xl" icon="home" />
    </Lottie_1_404>
  </q-page>
</template>

<script>
import playErrorFX from "src/composables/quiz/playErrorFX";
import playTrueFX from "src/composables/quiz/playTrueFX";
import shake from "src/composables/quiz/shake";

import { QuizActionBeforeRouteLeave } from "src/utils/sweetAlert";

// import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore.js";
import { myMixin } from './mixinQuiz.js'
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore.js";

export default {
  mixins: [myMixin],
  async preFetch({ store, currentRoute }) {
    const slug = currentRoute.params?.slug || ''; // tugas_id
    const mystore = useLmsTugasStore(store)
    if(!mystore.get_aktivitas_tugasable?.konten) await mystore.onAktivitas(slug)
  },
  beforeRouteLeave(to, from, next) {
    // const answer = window.confirm('Do you really want to leave?')
    // if (!answer) return false // Cancels the back navigation
    if (this.is_quiz_done || !this.is_not_error) return next()
    return QuizActionBeforeRouteLeave(next)
  },

  mounted() {
    this.onStart();
  },
  created() {
    this.dummyOnCreate('match')
  },
  methods: {
    onStart() {
      const vm = this;

      if (this.get_aktivitas_tugasable?.kategori != 'match') {
        this.notifFailed('data gagal diproses', 'Salah Quiz')
        this.is_not_error = false;
        return
      }
      // const list_questions = this.parseUnknown(this.get_aktivitas_tugasable?.konten) // di laravel sudah diperbaiki pake getter, biar praktis
      const list_questions = this.get_aktivitas_tugasable?.konten


      let checkingHTML = {};

      // TOTAL SOAL (round)
      const totalSheetSoal = 3;
      let currentSheetSoal = 1;

      const max_questions = 5;
      let questions = [];

      let blockId = 1;
      let poolIndex = 0;

      for (let q = 1; q <= totalSheetSoal; q++) {
        // ⬅️ FIX: totalSheetSoal
        for (let i = 0; i < max_questions; i++) {
          const item = list_questions[poolIndex];

          questions.push({
            id: blockId, // ⬅️ GLOBAL BLOCK ID
            current_question: q,
            q: item.q, // ⬅️ WAJIB ADA
            a: item.a, // ⬅️ WAJIB ADA
          });

          blockId++;
          poolIndex++;
        }
      }

      let activeBlockId = null;
      let dragged = null,
        ghost = null;
      let score = 0,
        matched = 0;

      /* ================= INIT ================= */
      function init() {
        matched = 0;

        // 🧹 HAPUS BLOCK LAMA DULU
        document.getElementById("colQ").innerHTML = "";
        document.getElementById("colA").innerHTML = "";

        // 🔑 FILTER HANYA SOAL UNTUK SHEET AKTIF
        const currentQuestions = questions.filter(
          (q) => q.current_question === currentSheetSoal
        );

        const q = [...currentQuestions].sort(() => Math.random() - 0.5);
        const a = [...currentQuestions].sort(() => Math.random() - 0.5);

        q.forEach((d) => addItem(d.q, "q", d.a));
        a.forEach((d) => addItem(d.a, "a", d.q));
      }
      init();

      /* ================= ITEM ================= */
      function addItem(text, type, match) {
        const el = document.createElement("div");
        el.className = "block_quiz";
        el.textContent = text;
        el.dataset.type = type;
        el.dataset.match = match;
        bindDrag(el);
        document.getElementById(type === "q" ? "colQ" : "colA").appendChild(el);
      }

      /* ================= DRAG ================= */
      function bindDrag(el) {
        el.addEventListener("pointerdown", (e) => {
          if (el.classList.contains("matched")) return;

          dragged = el;
          el.classList.add("dragging");

          // 🔑 SIMPAN BLOCK ID YANG DI-DRAG
          const currentItems = questions.filter(
            (q) => q.current_question === currentSheetSoal
          );
          const idx = currentItems.findIndex(
            (q) => q.q === el.textContent || q.a === el.textContent
          );
          activeBlockId = currentItems[idx]?.id;

          ghost = el.cloneNode(true);
          ghost.className = "drag-ghost";
          document.body.appendChild(ghost);
          moveGhost(e);
          el.setPointerCapture(e.pointerId);
        });
        el.addEventListener("pointermove", (e) => ghost && moveGhost(e));
        el.addEventListener("pointerup", (e) => {
          if (!ghost) return;

          ghost.style.display = "none"; // ⬅️ SEMENTARA HILANGKAN
          const t = document.elementFromPoint(e.clientX, e.clientY);
          ghost.style.display = ""; // ⬅️ BALIKKAN

          // if (t && t.classList.contains("block_quiz") && t !== dragged) {
          //   checkMatch(dragged, t);
          // }

          if (
            t &&
            t.classList.contains("block_quiz") &&
            t !== dragged &&
            !t.classList.contains("matched") // ⬅️ BLOCK TARGET YANG SUDAH BENAR
          ) {
            checkMatch(dragged, t);
          }

          cleanup();
        });
      }
      function moveGhost(e) {
        const isTouch = e.pointerType === "touch";

        // Offset khusus mobile agar ghost tidak ketutup jari
        const offsetX = isTouch ? 0 : 0;
        const offsetY = isTouch ? 70 : 0;

        ghost.style.left = e.clientX + offsetX + "px";
        ghost.style.top = e.clientY - offsetY + "px";
      }
      function cleanup() {
        ghost && ghost.remove();
        ghost = null;
        dragged && dragged.classList.remove("dragging");
        dragged = null;
      }

      /* ================= LOGIC ================= */
      function checkMatch(a, b) {

        // 🔒 Jangan proses kalau salah satu sudah matched
        if (a.classList.contains("matched") || b.classList.contains("matched")) {
          return;
        }

        if (a.dataset.match === b.textContent) {
          a.classList.add("matched");
          b.classList.add("matched");
          matched += 2;
          score += 100;
          showSnackbar("✅ Cocok! +100", "success");
          playTrueFX();

          const totalInThisSheetSoal =
            questions.filter((q) => q.current_question === currentSheetSoal).length * 2;

          if (matched === totalInThisSheetSoal) {
            showSnackbar("🎉 Semua Cocok!", "success");

            clearInterval(countdown); // ⬅️ STOP TIMER SOAL INI

            setTimeout(() => {
              nextSoal(); // ⬅️ SATU-SATUNYA JALUR PINDAH SOAL
            }, 900);
          }
        } else {
          score -= 20;
          shake();
          showSnackbar("❌ Salah! -20", "error");
          playErrorFX("error");
        }
        document.getElementById(
          "score"
        ).textContent = `Score: ${score} | Lembar: ${currentSheetSoal}/${totalSheetSoal}`;
      }

      /* ================= SNACKBAR ================= */
      function showSnackbar(msg, type = "success", duration = 1800) {

        vm.$q.notify({
          message: "Jawaban: " + msg,
          // icon: type == "success" ? 'ion-checkmark-circle' : 'ion-close-circle',
          // color: type == "success" ? 'positive' : 'negative',
          color: "white",
          textColor: "dark",
          group: type,
        });

        /* === RECORD SAAT SNACKBAR MUNCUL === */
        const currentItems = questions.filter(
          (q) => q.current_question === currentSheetSoal
        );

        const currentBlockId = activeBlockId;

        recordQuizEvent({
          current_question: currentSheetSoal,
          current_block_question: currentBlockId,
          status_question: type === "success" ? "berhasil" : "salah",
          current_score: score,
          time_left: timeLeft,
          check_trial: type === "error" ? 1 : 0,
          current_minus_score: type === "error" ? 20 : 0,
        });
      }

      /* ================== TAMBAHAN: COUNTDOWN 120 DETIK ================== */
      const default_timeLeft = 30;
      let timeLeft = default_timeLeft;
      const timerEl = document.getElementById("timer");

      let countdown = null;

      function startCountdown() {
        clearInterval(countdown);

        countdown = setInterval(() => {
          if(vm.is_quiz_done || !vm.is_not_error)  return clearInterval(countdown);

          if (!document.getElementById("timer")) return clearInterval(countdown);
          timeLeft--;
          timerEl.textContent = "⏱️ " + timeLeft;

          if (timeLeft <= 0) {
            clearInterval(countdown);

            // ⛔ penalti waktu habis
            score -= 50;

            // update score UI
            updateScoreBar();

            // efek & suara
            shake();
            playErrorFX("timeout");

            showSnackbar("⏰ Waktu Habis! -50", "error");


            // ⬅️ AUTO NILAI YANG BELUM MATCH = SALAH
            const currentItems = questions.filter(
              (q) => q.current_question === currentSheetSoal
            );

            currentItems.forEach((item) => {
              const dataLS = JSON.parse(localStorage.getItem(LS_KEY));

              const existing = JSON.parse(localStorage.getItem(LS_KEY)).question
                .find(q => q.current_block_question === item.id);

              // 🔒 JANGAN TIMPA kalau sudah berhasil
              if (existing && existing.status_question === "berhasil") return;


              // ⬅️ kalau belum pernah dijawab / belum berhasil
              if (!existing || existing.status_question !== "berhasil") {
                recordQuizEvent({
                  current_question: currentSheetSoal,
                  current_block_question: item.id,
                  status_question: "salah",
                  current_score: score,
                  time_left: 0,
                  check_trial: 0,
                  current_minus_score: 0,
                });
              }
            });

            setTimeout(nextSoal, 900);
          }
        }, 1000);
      }
      function nextSoal() {

        currentSheetSoal++;
        // blockIndexPerSoal[currentSheetSoal] = 0;

        if (currentSheetSoal > totalSheetSoal) {

          console.log('GAME OVER')
          vm.onCreate('match')

          clearInterval(countdown); // ⬅️ STOP TIMER SOAL INI

          // 🔒 freeze seluruh area quiz
          document.getElementById('quizCard').style.pointerEvents = 'none';

          // window.location.href = "result.html";
          return;
        }

        matched = 0;
        timeLeft = default_timeLeft; // ✅ RESET WAKTU
        init(); // ✅ LOAD SOAL BARU
        updateScoreBar();
        startCountdown(); // ✅ TIMER BARU
      }
      startCountdown();

      /* ================== TAMBAHAN LOGIKA SOAL ================== */

      // update score + soal
      function updateScoreBar() {
        document.getElementById(
          "score"
        ).textContent = `Score: ${score} | Lembar: ${currentSheetSoal}/${totalSheetSoal}`;
      }

      // panggil sekali saat awal
      updateScoreBar();

      /* ================== LOCAL STORAGE QUIZ MATCHING (NEW LOGIC) ================== */
      const LS_KEY = "record_quiz_match";
      localStorage.removeItem(LS_KEY);

      let blockIndexPerSoal = {};
      /* === INIT STORAGE === */
      function initQuizRecord() {
        if (!localStorage.getItem(LS_KEY)) {
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({
              total_question: totalSheetSoal,
              total_time_left: 0,
              total_check_trail: 0,
              total_current_score: 0,
              question: [],
              checking: '', //
            })
          );
        }
      }
      initQuizRecord();

      /* === RECORD EVENT (TRIGGERED WITH SNACKBAR) === */
      function recordQuizEvent({
        current_block_question,
        current_question,
        status_question,
        current_score,
        time_left,
        check_trial,
        current_minus_score,
      }) {
        const data = JSON.parse(localStorage.getItem(LS_KEY));

        /* === UPDATE TOTAL === */
        data.total_current_score = current_score;
        data.total_check_trail += check_trial;

        if (status_question === "berhasil") {
          data.total_time_left += time_left;
        }

        const index = data.question.findIndex(
          (q) => q.current_block_question === current_block_question
        );

        if (index > -1) {
          const prev = data.question[index];

          // 🔒 LOCK kalau sudah berhasil
          if (prev.status_question === "berhasil") {
            return;
          }

          /* === UPDATE + AKUMULASI MINUS === */
          data.question[index] = {
            ...prev,
            status_question,
            current_score,
            time_left,
            check_trial: prev.check_trial + check_trial,
            current_minus_score: -(prev.current_minus_score + current_minus_score),
          };
        } else {
          /* === INSERT BARU === */
          data.question.push({
            current_question,
            current_block_question,
            status_question,
            current_score,
            time_left,
            check_trial,
            current_minus_score: current_minus_score <= 0 ? 0 : -current_minus_score,
          });
        }

        checkingHTML[currentSheetSoal] = document.getElementById("quizCard").outerHTML;
        data.checking = checkingHTML;

        localStorage.setItem(LS_KEY, JSON.stringify(data));
        vm.setForm(data)
      }
    }
  }
};
</script>

<style lang="scss">
.block_quiz.matched {
  pointer-events: none;
  /* ⬅️ AUTO DISABLE INTERAKSI */
}

.block_quiz.dragging {
  opacity: 0.8;
  transform: scale(1.15);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
}

/* === GHOST === */
.drag-ghost {
  position: fixed;
  pointer-events: none;
  z-index: 100000;

  /* === SAMA DENGAN WORD DRAG SEBELUMNYA === */
  background: linear-gradient(135deg, #f472b6, #c084fc);
  color: #ffffff;
  font-weight: bold;

  padding: 12px 20px;
  border-radius: 999px;

  opacity: 0.9;
  transform: translate(-50%, -50%) scale(1.18);

  box-shadow: 0 18px 40px rgba(96, 165, 250, 0.45), 0 8px 16px rgba(52, 211, 153, 0.35);

  white-space: nowrap;
}

#QuizAction {
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

  /* === MATCH GRID === */
  .match-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .block_quiz {
    touch-action: none;
  }

  .block_quiz {
    background: linear-gradient(135deg, #34d399, #60a5fa);
    padding: 12px 16px;
    border-radius: 999px;
    font-weight: bold;
    cursor: grab;
    margin: 6px 0;
    text-align: center;
    user-select: none;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s;
    margin: 20px 0px !important;
  }

  #colQ .block_quiz {
    background: linear-gradient(135deg, #ffe259, #ffa751);
  }

  .block_quiz.matched {
    background: linear-gradient(135deg, #22c55e, #16a34a) !important;
    color: #fff;
    cursor: default;
  }

}
</style>
