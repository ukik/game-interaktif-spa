<template>
  <div id="CardQuizReportEssayChecking" class="q-pa-sm bg-darkX">
    <div v-html="checking"></div>
  </div>
</template>

<script>
export default {
  props: ['checking'],
}
</script>


<!-- ===== STYLE ASLI TIDAK DIUBAH ===== -->
<style>
#CardQuizReportEssayChecking {

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

  .choices {
    margin-top: 14px;
  }

  .next-btn {
    margin-top: 12px;
    padding: 10px 16px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
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
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    color: #fff;
    width: 100%;
    display: none !important;
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
    min-height: 200px;
    padding: 10px;
    font-size: 16px;
    border-radius: 10px;

    pointer-events: none !important;   /* tidak bisa diklik / edit */
    user-select: text !important;      /* tetap bisa select (ini penting) */
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
