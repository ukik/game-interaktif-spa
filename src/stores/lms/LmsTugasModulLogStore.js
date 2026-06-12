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


export const useLmsTugasModulLogStore = defineStore('LmsTugasModulLogStore', {
  state: () => ({
    init: {
      index: true,
      show: true,
      report: true,
      rank: true,
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
      "currentSiswa": null,
      "currentKategori": null,
      "status": "success",
      "success": true,
      "message": "OK",
      "flag": null,
      "isLogin": true,
      "expires_in": 3600,
    },
    show: {
      payload: {
        tugas: [],
        top: {
          data: [],
        },
      },
      kelas: {},
    },
    rank: {
      payload: {
        payload: null,
        top: {
          data: null,
        },
      },
    },
    report: {
      payload: {
        payload: {},
        tugas: null,
        report: null,
        siswa: null,
      },
    },
    loading: {
      report: false,
      'local': false,
    }
  }),
  getters: {
    get_init_index: ({ init }) => init?.index,
    get_init_show: ({ init }) => init?.show,

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

    get_index_current_mapel: ({ index }) => index?.payload?.currentMapel,
    get_index_current_user: ({ index }) => index?.payload?.currentUser,
    get_index_current_siswa: ({ index }) => index?.payload?.currentSiswa,
    get_index_current_kategori: ({ index }) => index?.payload?.currentKategori,

    get_show_kelas: ({ show }) => show?.payload?.kelas,
    get_show_top: ({ show }) => show?.payload?.top?.data,
    get_show_tugas: ({ show }) => show?.payload?.tugas,
    get_show_payload: ({ show }) => show?.payload?.payload,

    get_rank_payload: ({ rank }) => rank?.payload?.payload,
    get_rank_top: ({ rank }) => rank?.payload?.top,

    get_report: ({ report }) => report?.payload?.payload,
    get_report_unsubmit: ({ report }) => {
      let json = null
      report?.payload?.report?.forEach(el => {
        console.log('get_report_unsubmit', el)
        if (el.is_submit == 'N') {
          json = el?.json
        }
      });
      return json
    },

    get_report_submit: ({ report }) => {
      let json = null
      report?.payload?.report?.forEach(el => {
        console.log('get_report_submit', el)
        if (el.is_submit == 'Y') {
          json = el?.json
        }
      });
      return json
    },
    get_report_submit_checking() {
      const obj = useLmsTugasQuizStatsStore()?.get_report_submit?.checking ?? null
      console.log('obj', obj)
      let html = [];
      for (const key in obj) {
        if (!Object.hasOwn(obj, key)) continue;
        html.push(obj[key]);
      }
      return html.length > 0 ? html : null
    },
    get_report_unsubmit_checking() {
      const obj = useLmsTugasQuizStatsStore()?.get_report_unsubmit?.checking ?? null
      console.log('obj', obj)
      let html = [];
      for (const key in obj) {
        if (!Object.hasOwn(obj, key)) continue;
        html.push(obj[key]);
      }
      return html.length > 0 ? html : null
    },
    get_loading: ({ loading }) => loading?.local,
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

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas-modul-hasil',
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
      Loading.hide()

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

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas-modul-hasil/' + slug,
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
      Loading.hide()

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

    async onReport(tugas_id, siswa_id, key = 'report') {

      if (this.loading[key]) return false;
      this.loading[key] = true;
      console.log('onIndex')

      Loading.show()
      const resp = await axios({
        url: '/lms/tugas-modul-hasil/' + tugas_id + '/report/' + siswa_id,
        method: 'get',
        params: {}
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
      Loading.hide()

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

    // // DI MODUL TIDAK ADA FITUR REPLACE, karena 1 kali mengisi langsung SUBMIT
    // async onReplace(stats_id, siswa_id) {

    //   if (this.loading.form) return false;
    //   this.loading.form = true;

    //   const resp = await axios({
    //     url: host + '/lms/tugas-modul-hasil/' + stats_id +'/replace',
    //     method: 'post'
    //   })
    //     .catch((err) => {
    //       console.log('err', err?.response?.data)
    //       const { caption, message } = (err?.response?.data)
    //       notifFailed(message, caption)
    //       return false
    //     })

    //   Loading.hide()
    //   this.loading.form = false
    //

    //   if (resp == false) return false
    //   if (!resp?.data) return false
    //   if (resp?.data?.isLogin) {
    //     notifSuccess()

    //     await this.onReport(this.get_show_tugas?.id, siswa_id);
    //     await this.onRank(this.get_show_tugas?.id, true)

    //     return true
    //   }
    // },
  },
});
