<template>
  <q-page id="QuizActionEssay" class="flex flex-center q-pa-sm bg-transparent">
    <QuizMediaComponent />
    <div class="game">
      <q-card class="quiz-card">
        <q-card-section>
          <div class="title">🚀 Quiz Action</div>
          <!-- <div class="subtitle">Match - Present Tense!</div> -->
          <div class="question">Essay Pengetahuan Umum</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="between" class="q-pa-none q-pa-md">
          <div class="timer" id="timer">⏱️ {{ timeLeft }}</div>
          <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
        </q-card-actions>

        <q-card-section>
          <div class="tf-card" data-trial="0">
            <div id="question">Text:</div>
            <div class="question" id="charCount">0 / 500 char</div>
            <div class="grow-wrap">
              <textarea name="text" id="answer" maxlength="500" placeholder="Ketik jawaban yang tepat"></textarea>
            </div>

            <div class="btn-group">
              <button class="next-btn" id="checkAnswer">
                ✔️ Cek Jawaban
              </button>
              <button class="next-btn-2" id="lockedAnswer" style="display: none">
                ➡️ Simpan Jawaban
              </button>
              <button class="next-btn-2" id="nextBtn" style="display: none">
                ➡️ Next Soal
              </button>

              <button class="result-btn" id="btnResult" style="display: none">
                📘 Lihat Hasil
              </button>
            </div>
          </div>
          <div class="life">❤️ Peluang x <span id="lifeCount">5</span></div>

          <div class="score" style="display: none" id="result"></div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import playErrorFX from "src/composables/quiz/playErrorFX";
import playTrueFX from "src/composables/quiz/playTrueFX";
import list_questions from "src/composables/quiz/soalEssay";
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
    // this.resetTimer();

    const vm = this;

    /* ================= INPUT FILTER ================= */
    const textarea = document.getElementById("answer");

    textarea.addEventListener("input", function () {
      let text = this.value;

      // hapus HTML
      text = text.replace(/<[^>]*>/g, "");

      // tab → spasi
      text = text.replace(/\t/g, " ");

      // banyak spasi → 1 spasi
      text = text.replace(/ {2,}/g, " ");

      // banyak newline → 1 newline
      text = text.replace(/\n{2,}/g, "\n");

      this.value = text;
    });

    /* ================= SOAL ================= */

    let questions = [];
    const max_questions = 5;

    const shuffled = [...list_questions].sort(() => Math.random() - 0.5);

    for (let i = 0; i < max_questions; i++) {
      questions.push(shuffled[i]);
    }

    console.log(questions);

    /* ================= STATE ================= */
    const lifeDefault = 5;
    let life = lifeDefault;
    const totalSoal = questions.length;
    let current = 0,
      score = 0;
    let dragged = null,
      ghost = null,
      startPos = new Map();
    let checkTrial = 0;
    let minusThisQuestion = 0;
    let totalRankPoint = 0;

    /* ================= RECORD ================= */
    let record_quiz = {
      total_question: totalSoal,
      total_time_left: 0,
      total_check_trail: 0,
      total_current_score: 0,
      question: [],
    };

    function updateLife() {
      document.getElementById("lifeCount").textContent = life;
      if (life <= 0) {
        const btn = document.getElementById("checkAnswer").style;
        btn.pointerEvents = "none";
        btn.display = "none";
      }
    }

    function safeDivide(a, b) {
      return b === 0 ? 0 : a / b;
    }

    /* ================= ESSAY CHECKER ================= */
    let message = "Silakan tulis jawaban terlebih dahulu.";

    function getReferenceSimilarity(answer, references) {
      if (!Array.isArray(references)) {
        references = [references];
      }

      let answerWords = answer.split(/\s+/);

      let bestSimilarity = 0;

      references.forEach((ref) => {
        let refWords = ref.toLowerCase().split(/\s+/);

        let match = 0;

        refWords.forEach((w) => {
          if (answerWords.includes(w)) {
            match++;
          }
        });

        let similarity = match / refWords.length;

        if (similarity > bestSimilarity) {
          bestSimilarity = similarity;
        }
      });

      return bestSimilarity;
    }

    function checkEssay(answer, questionObj) {
      answer = answer.toLowerCase().replace(/[^\w\s]/g, "");

      document.getElementById("result").style.display = "block";

      if (answer.trim() === "") {
        document.getElementById("result").innerHTML = message;

        showSnackbar("❌ Jawaban belum diisi!", "error", {
          // questionIndex: currentSheetSoal,
          correct: true,
          scoreChange: -20,
        });

        return {
          score: 0,
          concept: 0,
          similarity: 0,
          diversity: 0,
          detectedConcepts: [],
          missedConcepts: Object.keys(questionObj.concepts),
          matchedKeywords: [],
          allKeywords: Object.values(questionObj.concepts).flat(),
          nonsensePenalty: 0,
        };
      }

      let words = answer.split(/\s+/).filter((w) => w.length > 2);
      if (words.length === 0) {
        return {
          score: 0,
          concept: 0,
          similarity: 0,
          diversity: 0,
          detectedConcepts: [],
          missedConcepts: Object.keys(questionObj.concepts),
          matchedKeywords: [],
          allKeywords: Object.values(questionObj.concepts).flat(),
          nonsensePenalty: 0,
        };
      }

      let nonsensePenalty = 0;

      let concepts = questionObj.concepts;

      let conceptHit = 0;
      let conceptTotal = Object.keys(concepts).length;

      let detectedConcepts = [];
      let missedConcepts = [];

      let matchedKeywords = [];
      let allKeywords = [];

      for (let key in concepts) {
        let keywords = concepts[key];
        allKeywords.push(...keywords);

        if (keywords.some((w) => new RegExp("\\b" + w + "\\b").test(answer))) {
          // if (keywords.some(w => answer.includes(w))) {
          conceptHit++;
          detectedConcepts.push(key);

          keywords.forEach((k) => {
            if (new RegExp("\\b" + k + "\\b").test(answer)) matchedKeywords.push(k);
            // if (answer.includes(k)) matchedKeywords.push(k);
          });
        } else {
          missedConcepts.push(key);
        }
      }

      // let conceptScore = conceptHit / conceptTotal;
      let conceptScore = Math.sqrt(conceptHit / conceptTotal);
      if (conceptHit <= 1) {
        conceptScore *= 0.4;
      } else if (conceptHit == 2) {
        conceptScore *= 0.7;
      }

      let uniqueWords = new Set(words).size;
      let diversity = safeDivide(uniqueWords, words.length);

      let refArray = Array.isArray(questionObj.referenceAnswer)
        ? questionObj.referenceAnswer
        : [questionObj.referenceAnswer];

      let ref = refArray.join(" ").toLowerCase();
      let refWords = ref.split(/\s+/);

      console.log(refArray);
      console.log(ref);

      let match = 0;

      words.forEach((w) => {
        if (refWords.includes(w)) match++;
      });

      // let similarity = match / refWords.length;
      let similarity = getReferenceSimilarity(answer, questionObj.referenceAnswer);
      if (conceptHit <= 1) similarity *= 0.5;
      else if (conceptHit == 2) similarity *= 0.8;

      let reasonScore = 1;

      if (questionObj.question.toLowerCase().includes("mengapa")) {
        const reasonWords = ["karena", "sebab", "agar", "supaya", "oleh karena"];

        if (!reasonWords.some((w) => answer.includes(w))) {
          reasonScore = 0.6;
        }
      }

      let lengthScore = 1;

      if (words.length < 10) lengthScore = 0.4;
      else if (words.length < 20) lengthScore = 0.6;
      else if (words.length < 35) lengthScore = 1;
      else lengthScore = 1.05;

      let relevance = safeDivide(matchedKeywords.length, words.length);

      if (words.length > 15 && relevance < 0.05) {
        nonsensePenalty += 0.35;
      }

      if (words.length > 60 && conceptHit <= 1) {
        nonsensePenalty += 0.25;
      }

      let sentences = answer
        .split(/[.!?]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 10);
      let uniqueSentences = new Set(sentences).size;

      if (sentences.length > 3 && uniqueSentences / sentences.length < 0.6) {
        nonsensePenalty += 0.4;
      }

      if (nonsensePenalty > 0.8) {
        nonsensePenalty = 0.8;
      }

      let finalScore =
        conceptScore * 0.4 +
        similarity * 0.25 +
        diversity * 0.15 +
        lengthScore * 0.1 +
        reasonScore * 0.1;

      // penalti jawaban sangat pendek
      if (words.length < 6) {
        finalScore *= 0.6;
      }

      finalScore = finalScore - nonsensePenalty;

      if (finalScore > 1) finalScore = 1;
      if (finalScore < 0) finalScore = 0;

      return {
        score: Math.round(finalScore * 100),
        concept: conceptScore,
        similarity: similarity,
        diversity: diversity,
        length: lengthScore,
        reason: reasonScore,
        detectedConcepts,
        missedConcepts,
        matchedKeywords,
        allKeywords,
        nonsensePenalty,
      };
    }

    /* ================= CHECK ================= */
    let rank = "E";
    let rank_point = 0;
    let locked = false;
    let answer = null;
    let checking = null;

    function setRankPoint(a, b) {
      rank = a;
      rank_point = b;
    }

    function check(locked_status = false) {
      console.log('locked_status', locked_status)
      locked = locked_status;

      answer = document.getElementById("answer").value;

      let q = questions[current - 1];

      let r = checkEssay(answer, q);

      if (r?.score) {
        if (!locked) {
          life--;
          checkTrial++;
          updateLife();
        }

        if (r.score < 30) {
          message = "Jawaban terlalu melenceng dari topik.";

          setRankPoint("E", 1);

          showSnackbar(`✔️ Jawaban terlalu melenceng! ${rank}`, "error", {
            correct: true,
            scoreRate: r.score,
          });
        } else if (r.concept < 0.4) {
          message = "Jawaban terlalu umum dan belum menyentuh inti pembahasan.";

          setRankPoint("D", 2);

          showSnackbar(`✔️ Jawaban terlalu umum! ${rank}`, "bad", {
            correct: true,
            scoreRate: r.score,
          });
        } else if (r.score < 60) {
          message = "Jawaban kurang tajam, beberapa konsep penting belum muncul.";

          setRankPoint("C", 3);

          showSnackbar(`✔️ Jawaban kurang tajam! ${rank}`, "bad", {
            correct: true,
            scoreRate: r.score,
          });
        } else if (r.score < 80) {
          message = "Jawaban cukup akurat dan sudah mencakup beberapa konsep penting.";

          setRankPoint("B", 4);

          showSnackbar(`✔️ Jawaban cukup akurat! ${rank}`, "enough", {
            correct: true,
            scoreRate: r.score,
          });
        } else {
          message = "Jawaban memuaskan dan sangat relevan dengan pertanyaan.";

          setRankPoint("A", 5);

          showSnackbar(`✔️ Jawaban memuaskan! ${rank}`, "success", {
            correct: true,
            scoreRate: r.score,
          });
        }

        let missedKeywords = r.allKeywords.filter((k) => !r.matchedKeywords.includes(k));
        checking = reportAnswer(r, q, missedKeywords);

        document.getElementById("result").innerHTML = checking;

        // document.body.style.height = "100%";
      } else {
        life--;
        checkTrial++;
        updateLife();

        let missedKeywords = r?.allKeywords.filter((k) => !r.matchedKeywords.includes(k));
        checking = reportAnswer(r, q, missedKeywords);

        document.getElementById("result").innerHTML = checking;
      }

      document.getElementById("lockedAnswer").style.display = "inline-block";

      if (timeLeft <= 0 || life <= 0 || locked) {
        stopTimer();

        document.getElementById("nextBtn").style.display = "inline-block";

        document.getElementById("checkAnswer").style.display = "none";
        document.getElementById("lockedAnswer").style.display = "none";
        document.getElementById("answer").style.pointerEvents = "none";

        console.log(1)
      }

      if (timeLeft <= 0) {
        totalRankPoint += rank_point;
        recordQuizEvent("Time-out", checking);
        updateLabelScore();
        console.log(2)
      }
      if (life <= 0) {
        totalRankPoint += rank_point;
        recordQuizEvent("Chance-out", checking);
        updateLabelScore();
        console.log(3)
      }
      if (locked) {
        totalRankPoint += rank_point;
        recordQuizEvent("Submit", checking);
        updateLabelScore();
        console.log(4)
      }

      // updateLabelScore();
    }

    /* ================= NEXT QUESTION ================= */
    function lihatHasil() {
      window.location.href = "result.html";
    }
    function nextQuestion() {
      if (current >= questions.length) {
        // semua soal selesai
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("btnResult").style.display = "inline-block";
      } else {
        loadQuestion();
      }
    }

    /* ================= GAME ================= */
    function updateLabelScore() {
      let final_point = getFinalRank();

      const scoreEl = document.getElementById("score");
      scoreEl.textContent = `🏆 Ranking: ${final_point?.rank} (${final_point?.rank_point}) | 📘 Soal: ${current}/${totalSoal}`;
    }

    function countChar(el) {
      let max = 500;
      let len = el.value.length;
      document.getElementById("charCount").textContent = len + " / " + max;
    }

    function reportAnswer(r, q, missedKeywords) {
      // "Score: " + r.score + "/100 <br><br>" +
      let checking =
        "<b>ANALISA:</b><br><br>" +
        '"' +
        message +
        '"' +
        "<br> <br>" +
        "Hasil:</b><br>" +
        "Rank: " +
        rank +
        " <br>" +
        "Rank Poin: " +
        rank_point +
        "/5 <br><br>" +
        "Breakdown:</b><br>" +
        "Concept (40%): " +
        (r?.concept * 100).toFixed(1) +
        "%<br>" +
        "Similarity (25%): " +
        (r?.similarity * 100).toFixed(1) +
        "%<br>" +
        "Diversity (15%): " +
        (r?.diversity * 100).toFixed(1) +
        "%<br>" +
        "Length (10%): " +
        ((r?.length ?? 0) * 100).toFixed(1) +
        "%<br>" +
        "Reason (10%): " +
        ((r?.reason ?? 0) * 100).toFixed(1) +
        "%<br>" +
        "Nonsense Penalty: " +
        (r?.nonsensePenalty * 100).toFixed(0) +
        "%<br>";

      if (life <= 0 || rank == "A" || locked) {
        let refHTML = "";

        if (Array.isArray(q?.referenceAnswer)) {
          refHTML =
            "<ul>" +
            q.referenceAnswer.map((r) => "<li>" + r + "</li>").join("") +
            "</ul>";
        } else {
          refHTML = "<ul><li>" + q?.referenceAnswer + "</li></ul>";
        }

        checking +=
          "<br><b>Konsep terdeteksi:</b><br>" +
          (r?.detectedConcepts.join(", ") || "-") +
          "<br><br><b>Konsep belum muncul:</b><br>" +
          (r?.missedConcepts.join(", ") || "-") +
          "<br><br><b>Keyword cocok:</b><br>" +
          (r?.matchedKeywords.join(", ") || "-") +
          "<br><br><b>Keyword belum disebut:</b><br>" +
          (missedKeywords?.slice(0, 10).join(", ") || "-");

        // "<br><br><b>Referensi jawaban:</b><br>" +
        // q?.referenceAnswer;

        const _answer = !answer ? "-" : answer;

        checking +=
          "<br><br>Pertanyaan: <br>" +
          q?.question +
          " <br><br>" +
          "Jawaban: <br>" +
          _answer +
          "" +
          "<br><br><b>Kunci jawaban:</b><br>" +
          refHTML;

        // document.getElementById("answer").style.pointerEvents = "none";
      }

      return checking;
    }

    /* ================= TIMER ================= */
    let timeDefault = 120;
    let timeLeft = timeDefault;
    let timerInterval = null;

    function stopTimer() {
      clearInterval(timerInterval);
    }

    function startTimer() {
      stopTimer();
      timeLeft = timeDefault;
      document.getElementById("timer").textContent = "⏱️ " + timeLeft;

      timerInterval = setInterval(() => {
        if (!document.getElementById("timer")) return clearInterval(timerInterval);
        timeLeft--;
        document.getElementById("timer").textContent = "⏱️ " + timeLeft;

        if (timeLeft <= 0) {
          // question.classList.add("wrong", "locked");

          showSnackbar("⏰ Waktu Habis! -50", "timeout", {
            // questionIndex: currentSheetSoal,
            correct: false,
            timeout: true,
            // scoreChange: -50
          });

          stopTimer();
          check(false);
        }
      }, 1000);
    }

    /* ================= LOAD ================= */

    function loadQuestion() {
      if (current >= questions.length) {
        finishQuiz();
        return;
      }

      const q = questions[current];
      if (!q) return;

      checkTrial = 0;
      minusThisQuestion = 0; // ✅ FIX PENTING
      timeLeft = timeDefault;
      current++;
      life = lifeDefault;
      locked = false;
      rank = "E";
      rank_point = 0;
      answer = null;

      startTimer();

      document.getElementById("question").innerText = q.question;

      document.getElementById("answer").value = "";

      const resultEL = document.getElementById("result");

      resultEL.textContent = "";
      resultEL.style.display = "none";

      document.getElementById("nextBtn").style.display = "none";

      // document.body.style.height = "100vh";

      document.getElementById("answer").style.pointerEvents = "auto";
      const btn = document.getElementById("checkAnswer").style;
      btn.pointerEvents = "auto";
      btn.display = "block";

      // console.log(111);

      // updateLabelScore();
      updateLife();

      setTimeout(() => {
        document.getElementById("answer").focus();
      }, 50);
    }

    loadQuestion();

    /* ================= SNACKBAR ================= */
    function showSnackbar(msg, type = "success", payload = {}) {
      // const container = document.getElementById("snackbar-container");
      // if (!container) return;

      // const bar = document.createElement("div");
      // bar.className = `snackbar ${type}`;
      // bar.textContent = msg;

      // container.prepend(bar);
      // bar.getBoundingClientRect(); // trigger reflow
      // bar.classList.add("show");

      // setTimeout(() => {
      //   bar.classList.remove("show");
      //   setTimeout(() => bar.remove(), 400);
      // }, 1600);

      vm.$q.notify({
        message: "Jawaban: " + msg,
        // icon: type == "success" ? 'ion-checkmark-circle' : 'ion-close-circle',
        // color: type == "success" ? 'positive' : 'negative',
        color: "white",
        textColor: "dark",
        group: type,
      });

      if (timeLeft <= 0 || type == "timeout") {
        life = 0;
        playErrorFX("timeout");
        stopTimer();
      }

      // 🔊 AUDIO
      if (type === "success") {
        playTrueFX();
        confetti();
      }
      if (type === "enough") {
        playTrueFX();
        confetti();
      }
      if (type === "error" || type === "bad") {
        playErrorFX("error");
      }
    }

    /* ================= SOUND ================= */
    document.getElementById("answer").addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.key === "Enter") {
        check(false);
      }
    });

    function confetti() {
      for (let i = 0; i < 30; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.top = Math.random() * 100 + -Math.random() * 200 + "px";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = `hsl(${Math.random() * 360},90%,60%)`;
        c.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2); // ✅ 0.4 – 1.0
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 1300);
      }
      for (let i = 0; i < 30; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.top = Math.random() * 100 + -Math.random() * 200 + "px";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = `hsl(${Math.random() * 360},90%,60%)`;
        c.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2); // ✅ 0.4 – 1.0
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 2300);
      }
    }

    /* ================= LOCAL STORAGE ================= */
    function getFinalRank() {
      // const total_point = record_quiz.total_rank_point;
      // const total_question = record_quiz.total_question;

      // let final_point = total_point / total_question;
      let final_point = totalRankPoint / current;

      let rank = "E";

      if (final_point >= 4.5) rank = "A";
      else if (final_point >= 3.5) rank = "B";
      else if (final_point >= 2.5) rank = "C";
      else if (final_point >= 1.5) rank = "D";
      else rank = "E";

      return {
        rank: rank,
        rank_point: Number(final_point.toFixed(2)),
      };
    }

    function recordQuizEvent(status, checking) {
      const qIndex = current - 1; // index soal saat ini

      // jika belum ada object soal ini, buat baru
      if (!record_quiz.question[qIndex]) {
        record_quiz.question[qIndex] = {
          status_question: status,
          current_score: score,
          current_question: current,
          time_left: timeLeft,
          check_trial: checkTrial,
          current_minus_score: minusThisQuestion,
          rank: rank,
          rank_point: rank_point,
          checking: checking,
          current_rank: getFinalRank()?.rank,
          current_rank_point: getFinalRank()?.rank_point,
        };
      } else {
        // update nilai soal yang sama (jika user salah lagi)
        record_quiz.question[qIndex].status_question = status;
        record_quiz.question[qIndex].current_score = score;
        record_quiz.question[qIndex].time_left = timeLeft;
        record_quiz.question[qIndex].check_trial = checkTrial;
        record_quiz.question[qIndex].current_minus_score = minusThisQuestion;
        record_quiz.question[qIndex].rank = rank;
        record_quiz.question[qIndex].rank_point = rank_point;
        record_quiz.question[qIndex].checking = checking;
        record_quiz.question[qIndex].current_rank = getFinalRank()?.rank;
        record_quiz.question[qIndex].current_rank_point = getFinalRank()?.rank_point;
      }

      // total summary
      record_quiz.total_time_left = 0;
      record_quiz.total_check_trail = 0;
      record_quiz.total_rank_point = 0;

      record_quiz.total_current_score = score;

      record_quiz.question.forEach((q) => {
        record_quiz.total_time_left += q.time_left;
        record_quiz.total_check_trail += q.check_trial;
        record_quiz.total_rank_point += q.rank_point;
      });

      const finalRank = getFinalRank();

      record_quiz.final_rank = finalRank.rank;
      record_quiz.final_rank_point = finalRank.rank_point;

      // simpan persisten
      localStorage.setItem("record_quiz_essay", JSON.stringify(record_quiz));
    }
    localStorage.removeItem("record_quiz_essay");

    document.getElementById("checkAnswer").addEventListener("click", () => check(false));
    document.getElementById("btnResult").addEventListener("click", lihatHasil);
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
    document.getElementById("lockedAnswer").addEventListener("click", () => check(true));
    document.getElementById("answer").addEventListener("input", function () {
      this.parentNode.dataset.replicatedValue = this.value;
      countChar(this);
    });
  },
};
</script>

<!-- ===== STYLE ASLI TIDAK DIUBAH ===== -->
<style>
#QuizActionEssay {

  .tf-card {
    background: #ffd4005e;
    padding: 14px;
    border-radius: 16px;
  }

  .tf-question.correct {
    background: #22c55e;
    color: #fff;
  }

  .tf-question.wrong {
    background: #ef4444;
    color: #fff;
  }

  .locked {
    pointer-events: none;
  }

  .choices {
    margin-top: 14px;
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
    width: 100%;
  }

  input {
    box-sizing: border-box;
  }

  .result-btn {
    margin-top: 10px;
    padding: 10px 16px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: linear-gradient(135deg, #fa8b8b, #fa6060);
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

  .result-btn,
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

  textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    padding: 10px;
    font-size: 16px;
    border-radius: 10px;
  }

  .grow-wrap {
    /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
    display: grid;
  }

  .grow-wrap::after {
    /* Note the weird space! Needed to preventy jumpy behavior */
    content: attr(data-replicated-value) " ";
    /* This is how textarea text behaves */
    white-space: pre-wrap;
    /* Hidden from view, clicks, and screen readers */
    visibility: hidden;
  }

  .grow-wrap>textarea {
    /* You could leave this, but after a user resizes, then it ruins the auto sizing */
    resize: none;
    /* Firefox shows scrollbar on growth, you can hide like this. */
    overflow: hidden;
    overflow-y: auto;
  }

  .grow-wrap>textarea,
  .grow-wrap::after {
    /* Identical styling required!! */
    border: 1px solid black;
    padding: 0.5rem;
    font: inherit;
    /* Place on top of each other */
    grid-area: 1 / 1 / 2 / 2;
    overflow-x: hidden;
  }

  #question {
    margin: 5px 0px;
    text-align: center;

    border: 2px dashed #60a5fa;
    background: white;
    /* background: linear-gradient(135deg, #34d399, #60a5fa); */
    border-radius: 999px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
  }

  /* ===== LAYOUT TOMBOL RESPONSIVE ===== */

  .tf-card {
    display: flex;
    flex-direction: column;
  }

  .next-btn-2,
  .next-btn {
    width: 100%;
  }

  /* DESKTOP */
  @media (min-width: 700px) {
    .tf-card button {
      width: 48%;
    }

    .tf-card {
      gap: 10px;
    }

    .next-btn-2,
    .next-btn {
      display: inline-block;
    }

    .tf-card button:first-of-type {
      /* margin-right: 4%; */
    }
  }

  /* ===== BUTTON RESPONSIVE ===== */

  .btn-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* desktop */
  @media (min-width: 700px) {
    .btn-group {
      flex-direction: row;
    }

    .btn-group button {
      width: 100%;
    }
  }

  #result ul {
    padding-left: 18px;
    margin-top: 6px;
  }

  #result {
    margin-top: 10px;
  }
}
</style>
