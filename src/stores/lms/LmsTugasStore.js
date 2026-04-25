import { defineStore } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'

function notifSuccess(caption = 'data berhasil diproses', message = 'Loading success') {
  Notify.create({
    color: 'positive',
    position: 'top',
    message: message,
    caption: caption, //'data berhasil diproses',
    icon: 'done'
  })
}

function notifFailed(caption = 'data gagal diproses', message = 'Loading failed') {
  Notify.create({
    color: 'negative',
    position: 'top',
    message: message,
    caption: caption,
    icon: 'report_problem'
  })
}


export const useLmsTugasStore = defineStore('LmsTugasStore', {
  state: () => ({
    init: {
      index: true,
      show: true,
      peserta: true,
    },
    index: {
      "payload": {
        "payload": {
          "current_page": 1,
          "data": [],
          "first_page_url": "",
          "from": null,
          "last_page": 1,
          "last_page_url": "",
          "links": [
            {
              "url": null,
              "label": "&laquo; Previous",
              "active": false
            },
            {
              "url": "",
              "label": "1",
              "active": true
            },
            {
              "url": null,
              "label": "Next &raquo;",
              "active": false
            }
          ],
          "next_page_url": null,
          "path": "",
          "per_page": 20,
          "prev_page_url": null,
          "to": null,
          "total": 0
        }
      },
      kelas: {},
      kategoriList: [],
      "currentMapel": null,
      "currentUser": null,
      "status": "success",
      "success": true,
      "message": "OK",
      "flag": null,
      "isLogin": true,
      "expires_in": 3600,
    },
    show: {
      payload: {
        payload: {}
      },
      kelas: {},
    },
    persert: {
      payload: {
        payload: {}
      },
    },
    loading: {
      'local': false,
      peserta: false,
    }
  }),
  getters: {
    get_init_index: ({ init }) => init?.index,
    get_init_show: ({ init }) => init?.show,
    get_init_peserta: ({ init }) => init?.peserta,

    get_index_current_page: ({ index }) => index?.payload?.payload?.current_page,
    get_index_data: ({ index }) => index?.payload?.payload?.data,
    get_index_first_page_url: ({ index }) => index?.payload?.payload?.first_page_url,
    get_index_from: ({ index }) => index?.payload?.payload?.from,
    get_index_last_page: ({ index }) => index?.payload?.payload?.last_page,
    get_index_last_page_url: ({ index }) => index?.payload?.payload?.last_page_url,
    get_index_next_page_url: ({ index }) => index?.payload?.payload?.next_page_url,
    get_index_path: ({ index }) => index?.payload?.payload?.path,
    get_index_per_page: ({ index }) => index?.payload?.payload?.per_page,
    get_index_prev_page_url: ({ index }) => index?.payload?.payload?.prev_page_url,
    get_index_to: ({ index }) => index?.payload?.payload?.to,
    get_index_total: ({ index }) => index?.payload?.payload?.total,

    get_index_kelas: ({ index }) => index?.payload?.kelas,
    get_index_kategori_list: ({ index }) => index?.payload?.kategoriList,

    get_show_kelas: ({ show }) => show?.payload?.kelas,
    get_show_payload: ({ show }) => show?.payload?.payload,

    get_peserta_payload: ({ peserta }) => peserta?.payload?.payload,

    get_loading: ({ loading }) => loading?.local,
    get_loading_peserta: ({ loading }) => loading?.local,
  },
  actions: {
    onChangePage(val) {
      console.log('action onChangePage', val)
      if (this.loading.local) return false;
      this.index.payload.payload.current_page = val

      this.router.push({
        ...this.route,
        query: {
          page: val
        }
      })

      this.onIndex(val)

    },
    async onIndex(page = 1) {

      if (this.loading.local) return false;

      this.loading.local = true;

      console.log('onIndex')

      const resp = await axios({
        url: host + '/lms/tugas',
        method: 'get',
        params: {
          page: page
        }
      })
        .then((response) => {
          // notifSuccess()
          return response
        })
        .catch((err) => {
          console.log(err)
          notifFailed()
          return false
        })

      this.loading.local = false

      this.init.index = false;

      if (resp == false) return false
      if (!resp?.data) return false
      if (resp?.data?.isLogin) {

        const data = resp?.data
        console.log('onIndex', data)

        this.index = data

        return true
      }
    },
    async onShow(slug = null) {

      if (this.loading.local) return false;

      this.loading.local = true;

      console.log('onShow')

      const resp = await axios({
        url: host + '/lms/tugas/'+slug,
        method: 'get',
      })
        .then((response) => {
          // notifSuccess()
          return response
        })
        .catch((err) => {
          console.log(err)
          notifFailed()
          return false
        })

      this.loading.local = false

      this.init.show = false;

      if (resp == false) return false
      if (!resp?.data) return false
      if (resp?.data?.isLogin) {

        const data = resp?.data
        console.log('onShow', data)

        this.show = data

        return true
      }
    },
    async onPeserta(slug = null, my_init = false) {

      if(my_init) this.init.peserta = my_init
      if(!this.init.peserta) return false

      if (this.loading.peserta) return false;

      this.loading.peserta = true;

      console.log('onPeserta')

      const resp = await axios({
        url: host + '/lms/tugas-peserta/'+slug,
        method: 'get',
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log(err)
          notifFailed()
          return false
        })

      this.loading.peserta = false

      this.init.peserta = false;

      if (resp == false) return false
      if (!resp?.data) return false
      if (resp?.data?.isLogin) {

        const data = resp?.data
        console.log('onPeserta', data)

        this.peserta = data

        return true
      }
    },
  },
});
