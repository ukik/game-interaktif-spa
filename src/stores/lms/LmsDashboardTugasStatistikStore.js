import { defineStore } from 'pinia';

import { host } from 'src/boot/common'

import { onRequestPrivate, notifSuccess, notifFailed } from 'src/utils/apiRequest';

export const useLmsDashboardTugasStatistikStore = defineStore('LmsDashboardTugasStatistikStore', {
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

    get_widget_tugas_overview: ({ index }) => index?.payload?.dashboard?.widget_tugas_overview,
    get_widget_tugas_kategori: ({ index }) => index?.payload?.dashboard?.widget_tugas_kategori,
    get_widget_tugas_submit: ({ index }) => index?.payload?.dashboard?.widget_tugas_submit,
    get_widget_quiz_score_distribution_monthly: ({ index }) => index?.payload?.dashboard?.widget_quiz_score_distribution_monthly,
    get_widget_quiz_score_distribution_semester: ({ index }) => index?.payload?.dashboard?.widget_quiz_score_distribution_semester,
    get_widget_modul_score_distribution_monthly: ({ index }) => index?.payload?.dashboard?.widget_modul_score_distribution_monthly,
    get_widget_modul_score_distribution_semester: ({ index }) => index?.payload?.dashboard?.widget_modul_score_distribution_semester,
    get_widget_student_performance: ({ index }) => index?.payload?.dashboard?.widget_student_performance,
    get_quiz_score_distribution_by_mapel: ({ index }) => index?.payload?.dashboard?.quiz_score_distribution_by_mapel,
    get_quiz_score_distribution_by_tugas: ({ index }) => index?.payload?.dashboard?.quiz_score_distribution_by_tugas,
    get_quiz_score_distribution_by_kelas: ({ index }) => index?.payload?.dashboard?.quiz_score_distribution_by_kelas,
    get_quiz_score_distribution_by_kategori: ({ index }) => index?.payload?.dashboard?.quiz_score_distribution_by_kategori,
    get_quiz_score_distribution_by_tugas_kategori: ({ index }) => index?.payload?.dashboard?.quiz_score_distribution_by_tugas_kategori,
    get_modul_score_distribution_by_mapel: ({ index }) => index?.payload?.dashboard?.modul_score_distribution_by_mapel,
    get_modul_score_distribution_by_tugas: ({ index }) => index?.payload?.dashboard?.modul_score_distribution_by_tugas,
    get_modul_score_distribution_by_kelas: ({ index }) => index?.payload?.dashboard?.modul_score_distribution_by_kelas,
    get_modul_score_distribution_by_kategori: ({ index }) => index?.payload?.dashboard?.modul_score_distribution_by_kategori,
    get_modul_score_distribution_by_tugas_kategori: ({ index }) => index?.payload?.dashboard?.modul_score_distribution_by_tugas_kategori,


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

      onRequestPrivate(this, {
        url: host + '/lms/tugas-statistik',
        method: 'get',
        params: {
          page: page
        }
      }, 'index')

    },
    // async onShow(slug = null) {

    //   onRequestPrivate(this, {
    //     url: host + '/lms/sekolah/' + slug,
    //     method: 'get',
    //   }, 'show')

    // }
  },
});
