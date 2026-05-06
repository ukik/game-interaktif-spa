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
.animate__animated {
  animation: inherit !important;
}

#QuizReport {
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

  .choices {
    margin-top: 14px;
  }

  .next-btn {
    margin-top: 40px;
    padding: 10px 16px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
    background: linear-gradient(135deg, #60a5fa, #34d399);
    color: #fff;
    width: 100%;
    display: none;
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
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    color: #fff;
    width: 100%;
    display: none;
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
