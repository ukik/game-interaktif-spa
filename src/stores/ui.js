// src/stores/ui.js
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    pageWidth: 0,
    report_confirm_dialog: false,
  }),
  getters: {
    // getPageWidth: (state) => state.pageWidth,
  },
  actions: {
    setPageWidth(width) {
      if(isNaN(width)) return
      console.log('setPageWidth', width)
      this.pageWidth = width
    },
    getPageWidth() {
      return this.pageWidth
    }
  }
})
