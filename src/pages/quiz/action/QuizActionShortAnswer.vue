<template>
  <q-page id="QuizActionShortAnswer" class="flex flex-center q-pa-sm bg-transparent">
    <QuizMediaComponent />
    <div class="game">
      <q-card class="quiz-card">
        <q-card-section>
          <div class="title">🚀 Quiz Action</div>
          <!-- <div class="subtitle">Match - Present Tense!</div> -->
          <div class="question">Ketik jawaban yang tepat</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="between" class="q-pa-none q-pa-md">
          <div class="timer" id="timer">⏱️ {{ timeLeft }}</div>
          <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
        </q-card-actions>

        <q-card-section>
          <div id="colQ"></div>
          <div class="life">❤️ Peluang x <span id="lifeCount">3</span></div>
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
import { QuizActionBeforeRouteLeave } from "src/utils/sweetAlert";

import { mapActions, mapState } from "pinia";
import { useTimerStore } from "src/stores/useTimerStore";

export default {
  beforeRouteLeave(to, from, next) {
    // const answer = window.confirm('Do you really want to leave?')
    // if (!answer) return false // Cancels the back navigation
    QuizActionBeforeRouteLeave(next)
  },
  computed: {
    ...mapState(useTimerStore, ["timeDefault", "timeLeft"]),
  },
  methods: {
    ...mapActions(useTimerStore, ["startTimer", "resetTimer"]),
  },
  mounted() {
    const vm = this;

    const list_questions = [
      { top: { question: "Saya tidur" }, bottom: { answers: ["i sleep", "i rest", "i nap"] } },
      { top: { question: "Kamu makan" }, bottom: { answers: ["you eat", "you dine", "you snack"] } },
      { top: { question: "Dia (Laki-laki) tertawa" }, bottom: { answers: ["he laughs", "he chuckles", "he giggles"] } },
      { top: { question: "Dia (Perempuan) menangis" }, bottom: { answers: ["she cries", "she weeps", "she sobs"] } },
      { top: { question: "Kami berlari" }, bottom: { answers: ["we run", "we jog", "we sprint"] } },
      { top: { question: "Mereka berjalan" }, bottom: { answers: ["they walk", "they stroll", "they march"] } },
      { top: { question: "Itu jatuh" }, bottom: { answers: ["it falls", "it drops", "it tumbles"] } },
      { top: { question: "Saya bangun" }, bottom: { answers: ["i wake up", "i get up", "i rise"] } },
      { top: { question: "Kamu tidur larut" }, bottom: { answers: ["you sleep late", "you stay up late", "you rest late"] } },
      { top: { question: "Dia (Perempuan) tersenyum" }, bottom: { answers: ["she smiles", "she grins", "she beams"] } },
      { top: { question: "Dia (Laki-laki) berpikir" }, bottom: { answers: ["he thinks", "he ponders", "he reflects"] } },
      { top: { question: "Kami menunggu" }, bottom: { answers: ["we wait", "we linger", "we pause"] } },
      { top: { question: "Mereka mendengar" }, bottom: { answers: ["they hear", "they listen", "they perceive"] } },
      { top: { question: "Itu bersinar" }, bottom: { answers: ["it shines", "it glows", "it gleams"] } },
      { top: { question: "Saya belajar" }, bottom: { answers: ["i study", "i learn", "i practice"] } },
      { top: { question: "Kamu bermain" }, bottom: { answers: ["you play", "you engage", "you have fun"] } },
      { top: { question: "Dia (Perempuan) bergerak" }, bottom: { answers: ["she moves", "she shifts", "she steps"] } },
      { top: { question: "Dia (Laki-laki) bekerja" }, bottom: { answers: ["he works", "he labors", "he toils"] } },
      { top: { question: "Kami tertawa" }, bottom: { answers: ["we laugh", "we chuckle", "we giggle"] } },
      { top: { question: "Mereka menang" }, bottom: { answers: ["they win", "they succeed", "they triumph"] } },
      { top: { question: "Itu jatuh" }, bottom: { answers: ["it drops", "it falls", "it plunges"] } },
      { top: { question: "Saya minum" }, bottom: { answers: ["i drink", "i sip", "i gulp"] } },
      { top: { question: "Kamu berbicara" }, bottom: { answers: ["you speak", "you talk", "you chat"] } },
      { top: { question: "Dia (Perempuan) bernyanyi" }, bottom: { answers: ["she sings", "she hums", "she warbles"] } },
      { top: { question: "Dia (Laki-laki) membaca" }, bottom: { answers: ["he reads", "he scans", "he peruses"] } },
      { top: { question: "Kami bergerak cepat" }, bottom: { answers: ["we move fast", "we dash", "we sprint"] } },
      { top: { question: "Mereka diam" }, bottom: { answers: ["they are silent", "they are quiet", "they hush"] } },
      { top: { question: "Itu terlihat" }, bottom: { answers: ["it appears", "it seems", "it looks"] } },
      { top: { question: "Saya berpikir" }, bottom: { answers: ["i think", "i ponder", "i reflect"] } },
      { top: { question: "Kamu tersenyum" }, bottom: { answers: ["you smile", "you grin", "you beam"] } },
      { top: { question: "Dia (Perempuan) tertidur" }, bottom: { answers: ["she sleeps", "she naps", "she rests"] } },
      { top: { question: "Dia (Laki-laki) memikirkan" }, bottom: { answers: ["he considers", "he thinks", "he ponders"] } },
      { top: { question: "Kami mendengar" }, bottom: { answers: ["we hear", "we listen", "we perceive"] } },
      { top: { question: "Mereka menatap" }, bottom: { answers: ["they look", "they gaze", "they stare"] } },
      { top: { question: "Itu bergetar" }, bottom: { answers: ["it shakes", "it trembles", "it quivers"] } },
      { top: { question: "Saya berdiri" }, bottom: { answers: ["i stand", "i rise", "i get up"] } },
      { top: { question: "Kamu duduk" }, bottom: { answers: ["you sit", "you take a seat", "you settle"] } },
      { top: { question: "Dia (Perempuan) melompat" }, bottom: { answers: ["she jumps", "she leaps", "she hops"] } },
      { top: { question: "Dia (Laki-laki) berlari" }, bottom: { answers: ["he runs", "he sprints", "he jogs"] } },
      { top: { question: "Kami bersorak" }, bottom: { answers: ["we cheer", "we shout", "we exclaim"] } },
      { top: { question: "Mereka menangis" }, bottom: { answers: ["they cry", "they weep", "they sob"] } },
      { top: { question: "Itu melayang" }, bottom: { answers: ["it floats", "it hovers", "it drifts"] } },
      { top: { question: "Saya tersandung" }, bottom: { answers: ["i stumble", "i trip", "i falter"] } },
      { top: { question: "Kamu tersesat" }, bottom: { answers: ["you get lost", "you wander", "you stray"] } },
      { top: { question: "Dia (Perempuan) beristirahat" }, bottom: { answers: ["she rests", "she relaxes", "she reclines"] } },
      { top: { question: "Dia (Laki-laki) tersenyum" }, bottom: { answers: ["he smiles", "he grins", "he beams"] } },
      { top: { question: "Kami berteriak" }, bottom: { answers: ["we shout", "we yell", "we scream"] } },
      { top: { question: "Mereka bergerak" }, bottom: { answers: ["they move", "they shift", "they step"] } },
      { top: { question: "Itu berputar" }, bottom: { answers: ["it spins", "it rotates", "it twirls"] } },
      { top: { question: "Saya menunduk" }, bottom: { answers: ["i bow", "i bend", "i lean"] } },
      { top: { question: "Kamu melambaikan tangan" }, bottom: { answers: ["you wave", "you gesture", "you signal"] } },
      { top: { question: "Dia (Perempuan) berlari" }, bottom: { answers: ["she runs", "she sprints", "she jogs"] } },
      { top: { question: "Dia (Laki-laki) melompat" }, bottom: { answers: ["he jumps", "he leaps", "he hops"] } },
      { top: { question: "Kami tersenyum" }, bottom: { answers: ["we smile", "we grin", "we beam"] } },
      { top: { question: "Mereka menatap" }, bottom: { answers: ["they look", "they gaze", "they stare"] } },
      { top: { question: "Itu berlari" }, bottom: { answers: ["it runs", "it sprints", "it dashes"] } },
      { top: { question: "Saya menggigil" }, bottom: { answers: ["i shiver", "i tremble", "i shake"] } },
      { top: { question: "Kamu menguap" }, bottom: { answers: ["you yawn", "you gape", "you open your mouth wide"] } },
      { top: { question: "Dia (Perempuan) mendesis" }, bottom: { answers: ["she hisses", "she whispers", "she murmurs"] } },
      { top: { question: "Dia (Laki-laki) melamun" }, bottom: { answers: ["he daydreams", "he drifts off", "he zones out"] } },
      { top: { question: "Kami bersantai" }, bottom: { answers: ["we relax", "we rest", "we recline", "we chill"] } },
      { top: { question: "Mereka berteriak keras" }, bottom: { answers: ["they shout loudly", "they scream", "they yell"] } },
      { top: { question: "Itu mengalir" }, bottom: { answers: ["it flows", "it streams", "it runs"] } },
      { top: { question: "Saya mendesis" }, bottom: { answers: ["i hiss", "i whisper", "i murmur"] } },
      { top: { question: "Kamu tersandung" }, bottom: { answers: ["you stumble", "you trip", "you falter"] } },
      { top: { question: "Dia (Perempuan) tertawa" }, bottom: { answers: ["she laughs", "she giggles", "she chuckles"] } },
      { top: { question: "Dia (Laki-laki) menunduk" }, bottom: { answers: ["he bows", "he leans", "he bends"] } },
      { top: { question: "Kami berbisik" }, bottom: { answers: ["we whisper", "we murmur", "we hiss"] } },
      { top: { question: "Mereka melompat" }, bottom: { answers: ["they jump", "they leap", "they hop"] } },
      { top: { question: "Itu bergerak perlahan" }, bottom: { answers: ["it moves slowly", "it drifts", "it creeps"] } },
      { top: { question: "Saya memutar" }, bottom: { answers: ["i turn", "i rotate", "i spin"] } },
      { top: { question: "Kamu menunduk" }, bottom: { answers: ["you bow", "you lean", "you bend"] } },
      { top: { question: "Dia (Perempuan) bersinar" }, bottom: { answers: ["she shines", "she glows", "she gleams"] } },
      { top: { question: "Dia (Laki-laki) bergetar" }, bottom: { answers: ["he shakes", "he trembles", "he quivers"] } },
      { top: { question: "Kami mengangguk" }, bottom: { answers: ["we nod", "we bow", "we assent"] } },
      { top: { question: "Mereka tersenyum" }, bottom: { answers: ["they smile", "they grin", "they beam"] } },
      { top: { question: "Itu melayang tinggi" }, bottom: { answers: ["it floats high", "it soars", "it hovers"] } },
      { top: { question: "Saya menghela napas" }, bottom: { answers: ["i sigh", "i exhale", "i breathe out"] } },
      { top: { question: "Kamu menatap" }, bottom: { answers: ["you look", "you gaze", "you stare"] } },
      { top: { question: "Dia (Perempuan) menguap" }, bottom: { answers: ["she yawns", "she stretches", "she gapes"] } },
      { top: { question: "Dia (Laki-laki) tersenyum lebar" }, bottom: { answers: ["he smiles", "he grins", "he beams"] } },
      { top: { question: "Kami terkejut" }, bottom: { answers: ["we are surprised", "we are shocked", "we are startled", "we gasp", "we exclaim"] } },
      { top: { question: "Mereka menunduk" }, bottom: { answers: ["they bow", "they lean", "they bend"] } },
      { top: { question: "Itu berputar cepat" }, bottom: { answers: ["it spins fast", "it twirls", "it rotates quickly"] } },
      { top: { question: "Saya menggeliat" }, bottom: { answers: ["i wriggle", "i twist", "i squirm"] } },
      { top: { question: "Kamu tertawa kecil" }, bottom: { answers: ["you giggle", "you chuckle", "you laugh softly"] } },
      { top: { question: "Dia (Perempuan) menunduk" }, bottom: { answers: ["she bows", "she leans", "she bends"] } },
      { top: { question: "Dia (Laki-laki) menguap" }, bottom: { answers: ["he yawns", "he stretches", "he gapes"] } },
      { top: { question: "Kami bersorak" }, bottom: { answers: ["we cheer", "we shout", "we exclaim"] } },
      { top: { question: "Mereka beristirahat" }, bottom: { answers: ["they rest", "they relax", "they recline"] } },
      { top: { question: "Itu meluncur" }, bottom: { answers: ["it slides", "it glides", "it slips"] } },
      { top: { question: "Saya berjalan perlahan" }, bottom: { answers: ["i walk slowly", "i stroll", "i saunter"] } },
      { top: { question: "Kamu berlari cepat" }, bottom: { answers: ["you run fast", "you sprint", "you dash"] } },
      { top: { question: "Dia (Perempuan) tersenyum lebar" }, bottom: { answers: ["she beams", "she grins", "she smiles"] } },
      { top: { question: "Dia (Laki-laki) mengangguk" }, bottom: { answers: ["he nods", "he bows", "he assents"] } },
      { top: { question: "Kami menunduk" }, bottom: { answers: ["we bow", "we lean", "we bend"] } }
    ];

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

    let timeDefault = 90;
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
            setTimeout(() => window.location.href = "result.html", 1200);
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
      question.className = "block tf-question";
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
        nextBtn.textContent = "📊 Lihat Result";
        nextBtn.onclick = () => {
          window.location.href = "result.html";
        };
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
          window.location.href = "result.html";
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
        let block = 1;

        for (let sheet = 1; sheet <= totalSheetSoal; sheet++) {
          for (let i = 1; i <= max_questions; i++) {
            allQuestions.push({
              current_question: sheet,
              current_block_question: block,
              status_question: "salah",
              current_score: 0,
              time_left: timeDefault,
              check_trial: 0,
              current_minus_score: 0
            });
            block++;
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
          current_minus_score: -(prev.current_minus_score + current_minus_score)
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
          current_minus_score: current_minus_score <= 0 ? 0 : -current_minus_score
        });
      }

      localStorage.setItem(LS_KEY, JSON.stringify(data));
    }


    /* ================== TAMBAHAN DI SHOWSNACKBAR ================== */
    function showSnackbar(msg, type = "success", payload = {}) {
      // const container = document.getElementById("snackbar-container");
      // if (!container) return;

      // const bar = document.createElement("div");
      // bar.className = `snackbar ${type}`;
      // bar.textContent = msg;

      // container.prepend(bar);
      // bar.getBoundingClientRect(); // trigger reflow
      // bar.classList.add("show");

      vm.$q.notify({
        message: "Jawaban: " + msg,
        // icon: type == "success" ? 'ion-checkmark-circle' : 'ion-close-circle',
        // color: type == "success" ? 'positive' : 'negative',
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

        // setTimeout(() => {
        //     AutoReset();
        // }, 1200);
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


      // setTimeout(() => {
      //   bar.classList.remove("show");
      //   setTimeout(() => bar.remove(), 400);
      // }, 1600);
    }

  }
};
</script>

<style lang="scss">
  .animate__animated {
    animation: inherit !important;
  }

#QuizActionShortAnswer {
  .block {
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
    margin-top: 10px;
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
    border: 2px solid #16a34a;
  }

  input.wrong-input {
    background: #fee2e2;
    border: 2px solid #dc2626;
  }
}
</style>
