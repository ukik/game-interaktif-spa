<template>
  <q-page id="QuizAction" class="flex flex-center q-pa-sm bg-transparent">
    <QuizMediaComponent />
    <WinLottie />
    <div v-show="!is_quiz_done && is_not_error" class="game">
      <q-card id="quizCard" bordered class="quiz-card">
        <q-card-section>
          <div class="title">🚀 Quiz Action</div>
          <!-- <div class="subtitle">Match - Present Tense!</div> -->
          <div class="question">Ketik jawaban yang tepat</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="between" class="q-pa-none q-pa-md">
          <div class="timer" id="timer">⏱️ 0</div>
          <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
        </q-card-actions>

        <q-card-section>
          <div id="colQ"></div>
          <div class="life">❤️ Peluang x <span id="lifeCount">3</span></div>
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
    this.dummyOnCreate('shortanswer')
  },
  methods: {
    onStart() {
      const vm = this;

      console.log('this.get_aktivitas_tugasable', this.get_aktivitas_tugasable)

      if (this.get_aktivitas_tugasable?.kategori != 'shortanswer') {
        this.notifFailed('data gagal diproses', 'Salah Quiz')
        this.is_not_error = false;
        return
      }

      const list_questions = this.get_aktivitas_tugasable?.konten


      let checkingHTML = {};

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      shuffleArray(list_questions);


      let score = 0;

      const totalSheetSoal = 15;
      let currentSheetSoal = 1;

      const max_questions = 1; // jumlah soal yang tampil dalam 1 sheet
      let questions = [];

      let blockId = 1;
      let poolIndex = 0;

      for (let q = 1; q <= totalSheetSoal; q++) {   // ⬅️ FIX: totalSheetSoal
        for (let i = 0; i < max_questions; i++) {
          const item = list_questions[poolIndex % list_questions.length];

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

      /* ================= TIMER ================= */
      let life = 3;

      let timeDefault = 15;
      let timeLeft = timeDefault;
      let timerInterval = null;

      function updateLife() {
        document.getElementById("lifeCount").textContent = life;
      }

      function startTimer(card, question) {
        stopTimer();
        timeLeft = timeDefault;
        document.getElementById("timer").textContent = "⏱️ " + timeLeft;

        timerInterval = setInterval(() => {
          if(vm.is_quiz_done || !vm.is_not_error || vm?.$route?.params?.quiz != 'shortanswer')  return clearInterval(timerInterval);

          if (!document.getElementById("timer")) return clearInterval(timerInterval);
          timeLeft--;
          document.getElementById("timer").textContent = "⏱️ " + timeLeft;

          if (timeLeft <= 0) {
            showHint(currentSheetSoal); // tampilkan jawaban benar
            question.classList.add("wrong", "locked");

            life--;
            updateLife();

            showSnackbar("⏰ Waktu Habis! -50", "error", {
              questionIndex: currentSheetSoal,
              correct: false,
              timeout: true,
              scoreChange: -50
            });

            // stopTimer();

            // ✅ pastikan tombol cek hilang
            const btnCheck = document.getElementById("btnCheck");
            if (btnCheck) btnCheck.style.display = "none";

            const btnNext = document.getElementById("btnNext");
            if (btnNext) btnNext.style.display = "block";

            if (life <= 0) {
              clearInterval(timerInterval);
              // setTimeout(() => window.location.href = "result.html", 1200);
            } else {
              // AutoReset();
            }
          }
        }, 1000);
      }

      function stopTimer() {
        clearInterval(timerInterval);
      }

      /* ================= CHECK (ASLI) ================= */
      function check(choice, question, card) {
        if (card.classList.contains("locked")) return;

        if (choice.dataset.correct === "true") {

          question.classList.add("correct", "locked");

          const next = document.getElementById("btnNext");
          if (next) next.style.display = "block";

          card.classList.add("locked");

          showSnackbar("✔️ Jawaban Benar! +100", "success", {
            questionIndex: currentSheetSoal,
            correct: true,
            scoreChange: 100
          });
          // stopTimer();

          return;
        }

        // ❌ SALAH
        life--;
        updateLife();
        shake();

        showSnackbar("❌ Jawaban salah! -20", "error", {
          questionIndex: currentSheetSoal,
          correct: false,
          scoreChange: -20
        });

        if (life <= 0) {
          showHint(currentSheetSoal);

          question.classList.add("wrong", "locked");

          const btnCheck = document.getElementById("btnCheck");
          if (btnCheck) btnCheck.style.display = "none";

          const btnNext = document.getElementById("btnNext");
          if (btnNext) btnNext.style.display = "block";

          card.classList.add("locked");
          // stopTimer();
        }
      }


      let hintShown = false;
      /* ================= INIT ================= */
      function init() {
        hintShown = false;
        life = 3;          // 🔁 reset setiap soal
        updateLife();
        updateScore();
        const col = document.getElementById("colQ");
        col.innerHTML = "";

        const q = questions[currentSheetSoal - 1];

        const card = document.createElement("div");
        card.className = "tf-card";
        card.dataset.trial = 0;

        const question = document.createElement("div");
        question.className = "block_quiz tf-question";
        question.textContent = q.top.question;

        const choices = document.createElement("div");
        choices.className = "choices";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Ketik jawaban...";
        input.style.width = "100%";
        input.style.padding = "14px";
        // input.style.marginBottom = "30px";
        input.style.borderRadius = "14px";
        input.style.boxSizing = "border-box";
        input.style.fontSize = "20px";
        input.autofocus = true; // 🔹 auto focus

        const btn = document.createElement("button");
        btn.className = "next-btn";
        btn.textContent = "✔️ Cek Jawaban";
        btn.id = "btnCheck";


        function highlightQuestionIfNoLife(questionDiv) {
          if (life <= 0 && questionDiv) {
            questionDiv.style.background = "rgb(255 68 68)"; // merah terang
            questionDiv.style.color = "#fff";         // teks putih
          }
        }

        btn.onclick = () => {

          input.classList.remove("correct-input", "wrong-input");

          const value = input.value.trim().toLowerCase();
          const qIndex = currentSheetSoal - 1;

          if (!value) {

            input.classList.add("wrong-input");

            life--;
            updateLife();
            shake();

            showSnackbar("❌ Jawaban belum diisi! -20", "error", { questionIndex: qIndex, correct: false, scoreChange: -20 });

            highlightQuestionIfNoLife(question);

            if (life <= 0) {
              const btnCheck = document.getElementById("btnCheck");
              if (btnCheck) btnCheck.style.display = "none";

              const btnNext = document.getElementById("btnNext");
              if (btnNext) btnNext.style.display = "block";
            }
            return;
          }

          const isCorrect = q.bottom.answers
            .map(a => a.toLowerCase())
            .includes(value);

          if (isCorrect) {
            input.classList.add("correct-input");
          } else {
            input.classList.add("wrong-input");
          }

          const fakeChoice = {
            textContent: value,
            dataset: {
              correct: isCorrect ? "true" : "false"
            }
          };

          check(fakeChoice, question, card);

          highlightQuestionIfNoLife(question);
        };

        input.addEventListener("focus", () => {
          input.classList.remove("wrong-input", "correct-input");
        });

        input.addEventListener("keydown", e => {
          if (e.key === "Enter") btn.click();
        });

        card.append(question, choices);
        col.appendChild(card);

        const answerHint = document.createElement("div");
        answerHint.id = "answerHint";
        answerHint.className = "answer-hint";
        answerHint.style.display = "none";

        choices.append(input, answerHint, btn);

        const hint = document.getElementById("answerHint");
        if (hint) hint.style.display = "none";

        const nextBtn = document.createElement("button");
        nextBtn.className = "next-btn-2";
        nextBtn.id = "btnNext";

        if (currentSheetSoal < totalSheetSoal) {
          nextBtn.textContent = "➡️ Next Soal";
          nextBtn.onclick = () => {
            // 🔴 cancel AutoReset jika ada
            if (autoResetTimeout) {
              clearTimeout(autoResetTimeout);
              autoResetTimeout = null;
            }

            // stopTimer();
            currentSheetSoal++;
            init();
          };
        } else {
          nextBtn.className = "hide";

          // nextBtn.textContent = "📊 Lihat Result";
          // nextBtn.onclick = () => {
          //   clearInterval(timerInterval)
          //   // window.location.href = "result.html";
          // };
          return
        }

        choices.appendChild(nextBtn);


        startTimer(card, question);

        // fokus ke input saat soal muncul
        const inputField = document.querySelector("#colQ input");
        if (inputField) inputField.focus();
      }

      init();

      /* ================= UTIL ================= */
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

      /* ================= AUTO NEXT ================= */
      let autoResetTimeout = null; // GLOBAL, di luar fungsi

      function AutoReset() {


        stopTimer();

        const input = document.querySelector("#colQ input");

        autoResetTimeout = setTimeout(() => {
          currentSheetSoal++;

          if (currentSheetSoal > totalSheetSoal) {

            console.log('GAME OVER')
            vm.onCreate()

            clearInterval(timerInterval)

            // window.location.href = "result.html";
          } else {

            init();

          }

          autoResetTimeout = null;
        }, 5000);
      }

      function showHint(questionIndex) {

        if (hintShown) return;
        hintShown = true;

        const input = document.querySelector("#colQ input");
        const hint = document.getElementById("answerHint");

        if (!input || !hint) return;

        const q = questions[questionIndex - 1];
        if (!q) return;

        const answers = q.bottom.answers;

        // input tetap seperti jawaban user
        input.disabled = true;

        // buat list jawaban
        hint.innerHTML = "";

        const ul = document.createElement("ul");

        // buat format teks
        let text = "Opsi Jawaban:\n";

        answers.forEach(a => {
          text += "- " + a + "\n";
        });

        hint.textContent = text;
        hint.style.whiteSpace = "pre-line"; // supaya \n jadi baris baru
        hint.style.display = "block";

      }

      /* ================== LOCAL STORAGE QUIZ FIX ================== */
      const LS_KEY = "record_quiz_shortanswer";

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
                time_left: timeDefault,
                check_trial: 0,
                current_minus_score: 0,
              });
              block_quiz++;
            }
          }

          localStorage.setItem(LS_KEY, JSON.stringify({
            total_question: totalSheetSoal,
            total_time_left: totalSheetSoal * timeDefault,
            total_check_trail: 0,
            total_current_score: 0,
            question: allQuestions
          }));
        }
      }

      localStorage.removeItem(LS_KEY); // reset data quiz
      initQuizRecord();


      function updateRecord({
        current_block_question,
        current_question,
        status_question,
        current_score,
        time_left,
        check_trial,
        current_minus_score
      }) {
        const data = JSON.parse(localStorage.getItem(LS_KEY));
        if (!data) return;

        /* === UPDATE TOTAL === */
        data.total_current_score = current_score;
        data.total_check_trail += check_trial;

        if (status_question === "berhasil") {
          data.total_time_left += time_left;
        }

        const index = data.question.findIndex(
          q => q.current_block_question === current_block_question
        );

        if (index > -1) {
          const prev = data.question[index];

          // 🔒 jangan turunkan status dari berhasil ke salah
          if (prev.status_question === "berhasil" && status_question === "salah") {
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


      /* ================== TAMBAHAN DI SHOWSNACKBAR ================== */
      function showSnackbar(msg, type = "success", payload = {}) {

        vm.$q.notify({
          message: "Jawaban: " + msg,
          color: "white",
          textColor: "dark",
          group: type,
        });


        // 🔊 AUDIO
        if (type === "success") {
          stopTimer();

          const btnCheck = document.getElementById("btnCheck");
          if (btnCheck) btnCheck.style.display = "none";

          showHint(currentSheetSoal);
          playTrueFX();

          score += 100;       // ⬅️ kurangi score global

          AutoReset();

          confetti();
        }
        if (type === "error") {
          if (msg.includes("Waktu") || payload.timeout) {
            stopTimer();

            score -= 50;       // ⬅️ kurangi score global

            showHint(currentSheetSoal);
            playErrorFX('timeout');

            AutoReset();
          } else {

            score -= 20;       // ⬅️ kurangi score global

            playErrorFX('error');
            if (life <= 0) {
              stopTimer();
              showHint(currentSheetSoal);

              AutoReset();

            }


          }
        }

        updateScore();     // ⬅️ refresh tampilan



        if (payload.questionIndex !== undefined) {
          updateRecord({
            current_block_question: currentSheetSoal,
            current_question: currentSheetSoal,
            status_question: type === "success" ? "berhasil" : "salah",
            current_score: score,
            time_left: timeLeft,
            check_trial: 1,
            current_minus_score: type === "success" ? 0 : Math.abs(payload.scoreChange)
          });
        }
      }

    }
  }
};
</script>

<style lang="scss">
.animate__animated {
  animation: inherit !important;
}

#QuizAction {
  .block_quiz {
    padding: 16px;
    border-radius: 14px;
    font-weight: bold;
    background: #fff;
  }

  .tf-card {
    background: #ffd4005e;
    padding: 14px;
    border-radius: 16px
  }

  .tf-question.correct {
    background: #22c55e;
    color: #fff
  }

  .tf-question.wrong {
    background: #ef4444;
    color: #fff
  }

  .locked {
    pointer-events: none
  }

  .choices {
    margin-top: 14px;
  }

  .next-btn {
    margin-top: 40px;
    padding: 10px 16px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: linear-gradient(135deg, #60a5fa, #34d399);
    color: #fff;
    width: 100%;
  }

  input {
    box-sizing: border-box;
  }

  .question {
    text-align: center;
    margin-bottom: 12px;
    font-weight: bold;
    color: #7c2d12
  }

  .result-btn {
    margin-top: 10px;
    padding: 10px 16px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    color: #fff;
    width: 100%;
  }

  .next-btn-2 {
    margin-top: 40px;
    padding: 10px 16px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    color: #fff;
    width: 100%;
    display: none;
  }

  .next-btn-2 {
    pointer-events: auto;
  }


  .fill-wrong {
    color: #dc2626;
    font-weight: bold;
  }

  .fill-wrong-final {
    color: white;
    font-weight: bold;
  }

  .fill-correct {
    color: white;
    font-weight: bold;
  }

  .answer-hint {
    margin-top: 10px;
    margin-bottom: 30px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #16a34a;
    color: #16a34a;
    font-weight: bold;
    text-align: left;
    font-size: 16px;
    line-height: 1.4;
    background: white;
    word-break: break-word;
  }

  .answer-hint ul {
    list-style: none;
    margin: 6px 0 0 0;
    padding: 0;
  }

  .answer-hint li {
    /* background:#f1f5f9; */
    margin: 4px 0;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 14px;
  }

  input.correct-input {
    background: #dcfce7;
    border: 2px solid #16a34a !important;
  }

  input.wrong-input {
    background: #fff;
    border: 2px solid #dc2626;
  }

  input[disabled] {
    background-color: #fff !important;
    opacity: 1 !important;
    border: 2px solid #dc2626;
  }
}
</style>
