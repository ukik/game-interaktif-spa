<template>
  <div id="QuizActionMatch" class="q-pa-sm bg-dark">
    <div v-html="checking"></div>
  </div>
</template>

<script>
export default {
  props: ['checking'],
}
</script>


<style lang="scss">
#QuizActionMatch {

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

  /* === MATCH GRID === */
  .match-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .block_quiz {
    touch-action: none;
  }

  .block_quiz {
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

  #colQ .block_quiz {
    background: linear-gradient(135deg, #ffe259, #ffa751);
  }

  .block_quiz.matched {
    background: linear-gradient(135deg, #22c55e, #16a34a) !important;
    color: #fff;
    cursor: default;
  }

}
</style>
