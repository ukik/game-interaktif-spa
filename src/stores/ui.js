// src/stores/ui.js
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    pageWidth: 0
  }),
  getters: {
    getPageWidth: (state) => state.pageWidth,
  },
  actions: {
    setPageWidth(width) {
      this.pageWidth = width
    }
  }
})
