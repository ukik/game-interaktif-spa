import { defineStore } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'

export const useTugasKategoriStore = defineStore('TugasKategoriStore', {
  state: () => ({
    init: {
      tugas_kategori: true,
    },
    loading: {
      tugas_kategori: false,
    },
    tugas_kategori: {
      "payload": {
        "payload": []
      },
    },
  }),
  getters: {
    get_init: ({ init }) => init,
    get_init_tugas_kategori: ({ init }) => init?.tugas_kategori,

    get_loading: ({ loading }) => loading,
    get_loading_tugas_kategori: ({ loading }) => loading?.tugas_kategori,

    get_tugas_kategori_payload: ({ tugas_kategori }) => tugas_kategori?.payload?.payload,

  },
  actions: {
    onTugasKategori(my_init = false){
      if(my_init) this.init.tugas_kategori = my_init
      if(!this.init.tugas_kategori) return false

      this.onRequest('/lms/form-tugas-kategori','tugas_kategori')
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
