// src/stores/ui.js
import { defineStore } from 'pinia'

export const useQuizActionLayoutStore = defineStore('QuizActionLayoutStore', {
  state: () => ({
    leftDrawerOpen: false,
    left_drawer_type: 'general'
  }),
  getters: {
    getLeftDrawerOpen: (state) => state.leftDrawerOpen,
  },
  actions: {
    setLeftDrawerOpen(val) {
      this.leftDrawerOpen = val
    },
  }
})
