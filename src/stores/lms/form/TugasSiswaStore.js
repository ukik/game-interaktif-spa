import { defineStore } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'
import { useFormTugasStore } from './FormTugasStore';

export const useTugasSiswaStore = defineStore('TugasSiswaStore', {
  state: () => ({
    init: {
      siswa: true,
    },
    loading: {
      siswa: false,
    },
    siswa: {
      "payload": {
        "payload": {
          data: []
        }
      },
    },
  }),
  getters: {
    get_init: ({ init }) => init,
    get_init_siswa: ({ init }) => init?.siswa,

    get_loading: ({ loading }) => loading,
    get_loading_siswa: ({ loading }) => loading?.siswa,

    get_siswa_payload: ({ siswa }) => siswa?.payload?.payload,

  },
  actions: {
    onSiswa(my_init = false) {
      if (my_init) this.init.siswa = my_init
      if (!this.init.siswa) return false

      const tugas = useFormTugasStore()

      // 🔥 ambil langsung tanpa destructuring
      const kelas_id = tugas.form_tugas_create.kelas_id

      // 🔥 guard wajib
      if (!kelas_id) {
        console.warn('kelas_id kosong')
        // this.siswa = [] // reset biar UI bersih
        return false
      }

      this.onRequest('/lms/form-tugas-siswa/' + kelas_id, 'siswa')
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
