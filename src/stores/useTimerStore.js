import { defineStore } from 'pinia';

export const useTimerStore = defineStore('useTimerStore', {
  state: () => ({
    timeDefault: 180,
    timeLeft: 0,
    // timerEl: document.getElementById("timer"),
    timeInterval: null,
    timeUp: false,
  }),
  getters: {
    getState: (state) => state,
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    resetTimer() {
      this.timeDefault = 180
      this.timeLeft = this.timeDefault
      // this.timerEl: document.getElementById("timer"),
      this.timeInterval = null
      this.timeUp = false
    },
    startTimer() {
      clearInterval(this.timeInterval);

      this.timeInterval = setInterval(() => {
        this.timeLeft--;
        // timerEl.textContent = "⏱️ " + timeLeft;

        if (this.timeLeft <= 0) {
          this.timeUp = true;
          // clearInterval(timeInterval);
          // // ⛔ penalti waktu habis
          // score -= 50;
          // // update score UI
          // updateScoreBar();
          // // efek & suara
          // shake();
          // playErrorFX("timeout");
          // showSnackbar("⏰ Waktu Habis! -50", "error");
          // setTimeout(nextSoal, 900);
        }
      }, 1000);
    }
  },
});

