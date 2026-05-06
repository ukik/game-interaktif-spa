<template>
  <div id="QuizReport" class="q-pa-sm bg-darkX">
    <div v-html="checking"></div>
  </div>
</template>

<script>
export default {
  props: ['checking'],
}
</script>


<style lang="scss">
#QuizReport {

  /* === MATCH GRID === */
  .block_quiz {
    border: 1px dashed #60a5fa;
    background: white;
    border-radius: 999px;
    font-weight: bold;
    margin: 6px 0;
    text-align: center;
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
    border-radius: 16px;
    padding: 12px;
    margin-bottom: 14px;
    background: #f0f9ff;
  }

  .tf-question {
    grid-column: span 2;
    margin-bottom: 25px;
    padding: 20px 16px;
  }

  .tf-true {
    color: white;
    background: linear-gradient(135deg, #4ade80, #2dd4bf) !important;
    border: 0px dashed #22c55e;
    padding: 10px 0px;
  }

  .tf-false {
    color: white;
    background: linear-gradient(135deg, #f87171, #fb7185) !important;
    border: 0px dashed #ef4444;
    padding: 10px 0px;
  }

  .tf-answers .block_quiz {
    text-align: center;
  }

  .tf-answers {
    display: flex;
    justify-content: space-evenly;
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

  .matched {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border: 3px solid white;
  }
}
</style>
