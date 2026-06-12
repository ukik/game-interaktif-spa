import { defineStore } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'
import { useFormTugasStore } from './form/FormTugasStore';
import { useLmsBankQuizStore } from './LmsBankQuizStore';
import { useLmsBankModulStore } from './LmsBankModulStore';
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
export const useLmsTugasStore = defineStore('LmsTugasStore', {
  state: () => ({
    tab: 'publish',
    expired: 'false',
    init: {
      index: true,
      show: true,
      peserta: true,
      aktivitas: true,
    },
    filter: {
      // http://localhost:8000/lms/tugas?jenjang=&kelas=1%2C6%2C7&user=7&mapel=33&kategori=2
      kelas: [],
      mapel: [],
      kategori: [],
      kategori_quiz: [],
      guru: [],

      kelasList: kelasList,

      optionsKelas: [],
      optionsKategori: [],
      optionsMapel: [],
      optionsGuru: [],
    },
    valid_filter: {
      // http://localhost:8000/lms/tugas?jenjang=&kelas=1%2C6%2C7&user=7&mapel=33&kategori=2
      kelas: [],
      mapel: [],
      kategori: [],
      kategori_quiz: [],
      guru: [],
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
    aktivitas: {
      payload: {
        payload: null
      },
    },
    loading: {
      'local': false,
      aktivitas: false,
      peserta: false,
    }
  }),
  getters: {
    get_init_index: ({ init }) => init?.index,
    get_init_show: ({ init }) => init?.show,
    get_init_peserta: ({ init }) => init?.peserta,
    get_init_aktivitas: ({ init }) => init?.aktivitas,

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

    get_aktivitas_payload: ({ aktivitas }) => aktivitas?.payload?.payload,
    get_aktivitas_tugasable: ({ aktivitas }) => aktivitas?.payload?.payload?.tugasable,

    get_loading: ({ loading }) => loading?.local,
    get_loading_peserta: ({ loading }) => loading?.local,
    get_loading_aktivitas: ({ loading }) => loading?.aktivitas,
  },
  actions: {
    setKategoriQuiz(quiz) {
      this.filter.kategori_quiz = quiz
      this.valid_filter.kategori_quiz = quiz
    },
    syncAfterUpdate(val) {
      let payload = JSON.parse(JSON.stringify(val))
      this.get_index_data.forEach((item, index) => {
        if(item?.id == payload?.id) {
          this.index.payload.payload.data[index] = payload
        }
      })

      this.show.payload.payload = payload
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

      const params = {
          page: page,
          jenjang: '', // abaikan
          kelas: normalizeToString(this.valid_filter.kelas),
          user: normalizeToString(this.valid_filter.guru),
          mapel: normalizeToString(this.valid_filter.mapel),
          kategori: normalizeToString(this.valid_filter.kategori),
          kategori_quiz: normalizeToString(this.valid_filter.kategori_quiz),
          status: this.tab,
          expired: this.expired,
          // http://localhost:8000/lms/tugas?jenjang=&kelas=1%2C6%2C7&user=7&mapel=33&kategori=2
        }

      console.log('params', params)

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas',
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

    // dipakai oleh Quiz saat dimainkan: QuizActionArrange, QuizActionBoolean, QuizActionEssay, QuizActionMatch, QuizActionMultiple, QuizActionShortAnswer
    async onAktivitasTugas() {

      const route = useRouterStore()

      const tugas_id = route?.getParams?.slug
      const quiz = route?.getParams?.quiz
      const mode = route?.getParams?.mode

      if (mode == 'all') {
        return this.onAktivitasWithoutTugas()
      }

      if (this.loading.aktivitas) return false;
      this.loading.aktivitas = true;

      console.log('onAktivitasTugas')

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas/' + tugas_id + '/aktivitas/' + mode,
        method: 'get',
        params: {
          quiz
        }
      })
        .catch((err) => {
          console.log(err)
          notifFailed()
          return false
        })
      Loading.hide()

      this.loading.aktivitas = false
      this.init.aktivitas = false;

      if (resp == false) return false
      if (!resp?.data) return false
      // if (resp?.data?.isLogin) {

      const data = resp?.data

      // TIDAK PERLU SEBENARNYA
      // switch (data?.payload?.payload?.model?.toLowerCase()) {
      //   case 'quiz':
      //     useLmsBankQuizStore().onSetShow(data?.payload?.payload?.tugasable)
      //     break;
      //   case 'modul':
      //     useLmsBankModulStore().onSetShow(data?.payload?.payload?.tugasable)
      //     break;
      // }

      this.aktivitas = data //?.payload?.payload?.tugasable
      console.log('onAktivitasTugas', this.aktivitas)

      // useLmsBankQuizStore(onSetShow)
      // console.log('onAktivitasTugas', data?.payload?.payload?.model?.toLowerCase())

      return true
      // }
    },

    async onAktivitasWithoutTugas() {

      const route = useRouterStore()

      const quiz_id = route?.getParams?.slug
      const quiz = route?.getParams?.quiz
      const mode = route?.getParams?.mode

      if (this.loading.aktivitas) return false;
      this.loading.aktivitas = true;

      console.log('onAktivitasWithoutTugas')

      Loading.show()
      const resp = await axios({
        url: host + '/lms/quiz/' + quiz_id + '/aktivitas/all',
        method: 'get',
        params: {
          quiz
        }
      })
        .catch((err) => {
          console.log(err)
          notifFailed()
          return false
        })
      Loading.hide()

      this.loading.aktivitas = false
      this.init.aktivitas = false;

      if (resp == false) return false
      if (!resp?.data) return false
      // if (resp?.data?.isLogin) {

      const data = resp?.data
      this.aktivitas = data
      console.log('onAktivitasWithoutTugas', this.aktivitas)
      return true
      // }
    },

    async onShow(slug = null) {

      if (this.loading.local) return false;

      this.loading.local = true;

      console.log('onShow')

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

      this.loading.local = false

      this.init.show = false;

      if (resp == false) return false
      if (!resp?.data) return false
      if (resp?.data?.isLogin) {

        const data = resp?.data
        console.log('onShow', data)

        this.show = data

        const payload = data?.payload?.payload
        console.log('onShow payload', payload)

        const form_edit = useFormTugasStore();
        form_edit.setFormTugasEdit(payload)

        return true
      }
    },
    async onPeserta(slug = null, my_init = false) {

      if (my_init) this.init.peserta = my_init
      if (!this.init.peserta) return false

      if (this.loading.peserta) return false;

      this.loading.peserta = true;

      console.log('onPeserta')

      Loading.show()
      const resp = await axios({
        url: host + '/lms/tugas-peserta/' + slug,
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
      Loading.hide()

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
