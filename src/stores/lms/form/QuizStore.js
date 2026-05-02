import { defineStore } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'
import { useAuthStore } from 'src/stores/auth/AuthStore';

function formatLaravelError(error) {
  if (!error?.response?.data?.payload) {
    return {
      caption: 'Data gagal diproses',
      message: 'Terjadi kesalahan'
    }
  }

  const payload = error.response.data.payload

  const messages = Object.values(payload)
    .flat()
    .filter(Boolean)

  return {
    caption: 'Periksa input berikut:',
    message: messages.join('<br>')
  }
}

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
    local: {
      dialog_result: false,
    },
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
    get_dialog_result: ({ local }) => local?.dialog_result,

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
        final_rank: val?.final_rank ?? 'E',                  // ESSAY
        final_rank_point: val?.final_rank_point ?? 0,      // ESSAY

        json: JSON.stringify(val)
      }

      val?.question.forEach(element => {
        if(element.status_question == 'benar' || element.status_question == 'berhasil' || element.current_rank == "A" || element.current_rank == "B" || element.current_rank == "C") {
          temp.total_question_true++
        } else {
          temp.total_question_false++
        }
      });

      this.form = temp
      console.log('setForm', this.form)

    },
    async onCreate(tipe_aktivitas, tugas_id) {

      console.log('onCreate', this.loading.form)

      if (this.loading.form) return false;

      this.loading.form = true;

      const formData = new FormData();

      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })

      const auth = useAuthStore()
      formData.append('siswa_id', auth.getAuthUser?.id)

      formData.append('tugas_id', tugas_id)

      console.log('formData', host + '/lms/tugas-quiz-hasil', this.form)

      Loading.show()

      const resp = await axios({
        url: host + '/lms/tugas-quiz-hasil',
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

      this.loading.form = false

      console.log('onLogin', resp)

      if (resp == false) return false
      if (!resp?.data) return false

      if (resp?.data?.isLogin) {
        notifSuccess()

        // const data = resp?.data

        // console.log('onCreate', data)

        let name_route = '';

        switch (tipe_aktivitas) {
          case 'arrange':
            name_route = 'quiz_action_arrange'
            break;
          case 'boolean':
            name_route = 'quiz_action_boolean'
            break;
          case 'essay':
            name_route = 'quiz_action_essay'
            break;
          case 'match':
            name_route = 'quiz_action_match'
            break;
          case 'multiple':
            name_route = 'quiz_action_multiple'
            break;
          case 'shortanswer':
            name_route = 'quiz_action_short_answer'
            break;
        }

        this.router.push({
          name: name_route,
          query: {
            slug: tugas_id
          }
        })

        return true
      }

    },


  },
});
