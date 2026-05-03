<template>
  <div id="QuizActionArrange" class="q-pa-sm bg-dark">
    <div v-html="checking"></div>
  </div>
</template>

<script>
export default {
  props: ['checking'],
}
</script>

<style lang="scss">
#QuizActionArrange {


  .word {
    background: linear-gradient(135deg, #34d399, #60a5fa);
    padding: 20px 25px;
    border-radius: 999px;
    font-weight: bold;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
    width: auto;
  }

  .word.dragging {
    opacity: 0.8;
    transform: scale(1.15);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
  }



  .answer {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    border: 3px dashed #93c5fd;
    padding: 16px;
    border-radius: 16px;
    background: #f0f9ff;
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

  /* ===== RESPONSIVE MOBILE ===== */
  @media screen and (max-width: 600px) {
    .word {
      width: 100%;
      font-size: 20px;
      padding: 20px 20px 25px 25px;
    }

    .drag-ghost {
      width: auto !important;
    }
  }

  #btnReset {
    display: none;
  }

  #btnCheck,
  #btnReset {
    display: none;
  }
}
</style>
