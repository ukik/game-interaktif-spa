<template>
  <q-page id="QuizActionBoolean" class="flex flex-center q-pa-sm bg-transparent">
    <QuizMediaComponent />

    <div class="game">
      <q-card id="quizCard" bordered class="quiz-card">
        <q-card-section>
          <div class="title">🚀 Quiz Action</div>
          <div class="question">Seret salah satu ke soal</div>
          <!-- <div class="subtitle">True or False – Present Tense</div> -->
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="between" class="q-pa-none q-pa-md">
          <div class="timer" id="timer">⏱️ 0</div>
          <div class="score" id="score">Score: 0 | Lembar: 1/5</div>
        </q-card-actions>
        <q-card-section>
          <div class="col" id="colQ"></div>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import playErrorFX from "src/composables/quiz/playErrorFX";
import playTrueFX from "src/composables/quiz/playTrueFX";
import shake from "src/composables/quiz/shake";

import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore.js";
import { myMixin } from './mixinQuiz.js'
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore.js";

export default {
  mixins: [myMixin],
  async preFetch({ store, currentRoute }) {
    // const preStore = useLmsBankQuizStore(store);
    // const slug = currentRoute.params?.slug || '';
    // console.log('mixin_quiz_action_arrange', slug)
    // await preStore.onShow(slug);

    const slug = currentRoute.params?.slug || ''; // tugas_id
    await useLmsTugasStore(store).onAktivitas(slug)
  },
  created() {
    this.dummyOnCreate('boolean')
  },
  mounted() {
    const vm = this;

    if (this.get_show_payload?.kategori != 'boolean') return this.notifFailed('data gagal diproses', 'Salah Quiz')

    // const list_questions = this.parseUnknown(this.get_show_payload?.konten) // di laravel sudah diperbaiki pake getter, biar praktis
    const list_questions = this.get_show_payload?.konten

    // /* ================= DATA ================= */
    // const list_questions = [
    //   { text: "he plays football" },
    //   { text: "she reads books" },
    //   { text: "i drink coffee" },
    //   { text: "they watch tv" },
    //   { text: "we study english" },

    //   { text: "he eats rice" },
    //   { text: "she cooks dinner" },
    //   { text: "i go to school" },
    //   { text: "they like music" },
    //   { text: "we play games" },

    //   { text: "she sings well" },
    //   { text: "he drives a car" },
    //   { text: "i write a letter" },
    //   { text: "they help friends" },
    //   { text: "we read stories" },

    //   { text: "he runs every morning" },
    //   { text: "she walks to market" },
    //   { text: "i watch movies" },
    //   { text: "they eat breakfast" },
    //   { text: "we learn math" },

    //   { text: "he plays guitar" },
    //   { text: "she listens to music" },
    //   { text: "i read novels" },
    //   { text: "they go to work" },
    //   { text: "we drink tea" },

    //   { text: "he teaches students" },
    //   { text: "she teaches english" },
    //   { text: "i clean my room" },
    //   { text: "they clean the house" },
    //   { text: "we help parents" },

    //   { text: "he fixes bikes" },
    //   { text: "she fixes the door" },
    //   { text: "i use a laptop" },
    //   { text: "they use phones" },
    //   { text: "we play chess" },

    //   { text: "he draws pictures" },
    //   { text: "she draws animals" },
    //   { text: "i paint walls" },
    //   { text: "they paint rooms" },
    //   { text: "we enjoy holidays" },

    //   { text: "he buys groceries" },
    //   { text: "she buys vegetables" },
    //   { text: "i cook noodles" },
    //   { text: "they cook soup" },
    //   { text: "we prepare meals" },

    //   { text: "he opens the shop" },
    //   { text: "she opens the window" },
    //   { text: "i close the door" },
    //   { text: "they close the gate" },
    //   { text: "we lock the house" },

    //   { text: "he answers questions" },
    //   { text: "she answers emails" },
    //   { text: "i send messages" },
    //   { text: "they send letters" },
    //   { text: "we receive packages" },

    //   { text: "he reads newspapers" },
    //   { text: "she reads magazines" },
    //   { text: "i follow rules" },
    //   { text: "they follow orders" },
    //   { text: "we respect teachers" },

    //   { text: "he watches news" },
    //   { text: "she watches cartoons" },
    //   { text: "i play badminton" },
    //   { text: "they play volleyball" },
    //   { text: "we exercise daily" },

    //   { text: "he sleeps early" },
    //   { text: "she sleeps late" },
    //   { text: "i wake up early" },
    //   { text: "they wake up late" },
    //   { text: "we rest at night" },
    // ];

    let checkingHTML = {};

    const totalSheetSoal = 5;
    const max_questions = 3;
    let currentSheetSoal = 1;
    let questions = [];
    let score = 0;
    let matched = 0;
    let activeBlockId = null;

    let blockId = 1;
    let poolIndex = 0;

    function shuffleWords(sentence) {
      const words = sentence.split(" ");
      return words.sort(() => Math.random() - 0.5).join(" ");
    }

    /* === BUILD QUESTIONS === */
    let tempPool = [...list_questions].sort(() => Math.random() - 0.5);

    for (let s = 1; s <= totalSheetSoal; s++) {
      for (let i = 1; i <= max_questions; i++) {
        const base = tempPool.pop();

        // 50% tetap benar, 50% diacak
        let shown = base.text;
        if (Math.random() < 0.5) {
          shown = shuffleWords(base.text);
        }

        questions.push({
          id: blockId++,
          current_question: s,
          index: i,
          original: base.text,
          shown: shown,
          isTrue: shown === base.text,
        });
      }
    }

    /* ================= INIT ================= */
    function init() {
      matched = 0;
      document.getElementById("colQ").innerHTML = "";

      const currentQuestions = questions.filter(
        (q) => q.current_question === currentSheetSoal
      );

      currentQuestions.forEach((d, i) => {
        const index = i + 1;

        // === CARD (SIMULASI TABLE 2x2) ===
        const card = document.createElement("div");
        card.className = "tf-card";
        card.dataset.index = index;

        // === ROW 1 (COLSPAN 2) ===
        const qEl = document.createElement("div");
        qEl.className = "block_quiz tf-question";

        qEl.textContent = `${d.shown}`; // `SOAL ${index}: ${d.shown}`;
        qEl.dataset.type = "q";
        qEl.dataset.index = index;
        qEl.dataset.value = String(d.isTrue);

        // === ROW 2 (TRUE | FALSE) ===
        const ansWrap = document.createElement("div");
        ansWrap.className = "tf-answers";

        const trueEl = document.createElement("div");
        trueEl.className = "block_quiz tf-true";
        trueEl.textContent = "✔️ TRUE"; //`TRUE ${index}`;
        trueEl.dataset.type = "a";
        trueEl.dataset.index = index;
        trueEl.dataset.value = "true";
        bindDrag(trueEl);

        const falseEl = document.createElement("div");
        falseEl.className = "block_quiz tf-false";
        falseEl.textContent = "❌ FALSE"; //`FALSE ${index}`;
        falseEl.dataset.type = "a";
        falseEl.dataset.index = index;
        falseEl.dataset.value = "false";
        bindDrag(falseEl);

        ansWrap.appendChild(trueEl);
        ansWrap.appendChild(falseEl);

        card.appendChild(qEl);
        card.appendChild(ansWrap);

        document.getElementById("colQ").appendChild(card);
      });
    }
    init();

    /* ================= ITEM ================= */
    function addItem(text, type, index, value) {
      const el = document.createElement("div");
      el.className = "block_quiz";
      el.textContent = text;
      el.dataset.type = type;
      el.dataset.index = index;
      el.dataset.value = value;
      bindDrag(el);
      (type === "q" ? colQ : colA).appendChild(el);
    }

    /* ================= DRAG ================= */
    let dragged = null,
      ghost = null;

    function bindDrag(el) {
      el.addEventListener("pointerdown", (e) => {
        activeBlockId = (currentSheetSoal - 1) * max_questions + Number(el.dataset.index);

        if (el.classList.contains("matched")) return;

        const card = el.closest(".tf-card");
        if (card && card.classList.contains("locked")) return;

        dragged = el;
        el.classList.add("dragging");

        ghost = el.cloneNode(true);
        ghost.className = "drag-ghost";
        document.body.appendChild(ghost);
        moveGhost(e);
        el.setPointerCapture(e.pointerId);
      });

      el.addEventListener("pointermove", (e) => ghost && moveGhost(e));

      el.addEventListener("pointerup", (e) => {
        if (!ghost) return;
        ghost.style.display = "none";
        const t = document.elementFromPoint(e.clientX, e.clientY);
        ghost.style.display = "";

        if (
          t &&
          t.classList.contains("tf-question") &&
          dragged.dataset.type === "a" &&
          t.dataset.index === dragged.dataset.index
        ) {
          checkMatch(dragged, t);
        }
        cleanup();
      });
    }

    function moveGhost(e) {
      ghost.style.left = e.clientX + "px";
      ghost.style.top = e.clientY - 60 + "px";
    }

    function cleanup() {
      ghost?.remove();
      ghost = null;

      if (dragged) {
        dragged.classList.remove("dragging");
      }

      dragged = null;
    }

    /* ================= LOGIC ================= */
    function checkMatch(a, b) {
      // ❌ TIDAK BOLEH SESAMA TIPE
      if (a.dataset.type === b.dataset.type) {
        wrong();
        return;
      }

      // ❌ NOMOR SOAL HARUS SAMA
      if (a.dataset.index !== b.dataset.index) {
        wrong();
        return;
      }

      const soal = a.dataset.type === "q" ? a : b;
      const jawab = a.dataset.type === "a" ? a : b;

      // ❌ SUDAH TERJAWAB
      if (soal.classList.contains("matched")) return;

      if (soal.dataset.value === jawab.dataset.value) {
        // ✅ JAWABAN BENAR → HIJAU (TRUE ATAU FALSE)
        soal.classList.add("correct", "matched");
        jawab.classList.add("matched");

        // 🔒 LOCK HANYA SOAL
        const card = soal.closest(".tf-card");

        card.classList.add("locked"); // 🔒 kunci 1x percobaan

        card.querySelectorAll(".tf-question").forEach((q) => {
          q.classList.add("matched");
        });

        matched++;
        score += 100;
        showSnackbar("✔️ Benar +100", "success");
        playTrueFX();
      } else {
        wrong();
      }

      updateScoreBar();

      const total = questions.filter((q) => q.current_question === currentSheetSoal)
        .length;

      if (matched === total) {
        clearInterval(countdown);
        setTimeout(nextSoal, 2500);
      }
    }
    function wrong() {
      score -= 20;
      shake();
      showSnackbar("❌ Salah -20", "error");
      playErrorFX("error");

      const card = dragged?.closest(".tf-card");
      if (!card) return;

      // 🔴 SALAH → MERAH
      const question = card.querySelector(".tf-question");
      if (question) {
        question.classList.add("wrong", "matched");
      }

      card.classList.add("locked");
      matched++;
      updateScoreBar();
    }
    /* ================= TIMER ================= */
    const timer = document.getElementById("timer");
    const scoreEl = document.getElementById("score");

    const default_timeLeft = 10; //100;
    let timeLeft = default_timeLeft;
    let countdown = null;

    function startCountdown() {
      clearInterval(countdown);
      countdown = setInterval(() => {
        if (!document.getElementById("timer")) return clearInterval(countdown);
        timeLeft--;
        timer.textContent = "⏱️ " + timeLeft;
        if (timeLeft <= 0) {
          clearInterval(countdown);

          forceCancelDrag(); // 🔥 WAJIB

          finalizeUnansweredAsWrong(); // 🔥 TAMBAHAN


          score -= 50;
          updateScoreBar();
          showSnackbar("⏰ Waktu Habis! -50", "error");
          setTimeout(nextSoal, 900);
        }
      }, 1000);
    }
    startCountdown();

    function forceCancelDrag() {
      try {
        dragged?.releasePointerCapture?.(0);
      } catch (e) { }

      ghost?.remove();
      ghost = null;

      if (dragged) {
        dragged.classList.remove("dragging");
      }

      dragged = null;
    }

    /* ================= NEXT ================= */
    function nextSoal() {

      forceCancelDrag(); // 🔥 WAJIB

      // 🔥 TAMBAHAN WAJIB
      finalizeUnansweredAsWrong();

      currentSheetSoal++;

      clearInterval(countdown);

      if (currentSheetSoal > totalSheetSoal) {

        console.log('GAME OVER')
        vm.onCreate('boolean')

        // GAME OVER

        // location.href = "result.html";

        forceCancelDrag(); // bersihin ghost biar gak nyangkut
        removeAllDragEvents(); // 🔥 STOP TOTAL

        return;
      }

      timeLeft = default_timeLeft;
      init();
      updateScoreBar();
      startCountdown();
    }

    function updateScoreBar() {
      scoreEl.textContent = `Score: ${score} | Lembar: ${currentSheetSoal}/${totalSheetSoal}`;
    }

    /* ================= SNACKBAR ================= */
    let sb;
    function showSnackbar(msg, type = "success", duration = 1800) {

      vm.$q.notify({
        message: "Jawaban: " + msg,
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

    function finalizeUnansweredAsWrong() {
      let data = JSON.parse(localStorage.getItem(LS_KEY));

      if (!data || !Array.isArray(data.question)) return;

      data.question = data.question.map((q) => {
        // hanya untuk sheet aktif & yang belum dijawab
        if (
          q.current_question === currentSheetSoal &&
          q.status_question === null
        ) {
          return {
            ...q,
            status_question: "salah",
            current_minus_score: -20,
            check_trial: 1,
          };
        }
        return q;
      });

      localStorage.setItem(LS_KEY, JSON.stringify(data));
      vm.setForm(data);
    }

    /* ================== LOCAL STORAGE QUIZ BOOLEAN (NEW LOGIC) ================== */
    const LS_KEY = "record_quiz_boolean";

    let blockIndexPerSoal = {};
    /* === INIT STORAGE === */
    function initQuizRecord() {
      localStorage.removeItem(LS_KEY);

      if (!localStorage.getItem(LS_KEY)) {
        const allQuestions = [];

        let block_quiz = 1;
        for (let sheet = 1; sheet <= totalSheetSoal; sheet++) {
          for (let i = 1; i <= max_questions; i++) {
            allQuestions.push({
              current_question: sheet,
              current_block_question: block_quiz, // 🔑 UNIK 1–15
              status_question: null,
              current_score: 0,
              time_left: 0,
              check_trial: 0,
              current_minus_score: 0,
            });
            block_quiz++;
          }
        }

        localStorage.setItem(
          LS_KEY,
          JSON.stringify({
            total_question: totalSheetSoal,
            total_time_left: 0,
            total_check_trail: 0,
            total_current_score: 0,
            question: allQuestions,
          })
        );
      }
    }
    initQuizRecord();

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

        // if (prev.status_question === "berhasil" && status_question === "salah") {
        //   localStorage.setItem(LS_KEY, JSON.stringify(data));
        //   vm.setForm(data)
        //   return;
        // }

        // 🔒 kalau sudah pernah dijawab → jangan timpa
        if (prev.status_question !== null) {
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
      data.checking = checkingHTML

      localStorage.setItem(LS_KEY, JSON.stringify(data));
      vm.setForm(data)
    }


    function bindDrag(el) {

      const onDown = (e) => {
        activeBlockId = (currentSheetSoal - 1) * max_questions + Number(el.dataset.index);

        if (el.classList.contains("matched")) return;

        const card = el.closest(".tf-card");
        if (card && card.classList.contains("locked")) return;

        dragged = el;
        el.classList.add("dragging");

        ghost = el.cloneNode(true);
        ghost.className = "drag-ghost";
        document.body.appendChild(ghost);
        moveGhost(e);
        el.setPointerCapture(e.pointerId);
      };

      const onMove = (e) => {
        ghost && moveGhost(e);
      };

      const onUp = (e) => {
        if (!ghost) return;

        ghost.style.display = "none";
        const t = document.elementFromPoint(e.clientX, e.clientY);
        ghost.style.display = "";

        if (
          t &&
          t.classList.contains("tf-question") &&
          dragged.dataset.type === "a" &&
          t.dataset.index === dragged.dataset.index
        ) {
          checkMatch(dragged, t);
        }

        cleanup();
      };

      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);

      // 🔥 simpan handler
      el._dragHandlers = { onDown, onMove, onUp };
    }

    function removeAllDragEvents() {
      const all = document.querySelectorAll(".block_quiz");

      all.forEach(el => {
        if (!el._dragHandlers) return;

        el.removeEventListener("pointerdown", el._dragHandlers.onDown);
        el.removeEventListener("pointermove", el._dragHandlers.onMove);
        el.removeEventListener("pointerup", el._dragHandlers.onUp);
      });
    }

  },
};
</script>

<style lang="scss">
/* === MATCH GRID === */
.block_quiz {
  touch-action: none;
}

.block_quiz {
  border: 1px dashed #60a5fa;
  background: white;
  /* background: linear-gradient(135deg, #34d399, #60a5fa); */
  // padding: 20px 16px;
  border-radius: 999px;
  font-weight: bold;
  margin: 6px 0;
  text-align: center;
  user-select: none;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s;
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

#QuizActionBoolean {
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


  /* === TRUE / FALSE CARD PER SOAL (TABLE 2x2) === */
  .tf-card {
    border: 2px dashed #60a5fa;
    /* border: 3px solid #93c5fd; */
    border-radius: 16px;
    padding: 12px;
    margin-bottom: 14px;
    background: #f0f9ff;
    /* background: linear-gradient(135deg, #34d399, #60a5fa); */
  }

  .tf-question {
    grid-column: span 2;
    margin-bottom: 25px;
    padding: 20px 16px;
    /* background: linear-gradient(135deg, #fde68a, #fcd1a5); */
  }

  // .tf-answers {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   gap: 12px;
  // }

  .tf-true {
    /* background: linear-gradient(135deg, #22c55e, #4ade80); */
    // background: #61e1b3 !important;
    color: white;
    background: linear-gradient(135deg, #4ade80, #2dd4bf) !important;
    border: 0px dashed #22c55e;
    cursor: grab;
    padding: 10px 0px;
  }

  .tf-false {
    /* background: linear-gradient(135deg, #ef4444, #fb7185); */
    // background: #ff9898 !important;
    color: white;
    background: linear-gradient(135deg, #f87171, #fb7185) !important;
    border: 0px dashed #ef4444;
    cursor: grab;
    padding: 10px 0px;
  }


  .tf-answers .block_quiz {
    text-align: center;
  }

  .tf-answers {
    display: flex;
    justify-content: space-evenly;
    /* jarak antara */
    align-items: center;
    gap: 12px;
  }

  .tf-answers .block_quiz {
    width: 30%;
    text-align: center;
  }

  @media (max-width: 425px) {
    .tf-answers .block_quiz {
      width: 40%;
    }
  }

  /* === WARNA BERDASARKAN HASIL === */

  /* BENAR */
  .tf-question.correct {
    background: linear-gradient(135deg, #22c55e, #4ade80);
    color: #ffffff;
  }

  /* SALAH */
  .tf-question.wrong {
    background: linear-gradient(135deg, #ef4444, #fb7185);
    color: #ffffff;
  }

  .matched,
  .locked {
    // border: 3px solid white;
  }

  .matched {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border: 3px solid white;
  }
}
</style>
