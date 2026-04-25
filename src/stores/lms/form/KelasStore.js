import { defineStore } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'

export const useKelasStore = defineStore('KelasStore', {
  state: () => ({
    init: {
      kelas: true,
    },
    loading: {
      kelas: false,
    },
    kelas: {
      "payload": {
        "payload": []
      },
    },
  }),
  getters: {
    get_init: ({ init }) => init,
    get_init_kelas: ({ init }) => init?.kelas,

    get_loading: ({ loading }) => loading,
    get_loading_kelas: ({ loading }) => loading?.kelas,

    get_kelas_payload: ({ kelas }) => kelas?.payload?.payload,

  },
  actions: {
    onKelas(my_init = false){
      if(my_init) this.init.kelas = my_init
      if(!this.init.kelas) return false

      this.onRequest('/lms/form-kelas','kelas')
    },
    async onRequest(url = '', key = '') {

      if (this.loading[key]) return false;

      this.loading[key] = true;

      console.log('onIndex')

      const resp = await axios({
        url: host + url,
        method: 'get',
        params: {
          page: 1
        }
      })
        .then((response) => {
          // notifSuccess()
          return response
        })
        .catch((err) => {
          console.log('onRequest', err)
          // notifFailed()
          return false
        })

      this.loading[key] = false
      this.init[key] = false;

      if (resp == false) return false
      if (!resp?.data) return false
      if (resp?.data?.isLogin) {

        this[key] = resp?.data
        console.log('onRequest', this[key])

        return true
      }
    },

  },
});
