
import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { defineStore, acceptHMRUpdate } from 'pinia';


const first_opened = localStorage.getItem('first_opened')

export const useAnnouncementStore = defineStore('AnnouncementStore', {
  state: () => ({
    first_opened: (first_opened === 'false') ? false : true,
    full_close: false,
  }),
  getters: {
    get_first_opened: ({ first_opened }) => first_opened,
  },
  actions: {

    setfirstOpened() {
      this.first_opened = false
    }
  }

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAnnouncementStore, import.meta.hot))
}
