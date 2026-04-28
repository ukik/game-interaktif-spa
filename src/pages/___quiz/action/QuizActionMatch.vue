<template>
  <q-page id="QuizActionMatch" class="flex flex-center q-pa-sm bg-transparent">
    <QuizMediaComponent />
    <div class="game">
      <q-card class="quiz-card">
        <q-card-section>
          <div class="title">🚀 Quiz Action</div>
          <!-- <div class="subtitle">Match - Present Tense!</div> -->
          <div class="question">Cocokkan kalimat dengan artinya</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="between" class="q-pa-none q-pa-md">
          <div class="timer" id="timer">⏱️ {{ timeLeft }}</div>
          <div class="score" id="score">Score: 0 | Lembar: 1/3</div>
        </q-card-actions>

        <q-card-section>
          <div class="match-grid">
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
  </q-page>
</template>

<script>
import playErrorFX from "src/composables/quiz/playErrorFX";
import playTrueFX from "src/composables/quiz/playTrueFX";
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
      // document.getElementById("colQ").innerHTML = "<h4>SOAL</h4>";
      // document.getElementById("colA").innerHTML = "<h4>JAWABAN</h4>";

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
      el.className = "block";
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

        if (t && t.classList.contains("block") && t !== dragged) {
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
      // const container = document.getElementById("snackbar-container");

      // const bar = document.createElement("div");
      // bar.className = `snackbar ${type}`;
      // bar.textContent = msg;

      // // ⬇️ JANGAN SET INLINE STYLE
      // container?.appendChild(bar);

      // // ⛔ PAKSA BROWSER BACA STATE AWAL (.snackbar)
      // bar.getBoundingClientRect();

      // // ⬆️ BARU TRANSISI KE .show
      // bar.classList.add("show");

      // setTimeout(() => {
      //   bar.classList.remove("show");
      //   setTimeout(() => bar.remove(), 450);
      // }, duration);

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
    const default_timeLeft = 180;
    let timeLeft = default_timeLeft;
    const timerEl = document.getElementById("timer");

    let countdown = null;

    function startCountdown() {
      clearInterval(countdown);

      countdown = setInterval(() => {
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

          setTimeout(nextSoal, 900);
        }
      }, 1000);
    }
    function nextSoal() {
      currentSheetSoal++;
      blockIndexPerSoal[currentSheetSoal] = 0;

      if (currentSheetSoal > totalSheetSoal) {
        window.location.href = "result.html";
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

<style lang="scss">
.block.dragging {
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

#QuizActionMatch {
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

  .block {
    touch-action: none;
  }

  .block {
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

  #colQ .block {
    background: linear-gradient(135deg, #ffe259, #ffa751);
  }

  .block.matched {
    background: linear-gradient(135deg, #22c55e, #16a34a) !important;
    color: #fff;
    cursor: default;
  }

}
</style>
