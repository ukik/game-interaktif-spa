import { defineStore, acceptHMRUpdate } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'
import { useAuthStore } from '../auth/AuthStore';
import { useRouterStore } from '../auth/RouterStore';


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

function normalizeToString(value, separator = ',') {
  if (Array.isArray(value)) {
    return value.join(separator)
  }

  return value == null ? '' : String(value)
}

let kelasList = [];
for (let index = 0; index < 12; index++) {
  kelasList.push({
    key: index + 1,
    label: 'Kelas ' + index
  })
}

export const useLmsTugasQuizLogStore = defineStore('LmsTugasQuizLogStore', {
  state: () => ({
    tab: "tab1",
    filter: {
      // jenjang=&kelas=&user=&mapel=&siswa=&kategori=&durasi=semester&year=2026&day=2026-06-06&begin_date=2026-06-01&end_date=2026-06-07&week=23&month=6&triwulan=2&caturwulan=2&semester=1&sort=desc
      kelas: [],
      mapel: [],
      kategori: [],
      kategori_quiz: [],
      guru: [],
      siswa: [],
      durasi: [],
      year: [],
      day: [],
      begin_date: [],
      end_date: [],
      week: [],
      month: [],
      triwulan: [],
      caturwulan: [],
      semester: [],
      sort: 'desc',

      kelasList: kelasList,

      optionsKelas: [],
      optionsKategori: [],
      optionsMapel: [],
      optionsGuru: [],
    },
    valid_filter: {
      // jenjang=&kelas=&user=&mapel=&siswa=&kategori=&durasi=semester&year=2026&day=2026-06-06&begin_date=2026-06-01&end_date=2026-06-07&week=23&month=6&triwulan=2&caturwulan=2&semester=1&sort=desc
      kelas: [],
      mapel: [],
      kategori: [],
      kategori_quiz: [],
      guru: [],
      siswa: [],
      durasi: [],
      year: [],
      day: [],
      begin_date: [],
      end_date: [],
      week: [],
      month: [],
      triwulan: [],
      caturwulan: [],
      semester: [],
      sort: 'desc',
    },

    init: {
      index: true,
      show: true,
      report: true,
      rank: true,
      show_tugas: true,
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
        payload: null,
      },
    },
    show_tugas: {
      payload: {
        payload: null
      },
      kelas: {},
    },
    loading: {
      report: false,
      'local': false,
      form: false,
      show_tugas: false,
    }
  }),
  getters: {
    get_init_index: ({ init }) => init?.index,
    get_init_show: ({ init }) => init?.show,
    get_init_report: ({ init }) => init?.report,

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

    get_show_payload: ({ show }) => show?.payload?.payload,
    // get_show_payload_tugasable: ({ show }) => show?.payload?.payload?.tugasable,
    // get_show_payload_siswa: ({ show }) => show?.payload?.payload?.siswa,
    // get_show_payload_siswa_profile: ({ show }) => show?.payload?.payload?.siswa_profile,

    get_show_tugas_payload: ({ show_tugas }) => show_tugas?.payload?.payload,

    get_loading: ({ loading }) => loading?.local,
  },
  actions: {
    setKategoriQuiz(quiz) {
      this.filter.kategori_quiz = quiz
      this.valid_filter.kategori_quiz = quiz
    },
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

      // jenjang=&kelas=&user=&mapel=&siswa=&kategori=&durasi=semester&year=2026&day=2026-06-06&begin_date=2026-06-01&end_date=2026-06-07&week=23&month=6&triwulan=2&caturwulan=2&semester=1&sort=desc
      const params = {
          page: page,
          jenjang: '', // abaikan
          kelas: normalizeToString(this.valid_filter.kelas),
          user: normalizeToString(this.valid_filter.guru),
          mapel: normalizeToString(this.valid_filter.mapel),
          kategori: normalizeToString(this.valid_filter.kategori),
          kategori_quiz: normalizeToString(this.valid_filter.kategori_quiz),
          siswa: normalizeToString(this.valid_filter.siswa),
          status: this.tab,
        }

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas-quiz-hasil',
        method: 'get',
        params: params,
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
        url: host + '/lms/tugas-quiz-hasil/' + slug,
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
    async onShowTugas(slug = null) {

      if (this.loading.show_tugas) return false;

      this.loading.show_tugas = true;

      console.log('onShowTugas')

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas/' + slug,
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

      this.loading.show_tugas = false

      this.init.show_tugas = false;

      if (resp == false) return false
      if (!resp?.data) return false
      if (resp?.data?.isLogin) {

        const data = resp?.data
        console.log('onShowTugas', data)

        this.show_tugas = data

        return true
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLmsTugasQuizLogStore, import.meta.hot))
}
