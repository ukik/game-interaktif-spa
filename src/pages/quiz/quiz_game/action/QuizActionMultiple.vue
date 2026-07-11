<template>
  <q-page-sticky style="z-index: 999;" position="top-right" :offset="[0, 0]">
    <GlobalLabel shape="skew" position="top-right" backgroundColor="#ff1744" textColor="#ffffff">
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
          <div class="question">Seret salah satu ke soal</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="between" class="q-pa-none q-pa-md">
          <div class="timer" id="timer">⏱️ 0</div>
          <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
        </q-card-actions>

        <q-card-section>
          <div id="colQ"></div>
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
import { myMixin } from './mixinQuiz.js'
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore.js";

export default {
  mixins: [myMixin],
  async preFetch({ store, currentRoute }) {
    const mystore = useLmsTugasStore(store)
    if(!mystore.get_aktivitas_tugasable?.konten) await mystore.onAktivitasTugas()
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
    this.dummyOnCreate('multiple')
  },
  methods: {
    onStart() {
      const vm = this;

      if (this.get_aktivitas_tugasable?.kategori != 'multiple') {
        this.notifFailed('data gagal diproses', 'Salah Quiz')
        this.is_not_error = false;
        return
      }
      // const list_questions = this.parseUnknown(this.get_aktivitas_tugasable?.konten) // di laravel sudah diperbaiki pake getter, biar praktis
      const list_questions = this.get_aktivitas_tugasable?.konten

      if(!list_questions) return this.notifFailed('periksa database kembali', 'Konten Kosong')

      let checkingHTML = {};

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      shuffleArray(list_questions);

      /* ================= STATE ================= */
      let score = 0;

      const totalSheetSoal = 15;
      let currentSheetSoal = 1;

      const max_questions = 1; // jumlah soal yang tampil dalam 1 sheet
      let questions = [];

      let blockId = 1;
      let poolIndex = 0;

      for (let q = 1; q <= totalSheetSoal; q++) {   // ⬅️ FIX: totalSheetSoal
        for (let i = 0; i < max_questions; i++) {
          const item = list_questions[poolIndex];

          questions.push({
            id: blockId,                // ⬅️ GLOBAL BLOCK ID
            current_question: q,
            top: item.top,                  // ⬅️ WAJIB ADA
            bottom: item.bottom                   // ⬅️ WAJIB ADA
          });

          blockId++;
          poolIndex++;
        }
      }


      let DRAG_LOCKED = false;

      /* 🔥 SOAL DIACAK SEKALI SAJA 🔥 */
      shuffle(questions);

      /* ================= NEXT ================= */
      function nextSoal() {

        stopTimer();
        clearTimeout(autoResetTimer);
        currentSheetSoal++;

        if (currentSheetSoal > totalSheetSoal) {

          console.log('GAME OVER')
          vm.onCreate()

          clearTimeout(autoResetTimer);
          // window.location.href = "result.html";

          return;
        }

        init();
      }

      /* ================= DRAG ================= */
      let ghost = null;

      function bindDrag(el, question, card) {
        el.addEventListener("pointerdown", e => {

          if (DRAG_LOCKED) return; // 🔒 KUNCI DRAG GLOBAL


          el.classList.add("dragging");
          ghost = el.cloneNode(true);
          ghost.className = "drag-ghost";
          ghost.textContent = el.textContent;
          document.body.appendChild(ghost);
          moveGhost(e);
          el.setPointerCapture(e.pointerId);
        });
        el.addEventListener("pointermove", e => ghost && moveGhost(e));
        el.addEventListener("pointerup", e => {
          if (!ghost) return;
          ghost.remove();
          el.classList.remove("dragging");
          if (document.elementFromPoint(e.clientX, e.clientY) === question) {
            check(el, question, card);
          }
          ghost = null;
        });
      }
      function moveGhost(e) {
        ghost.style.left = e.clientX + "px";
        ghost.style.top = e.clientY - 50 + "px";
      }

      /* ================= CHECK ================= */
      function check(choice, question, card) {
        if (card.classList.contains("locked")) return;

        let trial = Number(card.dataset.trial || 0);
        const word = choice.textContent.replace(/^[A-D]\.\s*/, "");

        updateBlank(question, word, "wrong");

        if (choice.dataset.correct === "true") {

          choice.classList.add("correct-choice"); // ⭐ tambah ini

          DRAG_LOCKED = true;

          confetti();

          question.querySelector(".fill-wrong")?.classList.replace("fill-wrong", "fill-correct");

          question.classList.add("correct");
          question.classList.add("locked");
          score += 100;
          updateScore();

          showSnackbar("✔️ Jawaban Benar! +100", "success");

          const btn = card.querySelector(".next-btn");
          if (btn) btn.classList.add("show");

          stopTimer();
          return;
        } else {
          choice.classList.add("wrong-choice"); // ⬅️ DI SINI
        }

        trial++;
        card.dataset.trial = trial;
        score -= 20;
        updateScore();
        shake();
        syncLifeLabel(card);

        if (trial < 3) {
          showSnackbar("❌ Jawaban Salah! -20", "error", {
            minus: 20
          });
          console.log('1');
          // setTimeout(() => question.textContent = question.textContent.replace(word, "_____"), 300);
        } else {
          console.log('2');

          DRAG_LOCKED = true;

          // 🔥 tandai jawaban benar
          card.querySelectorAll('.choices .block_quiz').forEach(el => {
            if (el.dataset.correct === "true") {
              el.classList.add("correct-choice");
            }
          });

          showSnackbar("❌ Jawaban Salah! -20", "error", {
            minus: 20
          });
          question.querySelector(".fill-wrong")?.classList.replace("fill-wrong", "fill-wrong-final");
          question.classList.add("wrong");
          question.classList.add("locked");
          const btn = card.querySelector(".next-btn");
          if (btn) btn.classList.add("show");

          stopTimer();

          AutoReset();
        }
      }

      /* ================= UTIL ================= */
      function shuffle(a) { return a.sort(() => Math.random() - 0.5) }
      function updateScore() {
        document.getElementById("score").textContent =
          `Score: ${score} | Sheet: ${currentSheetSoal}/${totalSheetSoal}`;
      }
      function shake() {
        const game = document.querySelector(".game");
        game.classList.remove("shake");
        void game.offsetWidth;
        game.classList.add("shake");
      }


      function updateBlank(question, word, type = "wrong") {
        const tpl = question.dataset.template;
        if (!tpl) return;

        const cls =
          type === "correct"
            ? "fill-correct"
            : type === "final"
              ? "fill-wrong-final"
              : "fill-wrong";

        question.innerHTML = tpl.replace(
          "_____",
          `<span class="${cls}">${word}</span>`
        );
      }

      let timeDefault = 10;
      let timeLeft = timeDefault;
      let timerInterval = null;
      function startTimer(card, question) {
        stopTimer();
        timeLeft = timeDefault;
        document.getElementById("timer").textContent = "⏱️ " + timeLeft;

        timerInterval = setInterval(() => {
          if(vm.is_quiz_done || !vm.is_not_error || vm?.$route?.params?.quiz != 'multiple')  return clearInterval(timerInterval);

          if (!document.getElementById("timer")) return clearInterval(timerInterval);
          timeLeft--;
          document.getElementById("timer").textContent = "⏱️ " + timeLeft;

          if (timeLeft <= 0) {
            DRAG_LOCKED = true;

            // 🔥 tandai jawaban benar
            card.querySelectorAll('.choices .block_quiz').forEach(el => {
              if (el.dataset.correct === "true") {
                el.classList.add("correct-choice");
              }
            });

            showSnackbar("⏰ Waktu Habis!", "error", {
              minus: 50,
              timeout: true
            });

            AutoReset();

            syncLifeLabel(card);

            stopTimer();
            question.classList.add("wrong");
            card.classList.add("locked");
            const btn = card.querySelector(".next-btn");
            if (btn) btn.classList.add("show");
          }
        }, 1000);
      }

      function stopTimer() {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }


      function syncLifeLabel(card) {
        const lifeEl = card.querySelector("#lifeCount");
        if (!lifeEl) return;

        const maxLife = 3;
        const trial = Number(card.dataset.trial || 0);
        const lifeLeft = Math.max(0, maxLife - trial);

        lifeEl.textContent = lifeLeft;
      }

      function insertLifeLabel(card) {
        // hindari dobel
        if (card.querySelector("#lifeLabel")) return;

        const question = card.querySelector(".tf-question");
        const choices = card.querySelector(".choices");

        if (!question || !choices) return;

        const life = document.createElement("div");
        life.id = "lifeLabel";
        life.innerHTML = ' ❤️ Peluang x <span id="lifeCount">3</span>';

        life.style.textAlign = "center";
        life.style.margin = "20px 0 12px";
        life.style.fontSize = "16px";
        life.style.fontWeight = "bold";

        // sisipkan DI ANTARA soal & pilihan
        card.insertBefore(life, choices);
      }

      function updateLifeLabel() {
        const data = JSON.parse(localStorage.getItem("record_quiz_multiple"));
        if (!data) return;

        const idx = data.total_current_question - 1;
        const q = data.question[idx];
        if (!q) return;

        const maxLife = 3;
        const lifeLeft = Math.max(0, maxLife - (q.check_trial || 0));

        const el = document.getElementById("lifeCount");
        if (el) el.textContent = lifeLeft;
      }

      function showSnackbar(msg, type = "success", payload = {}) {

        vm.$q.notify({
          message: "Jawaban: " + msg,
          color: "white",
          textColor: "dark",
          group: type,
          position: 'top'
        });


        /* 🔊 AUDIO TRIGGER DI SINI SAJA */
        if (type === "success") {
          playTrueFX();;
          AutoReset();
        }

        if (type === "error") {
          if (msg.includes("Waktu") || payload.timeout) {
            playErrorFX('timeout');   // ⏰ timeout
          } else {
            playErrorFX('error');     // ❌ salah
          }
        }

        /* === RECORD SAAT SNACKBAR MUNCUL === */
        const currentItems = questions.filter(
          (q) => q.current_question === currentSheetSoal
        );

        const currentBlockId = getCurrentBlockId();

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

      let autoResetTimer = null;
      function AutoReset() {

        if (autoResetTimer) {
          clearTimeout(autoResetTimer);
        }

        if (currentSheetSoal < totalSheetSoal) {
          autoResetTimer = setTimeout(() => {
            nextSoal();
          }, 3000);
        }
      }


      // function saveBySnackbar(type, payload) {
      //   let data = JSON.parse(localStorage.getItem(LS_KEY));

      //   if (!data) return;

      //   const blockId = (currentSheetSoal - 1) * max_questions + 1;

      //   // update global
      //   data.total_current_score = score;

      //   const index = data.question.findIndex(
      //     q => q.current_block_question === blockId
      //   );
      //   if (index === -1) return;

      //   const q = data.question[index];

      //   if (type === "success") {
      //     data.total_time_left += timeLeft;

      //     q.status_question = "berhasil";
      //     q.time_left = timeLeft;

      //     q.current_score = score; // ✅ FIX DI SINI
      //   }

      //   if (type === "error") {
      //     data.total_check_trail += 1;

      //     q.status_question = "salah";
      //     q.check_trial += 1;
      //     q.current_minus_score += payload.minus || 0;
      //   }

      //   localStorage.setItem(LS_KEY, JSON.stringify(data));
      // }

      /* ================== LOCAL STORAGE QUIZ (DRAG) ================== */
      const LS_KEY = "record_quiz_multiple";

      function initQuizRecord() {
        if (!localStorage.getItem(LS_KEY)) {

          const allQuestions = [];
          let block_quiz = 1;

          for (let sheet = 1; sheet <= totalSheetSoal; sheet++) {
            for (let i = 1; i <= max_questions; i++) {
              allQuestions.push({
                current_question: sheet,
                current_block_question: block_quiz,
                status_question: "salah",
                current_score: 0,
                time_left: 0,
                check_trial: 0,
                current_minus_score: 0,
              });
              block_quiz++;
            }
          }

          localStorage.setItem(LS_KEY, JSON.stringify({
            total_question: totalSheetSoal,
            total_time_left: 0,
            total_check_trail: 0,
            total_current_score: 0,
            question: allQuestions
          }));
        }
      }

      localStorage.removeItem(LS_KEY); // reset data quiz
      initQuizRecord();

      function getCurrentBlockId() {
        return (currentSheetSoal - 1) * max_questions + 1;
      }

      function recordQuizEvent({
        current_block_question,
        current_question,
        status_question,
        current_score,
        time_left,
        check_trial,
        current_minus_score,
      }) {
        let data = JSON.parse(localStorage.getItem(LS_KEY));

        // 🛡️ GUARD WAJIB (INI FIX ERROR)
        if (!data || !Array.isArray(data.question)) {
          initQuizRecord();
          data = JSON.parse(localStorage.getItem(LS_KEY));
        }

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

          if (prev.status_question === "berhasil" && status_question === "salah") {
            localStorage.setItem(LS_KEY, JSON.stringify(data));
            vm.setForm(data)
            return;
          }

          data.question[index] = {
            ...prev,
            status_question,
            current_score,
            time_left,
            check_trial: prev.check_trial + check_trial,
            current_minus_score: -(prev.current_minus_score + current_minus_score),
          };
        }

        checkingHTML[currentSheetSoal] = document.getElementById("quizCard").outerHTML;
        data.checking = checkingHTML;

        localStorage.setItem(LS_KEY, JSON.stringify(data));
        vm.setForm(data)
      }














      /* ================= INIT ================= */
      function init() {

        updateScore();
        updateLifeLabel();

        const col = document.getElementById("colQ");
        col.innerHTML = "";

        const startIndex = (currentSheetSoal - 1) * max_questions;
        const sheetQuestions = questions.slice(startIndex, startIndex + max_questions);

        sheetQuestions.forEach((q, idx) => {

          const card = document.createElement("div");
          card.className = "tf-card";
          card.dataset.trial = 0;

          const qText = q.top.question.replace(q.top.cut, "_____");
          const question = document.createElement("div");
          question.className = "block_quiz tf-question shadow-2";
          question.textContent = qText;
          question.dataset.template = qText; // 🔒 template asli

          const choices = document.createElement("div");
          choices.className = "choices";

          shuffle(q.bottom.choice).forEach((c, i) => {
            const opt = document.createElement("div");
            opt.className = "block_quiz  shadow-2";
            opt.dataset.correct = c.status;
            opt.innerHTML = `<span class="choice-label">${["A", "B", "C", "D"][i]}.</span> ${c.text}`;
            bindDrag(opt, question, card);
            choices.appendChild(opt);
          });

          // tombol NEXT / HASIL hanya di soal terakhir sheet
          let nextBtn = null;
          if (idx === sheetQuestions.length - 1) {
            nextBtn = document.createElement("button");
            nextBtn.className = "next-btn";

            // 🔥 JIKA SOAL TERAKHIR
            if (currentSheetSoal > totalSheetSoal) {
              nextBtn.className = "hide";

              // nextBtn.textContent = "📊 Lihat Hasil";
              // nextBtn.addEventListener("click", (e) => {
              //   console.log(e)
              //   e.stopPropagation();
              //   // window.location.href = "result.html";
              // });
              return
            } else {
              nextBtn.textContent = "➡️ Next Soal";
              nextBtn.onclick = nextSoal;
            }
          }

          card.append(question, choices);


          insertLifeLabel(card);   // 🔥 DI SINI TEMPATNYA

          if (nextBtn) card.appendChild(nextBtn);

          col.appendChild(card);

          // timer hanya untuk soal pertama sheet
          if (idx === 0) {
            startTimer(card, question);
          }

          DRAG_LOCKED = false; // 🔓 AKTIFKAN DRAG UNTUK SOAL BARU
        });
      }
      init();


    }
  }
};
</script>

<style lang="scss">
.block_quiz {
  border: 0px dashed #60a5fa;
  padding: 16px;
  border-radius: 14px;
  font-weight: bold;
  user-select: none;
  touch-action: none;
  background: #fff;
  /* background: linear-gradient(135deg, #34d399, #60a5fa); */
}

.block_quiz.dragging {
  opacity: .8;
  transform: scale(1.1)
}

.drag-ghost {
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  background: linear-gradient(135deg, #f472b6, #c084fc);
  color: #fff;
  padding: 12px 20px;
  border-radius: 999px;
  transform: translate(-50%, -50%) scale(1.15);
}


#QuizAction {

  .choices .block_quiz {
    // background: #b7fff9 !important;
  }

  .tf-card {
    background: #ffd4005e;
    padding: 14px;
    border-radius: 16px
  }

  .tf-question.correct {
    background: #21ba45;
    color: #fff
  }

  .tf-question.wrong {
    background: #ef4444;
    color: #fff
  }

  .tf-question {
    border: 0px dashed #60a5fa;
    background: #fff;
    /* margin-bottom: 50px; */
  }

  .locked {
    pointer-events: none
  }

  .tf-card.locked .next-btn {
    pointer-events: auto;
  }

  .choices {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 14px;
  }

  .choice-label {
    font-size: 13px;
    opacity: .7;
    margin-right: 6px
  }

  .choices .block_quiz.dragging {
    transform: none !important;
    opacity: 1 !important
  }

  .next-btn {
    margin-top: 12px;
    padding: 10px 16px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: linear-gradient(135deg, #60a5fa, #34d399);
    color: #fff;
    display: none;
    width: 100%;
  }

  .next-btn.show {
    display: block;
  }

  .correct-choice {
    border: 2px solid #22c55e !important;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, .25);

    background: #22c55e;
    color: white;

  }


  .fill-wrong {
    color: #dc2626;
    font-weight: bold;
  }

  .tf-question.wrong .fill-wrong,
  .fill-wrong-final {
    color: white;
    font-weight: bold;
  }

  .fill-correct {
    color: white;
    font-weight: bold;
  }

  .wrong-choice {
    background: #ef4444 !important;
    color: #fff !important;
    border: 2px solid #dc2626 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
  }
}
</style>
