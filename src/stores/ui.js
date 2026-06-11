// src/stores/ui.js
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    pageWidth: 0,
    scrollY: 0,
    report_confirm_dialog: false,
  }),
  getters: {
    // getPageWidth: (state) => state.pageWidth,
  },
  actions: {
    setPageWidth(val) {
      if(isNaN(val)) return
      // console.log('setPageWidth', width)
      this.pageWidth = val
    },
    setPageScrollY(val) {
      if(isNaN(val)) return
      // console.log('setPageWidth', width)
      this.scrollY = val
    },

    getPageWidth() {
      return this.pageWidth
    }
  }
})
