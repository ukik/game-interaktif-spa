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

function dateYmd(date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')
}

const currentYear = new Date().getFullYear();

export const useLmsTugasQuizStatsStore = defineStore('LmsTugasQuizStatsStore', {
  state: () => ({
    tab: "tab1",
    is_filter: false,
    filter: {
      // jenjang=&kelas=&user=&mapel=&siswa=&kategori=&durasi=semester&year=2026&day=2026-06-06&begin_date=2026-06-01&end_date=2026-06-07&week=23&month=6&triwulan=2&caturwulan=2&semester=1&sort=desc
      kelas: [],
      mapel: [],
      kategori: [],
      kategori_quiz: [],
      guru: [],
      siswa: [],
      durasi: 'year',
      year: currentYear,
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
      durasi: 'year',
      year: currentYear,
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
    siswa_options: [],
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
        payload: null,
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
      form: false,
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

    get_show_kelas: ({ show }) => show?.payload?.kelas,
    get_show_top: ({ show }) => show?.payload?.top,
    get_show_tugas: ({ show }) => show?.payload?.tugas,
    get_show_payload: ({ show }) => show?.payload?.payload,

    get_rank_payload: ({ rank }) => rank?.payload?.payload,
    get_rank_top: ({ rank }) => rank?.payload?.top,

    get_report: ({ report }) => report?.payload,
    get_report_tugas: ({ report }) => report?.payload?.tugas,
    get_report_siswa: ({ report }) => report?.payload?.siswa,

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
          mapel: normalizeToString(this.valid_filter.mapel),
          kategori: normalizeToString(this.valid_filter.kategori),
          kategori_quiz: normalizeToString(this.valid_filter.kategori_quiz),
          guru: normalizeToString(this.valid_filter.guru),
          siswa: normalizeToString(this.valid_filter.siswa),
          durasi: normalizeToString(this.valid_filter.durasi),
          year: normalizeToString(this.valid_filter.year),
          day: normalizeToString(this.valid_filter.day),
          begin_date: normalizeToString(this.valid_filter.begin_date),
          end_date: normalizeToString(this.valid_filter.end_date),
          week: normalizeToString(this.valid_filter.week),
          month: normalizeToString(this.valid_filter.month),
          triwulan: normalizeToString(this.valid_filter.triwulan),
          caturwulan: normalizeToString(this.valid_filter.caturwulan),
          semester: normalizeToString(this.valid_filter.semester),
          sort: normalizeToString(this.valid_filter.sort),
          status: this.tab,
        }

      // const auth = useAuthStore()
      // if(auth.getRole == 'student') {
      //   params['siswa'] = auth.getAuthUser?.id
      // } else {
      //   params['siswa'] = normalizeToString(this.valid_filter.student)
      // }

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas-quiz-stats',
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
        url: host + '/lms/tugas-quiz-stats/' + slug,
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

    async onReport(key = 'report') {

      const route = useRouterStore()

      const tugas_id = route?.getParams?.slug
      const quiz = route?.getParams?.quiz
      const mode = route?.getParams?.mode
      const siswa_id = route?.getParams?.siswa_id

      if (this.loading[key]) return false;
      this.loading[key] = true;
      console.log('onIndex')

      let url = '/lms/tugas-quiz-stats/' + tugas_id + '/report/' + siswa_id + '/student'

      if(mode == 'teacher') url = '/lms/tugas-quiz-stats/' + tugas_id + '/report/teacher'

      Loading.show()
      const resp = await axios({
        url: url,
        method: 'get',
        params: {
          quiz
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

    async onRank(tugas_id = null, init = false) {

      if (init) this.init.rank = true
      if (!this.init.rank) return

      if (this.loading.rank) return false;
      this.loading.rank = true;
      console.log('onRank')

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas-quiz-stats/' + tugas_id + '/rank',
        method: 'get',
      })
        .catch((err) => {
          console.log(err)
          notifFailed()
          return false
        })
      Loading.hide()

      this.loading.rank = false
      this.init.rank = false;

      if (resp == false) return false
      if (!resp?.data) return false
      if (resp?.data?.isLogin) {

        const data = resp?.data
        console.log('onRank', data)

        this.rank = data

        return true
      }
    },

    async onReplace(siswa_id) {

      let report = null
      this.report?.payload?.report?.forEach(el => {
        console.log('get_report_unsubmit', el)
        if (el.is_submit == 'N') {
          report = el
        }
      });

      // console.log('onReplace', report, this.get_report_tugas?.id, siswa_id)
      // return;

      const route = useRouterStore()
      const quiz = route?.getParams?.quiz

      if (this.loading.form) return false;
      this.loading.form = true;

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas-quiz-hasil/' + this.get_report_tugas?.id + '/replace/' + report?.id + '/' + siswa_id +'?quiz='+quiz,
        method: 'post'
      })
        .catch((err) => {
          console.log('err', err?.response?.data)
          const { caption, message } = (err?.response?.data)
          notifFailed(message, caption)
          return false
        })

      Loading.hide()
      this.loading.form = false
      console.log('onReplace 1', resp)

      if (resp == false) return false
      if (!resp?.data) return false
      if (resp?.data?.isLogin) {
        notifSuccess()

        console.log('onReplace 2')

        this.rank = {
          payload: {
            payload: null,
            top: {
              data: null,
            },
          },
        }

        this.report = {
          payload: {
            tugas: true // jangan di isi null, nanti Page jadi kosong hilang semua
          },
        }

        this.tab = "tab2";

        Loading.show();
        await this.onReport(this.get_report_tugas?.id, siswa_id);
        await this.onRank(this.get_report_tugas?.id, true)
        Loading.hide();


        return true
      }
    },


  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLmsTugasQuizStatsStore, import.meta.hot))
}
