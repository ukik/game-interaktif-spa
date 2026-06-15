<template>
  <div id="CardQuizReportMultipleChecking" class="q-pa-sm bg-darkX">
    <div v-html="checking"></div>
  </div>
</template>

<script>
export default {
  props: ['checking'],
}
</script>


<style lang="scss">
#CardQuizReportMultipleChecking {

  .block_quiz {
    border: 0px dashed #60a5fa;
    padding: 16px;
    border-radius: 14px;
    font-weight: bold;
    background: #fff;
    /* background: linear-gradient(135deg, #34d399, #60a5fa); */
  }

  .block_quiz.dragging {
    opacity: .8;
    transform: scale(1.1)
  }

  .drag-ghost {
    position: fixed;
    z-index: 99999;
    background: linear-gradient(135deg, #f472b6, #c084fc);
    color: #fff;
    padding: 12px 20px;
    border-radius: 999px;
    transform: translate(-50%, -50%) scale(1.15);
  }



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
