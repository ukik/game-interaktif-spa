import { defineStore } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'

export const useFormTugasStore = defineStore('FormTugasStore', {
  state: () => ({
    init: {
      edit: true,
      create: true,
    },
    loading: {
      edit: false,
      create: true,
    },
    form_tugas_create: {
      judul: '',
      deskripsi: '',
      catatan: '',
      kategori: null,
      priority: 'low',
      visibility: 'private',
      begin_date: '',
      end_date: '',
      image: null,

      kelas_id: null,
      siswa_ids: [],
    },
    form_tugas_edit: {
      judul: '',
      deskripsi: '',
      catatan: '',
      kategori: null,
      priority: 'low',
      visibility: 'private',
      begin_date: '',
      end_date: '',
      image: null,
    },
  }),
  getters: {
    get_init: ({ init }) => init,
    get_init_create: ({ init }) => init?.create,

    get_loading: ({ loading }) => loading,
    get_loading_create: ({ loading }) => loading?.tugas_create,

    get_form_tugas_create: ({ form_tugas_create }) => form_tugas_create,

  },
  actions: {

    async onRequest(url = '/lms/siswa', key = '') {

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
