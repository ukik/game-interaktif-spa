<template>
  <q-page class="flex flex-center">
    <audio id="errorSound">
      <source src="~assets/audio/error.wav" />
    </audio>
    <audio id="timeoutSound">
      <source src="~assets/audio/timeout.wav" />
    </audio>
    <audio id="successSound">
      <source src="~assets/audio/success.mp3" />
    </audio>

    <div class="game">
      <div class="title">🚀 Quiz Action</div>
      <div class="subtitle">Match - Present Tense!</div>

      <div class="top">
        <div class="timer" id="timer">⏱️ {{ timeLeft }}</div>
        <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
      </div>

      <div class="question">Cocokkan kalimat dengan artinya</div>

      <div class="match-grid">
        <div class="col" id="colQ">
          <h4>SOAL</h4>
        </div>
        <div class="col" id="colA">
          <h4>JAWABAN</h4>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import showSnackbar from "src/composables/quiz/__showSnackbar";
import playErrorFX from "src/composables/quiz/playErrorFX";
import playTrueFX from "src/composables/quiz/playTrueFX";
import cleanup from "src/composables/quiz/__cleanup";
import moveGhost from "src/composables/quiz/__moveGhost";
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
    this.resetTimer();

    /* ================= DATA ================= */
    const list_questions = [
      { q: "he plays football", a: "dia bermain bola" },
      { q: "she reads books", a: "dia membaca buku" },
      { q: "I drink coffee", a: "saya minum kopi" },
      { q: "we study english", a: "kami belajar bahasa inggris" },
      { q: "they watch tv", a: "mereka menonton tv" },

      { q: "he eats rice", a: "dia makan nasi" },
      { q: "she cooks dinner", a: "dia memasak makan malam" },
      { q: "I go to school", a: "saya pergi ke sekolah" },
      { q: "we play games", a: "kami bermain permainan" },
      { q: "they like music", a: "mereka menyukai musik" },

      { q: "he runs fast", a: "dia berlari cepat" },
      { q: "she sings well", a: "dia bernyanyi dengan baik" },
      { q: "I write a letter", a: "saya menulis surat" },
      { q: "we read stories", a: "kami membaca cerita" },
      { q: "they help friends", a: "mereka membantu teman" },

      { q: "he drives a car", a: "dia mengemudi mobil" },
      { q: "she cleans the room", a: "dia membersihkan kamar" },
      { q: "I open the door", a: "saya membuka pintu" },
      { q: "we close the window", a: "kami menutup jendela" },
      { q: "they answer questions", a: "mereka menjawab pertanyaan" },

      { q: "he buys food", a: "dia membeli makanan" },
      { q: "she sells clothes", a: "dia menjual pakaian" },
      { q: "I call my mother", a: "saya menelepon ibu saya" },
      { q: "we visit our family", a: "kami mengunjungi keluarga kami" },
      { q: "they travel together", a: "mereka bepergian bersama" },

      { q: "he teaches math", a: "dia mengajar matematika" },
      { q: "she learns english", a: "dia belajar bahasa inggris" },
      { q: "I listen to music", a: "saya mendengarkan musik" },
      { q: "we practice speaking", a: "kami berlatih berbicara" },
      { q: "they understand lessons", a: "mereka memahami pelajaran" },

      { q: "he wakes up early", a: "dia bangun pagi" },
      { q: "she sleeps late", a: "dia tidur larut" },
      { q: "I wash my hands", a: "saya mencuci tangan" },
      { q: "we brush our teeth", a: "kami menyikat gigi" },
      { q: "they take a bath", a: "mereka mandi" },

      { q: "he opens the book", a: "dia membuka buku" },
      { q: "she closes the bag", a: "dia menutup tas" },
      { q: "I carry the bag", a: "saya membawa tas" },
      { q: "we share food", a: "kami berbagi makanan" },
      { q: "they bring water", a: "mereka membawa air" },

      { q: "he draws pictures", a: "dia menggambar gambar" },
      { q: "she paints flowers", a: "dia melukis bunga" },
      { q: "I color the paper", a: "saya mewarnai kertas" },
      { q: "we make toys", a: "kami membuat mainan" },
      { q: "they build houses", a: "mereka membangun rumah" },

      { q: "he jumps high", a: "dia melompat tinggi" },
      { q: "she dances happily", a: "dia menari dengan gembira" },
      { q: "I smile often", a: "saya sering tersenyum" },
      { q: "we laugh together", a: "kami tertawa bersama" },
      { q: "they clap hands", a: "mereka bertepuk tangan" },

      { q: "he drinks water", a: "dia minum air" },
      { q: "she eats fruit", a: "dia makan buah" },
      { q: "I like chocolate", a: "saya suka cokelat" },
      { q: "we love animals", a: "kami menyukai hewan" },
      { q: "they care about nature", a: "mereka peduli pada alam" },

      { q: "he studies hard", a: "dia belajar dengan giat" },
      { q: "she works at home", a: "dia bekerja di rumah" },
      { q: "I play with friends", a: "saya bermain dengan teman" },
      { q: "we enjoy holidays", a: "kami menikmati liburan" },
      { q: "they wait patiently", a: "mereka menunggu dengan sabar" },
    ];

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
      document.getElementById("colQ").innerHTML = "<h4>SOAL</h4>";
      document.getElementById("colA").innerHTML = "<h4>JAWABAN</h4>";

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
      el.className = "item";
      el.textContent = text;
      el.dataset.type = type;
      el.dataset.match = match;
      bindDrag(el, currentSheetSoal);
      document.getElementById(type === "q" ? "colQ" : "colA").appendChild(el);
    }

    /* ================= DRAG ================= */
    function bindDrag(el, currentSheetSoal) {
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
        moveGhost(e, ghost);
        el.setPointerCapture(e.pointerId);
      });
      el.addEventListener("pointermove", (e) => ghost && moveGhost(e, ghost));
      el.addEventListener("pointerup", (e) => {
        if (!ghost) return;

        ghost.style.display = "none"; // ⬅️ SEMENTARA HILANGKAN
        const t = document.elementFromPoint(e.clientX, e.clientY);
        ghost.style.display = ""; // ⬅️ BALIKKAN

        if (t && t.classList.contains("item") && t !== dragged) {
          checkMatch(dragged, t);
        }
        cleanup(ghost, dragged);
      });
    }

    /* ================= LOGIC ================= */
    function checkMatch(a, b) {
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

          clearInterval(timeInterval); // ⬅️ STOP TIMER SOAL INI

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

    function nextSoal() {
      currentSheetSoal++;
      blockIndexPerSoal[currentSheetSoal] = 0;

      if (currentSheetSoal > totalSheetSoal) {
        window.location.href = "result.html";
        return;
      }

      matched = 0;
      // timeLeft = this.timeDefault; // ✅ RESET WAKTU
      this.resetTimer();
      init(); // ✅ LOAD SOAL BARU
      updateScoreBar();
      this.startTimer(); // ✅ TIMER BARU
    }
    this.startTimer();

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
    const LS_KEY = "record_quiz_matching";

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

        // 🔒 JANGAN TURUNKAN STATUS DARI BERHASIL KE SALAH
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

      localStorage.setItem(LS_KEY, JSON.stringify(data));
    }
  },
};
</script>

<style >
/* === SEMUA STYLE ASLI TETAP === */
/* html,
body {
  min-height: 100%;
}

body {
  font-family: "Comic Sans MS", "Segoe UI", Arial, sans-serif;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px 0;
} */

.game {
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  max-width: 650px;
  width: 100%;
  border: 4px solid #fde68a;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.timer,
.score {
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: bold;
}

.timer {
  background: #dcfce7;
}

.score {
  background: #e0f2fe;
  font-size: 13px;
}

.question {
  text-align: center;
  margin-bottom: 12px;
  font-weight: bold;
  color: #7c2d12;
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

/* === MATCH GRID === */
.match-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.col {
  border: 3px dashed #93c5fd;
  border-radius: 16px;
  padding: 12px;
  min-height: 260px;
  background: #f0f9ff;
}

.col h4 {
  text-align: center;
  margin-bottom: 8px;
  color: #334155;
}

.item {
  touch-action: none;
}

.item {
  background: linear-gradient(135deg, #34d399, #60a5fa);
  padding: 12px 16px;
  border-radius: 999px;
  font-weight: bold;
  cursor: grab;
  margin: 6px 0;
  text-align: center;
  user-select: none;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s;
}

.item.dragging {
  opacity: 0.8;
  transform: scale(1.15);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
}

.item.matched {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  cursor: default;
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

.title {
  font-size: 28px;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  font-size: 16px;
  color: #475569;
  margin-bottom: 20px;
  text-align: center;
}
</style>
