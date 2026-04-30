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

export const useQuizStore = defineStore('QuizStore', {
  state: () => ({
    init: {
      show: true,
      form: true,
    },
    form: {
      "tugas_id": "",
      "siswa_id": "",

      "total_question": "",
      "total_time_left": "",
      "total_check_trail": "",
      "total_current_score": "",

      "total_question_true": "",
      "total_question_false": "",


      "total_rank_point": "",      // ESSAY
      "final_rank": "",            // ESSAY
      "final_rank_point": "",      // ESSAY

      "json": "",
      "catatan": "",
      "image": ""
    },
    show: {
      payload: {
        payload: {}
      },
    },
    loading: {
      form: false,
      show: false,
    }
  }),
  getters: {
    get_init_form: ({ init }) => init?.form,
    get_init_show: ({ init }) => init?.show,

    get_form: ({ form }) => form,
    get_show_payload: ({ show }) => show?.payload?.payload,

    get_form: ({ loading }) => loading?.form,
    get_show: ({ loading }) => loading?.show,
  },
  actions: {
    async setForm(val) {

      let temp = {
        total_question: val?.total_question,
        total_time_left: val?.total_time_left,
        total_check_trail: val?.total_check_trail,
        total_current_score: val?.total_current_score,

        total_question_true: 0,
        total_question_false: 0,

        total_rank_point: val?.total_rank_point ?? 0,      // ESSAY
        final_rank: val?.final_rank ?? '',                  // ESSAY
        final_rank_point: val?.final_rank_point ?? 0,      // ESSAY

        json: val
      }

      val?.question.forEach(element => {
        if(element.status_question == 'benar' || element.status_question == 'berhasil' || element.current_rank == "A" || element.current_rank == "B" || element.current_rank == "C") {
          temp.total_question_true++
        } else {
          temp.total_question_false++
        }
      });

      console.log(val?.question?.length)

      this.form = temp


      console.log('setForm', val, this.form)
    },
    async onCreate() {

      console.log('onCreate', this.loading.create)

      if (this.loading.create) return false;

      this.loading.create = true;

      const formData = new FormData();


      Object.keys(this.form_tugas_create).forEach(key => {
        if(key == 'user') {
          const auth = useAuthStore()
          formData.append(key, auth.getAuthUser?.id)
        } else if(key == 'tugas_kategori') {
          formData.append(key, this.form_tugas_create[key]['id'])
        } else {
          formData.append(key, this.form_tugas_create[key])
        }
      })

      console.log('formData', this.form_tugas_create)

      Loading.show()

      const resp = await axios({
        url: host + '/lms/tugas',
        method: 'post',
        data: formData,
      })
        .catch((err) => {
          console.log(err)
          const { caption, message } = formatLaravelError(err)
          notifFailed(message, caption)

          // notifFailed(err?.response?.data?.message?.toString())
          return false
        })

      Loading.hide()

      this.loading.create = false

      console.log('onLogin', resp)

      if (resp == false) return false
      if (!resp?.data) return false

      if (resp?.data?.isLogin) {
        notifSuccess()

        const data = resp?.data

        console.log('onCreate', data)

        return true
      }

    },


  },
});
