import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { defineStore } from 'pinia';

import { host } from 'src/boot/common'

import { onRequestPrivate, notifSuccess, notifFailed } from 'src/utils/apiRequest';

export const useLmsDashboardQuizMetricStore = defineStore('LmsDashboardQuizMetricStore', {
  state: () => ({
    init: {
      index: true,
      show: true,
    },
    index: {
      "payload": {
        dashboard: null
      },
      "status": "success",
      "success": true,
      "message": "OK",
      "flag": null,
      "isLogin": true,
      "expires_in": 3600,
    },
    // show: {
    //   payload: {
    //     payload: {}
    //   }
    // },
    loading: {
      'index': false,
    }
  }),
  getters: {
    get_init_index: ({ init }) => init?.index,
    get_init_show: ({ init }) => init?.show,

    get_index_dashboard: ({ index }) => index?.payload?.dashboard,

    get_summary: ({ index }) => index?.payload?.dashboard?.summary,
    get_growth: ({ index }) => index?.payload?.dashboard?.growth,
    get_publish_status: ({ index }) => index?.payload?.dashboard?.publish_status,
    get_role_distribution: ({ index }) => index?.payload?.dashboard?.role_distribution,
    get_score_quiz_distribution: ({ index }) => index?.payload?.dashboard?.score_quiz_distribution,
    get_score_modul_distribution: ({ index }) => index?.payload?.dashboard?.score_modul_distribution,
    get_top_mapel: ({ index }) => index?.payload?.dashboard?.top_mapel,
    get_top_kelas: ({ index }) => index?.payload?.dashboard?.top_kelas,
    get_top_teacher: ({ index }) => index?.payload?.dashboard?.top_teacher,
    get_top_siswa: ({ index }) => index?.payload?.dashboard?.top_siswa,
    get_quiz_populer: ({ index }) => index?.payload?.dashboard?.quiz_populer,
    get_modul_populer: ({ index }) => index?.payload?.dashboard?.modul_populer,
    get_submit_progress: ({ index }) => index?.payload?.dashboard?.submit_progress,
    get_deadline: ({ index }) => index?.payload?.dashboard?.deadline,
    get_aktivitas: ({ index }) => index?.payload?.dashboard?.aktivitas,
    get_recent_submission: ({ index }) => index?.payload?.dashboard?.recent_submission,
    get_quiz_kategori: ({ index }) => index?.payload?.dashboard?.quiz_kategori,
    get_modul_kategori: ({ index }) => index?.payload?.dashboard?.modul_kategori,
    get_widget_tugas_type_distribution: ({ index }) => index?.payload?.dashboard?.widget_tugas_type_distribution,


    get_loading_index: ({ loading }) => loading?.index,
  },
  actions: {
    onChangePage(val) {
      console.log('action onChangePage', val)
      if (this.loading.index) return false;
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

      Loading.show()
      onRequestPrivate(this, {
        url: host + '/lms/dashboard-quiz-metric',
        method: 'get',
        params: {
          page: page
        }
      }, 'index')
      Loading.hide()

    },
    // async onShow(slug = null) {

    //   onRequestPrivate(this, {
    //     url: host + '/lms/sekolah/' + slug,
    //     method: 'get',
    //   }, 'show')

    // }
  },
});
