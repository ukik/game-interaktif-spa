import { defineStore, acceptHMRUpdate  } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'
import { useAuthStore } from 'src/stores/auth/AuthStore';


function getToday() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function getTomorrow() {
  const d = new Date()
  d.setDate(d.getDate() + 1)

  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return `${y}-${m}-${day}`
}

function notifSuccess(caption = 'data berhasil diproses', message = 'Loading success') {
  Notify.create({
    color: 'positive',
    position: 'top',
    message: message,
    caption: caption, //'data berhasil diproses',
    icon: 'done',
    html: true
  })
}

function notifFailed(caption = 'data gagal diproses', message = 'Loading failed') {
  Notify.create({
    color: 'negative',
    position: 'top',
    message: message,
    caption: caption,
    icon: 'report_problem',
    html: true
  })
}

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

export const useQuizActionMultipleStore = defineStore('QuizActionMultipleStore', {
  state: () => ({
    init: {
      edit: true,
      create: true,
      form_tugas_edit: true,
    },
    loading: {
      edit: false,
      create: false,
      form_tugas_edit: false,
    },
    form_tugas_create: {
      user: '',
      aktivitas: '',
      judul: Math.random(),
      deskripsi: Math.random(),
      catatan: Math.random(),
      tugas_kategori: {
        id: 1,
        nama: 'PR'
      },
      priority: 'low',
      visibility: 'private',
      begin_date: getToday(),
      end_date: getTomorrow(),
      image: null,

      status: '',

      kelas_id: 2,
      siswa_ids: [],
    },
    form_tugas_edit: {
      user: '',
      aktivitas: '',
      judul: '',
      deskripsi: '',
      catatan: '',
      tugas_kategori: null,
      priority: '',
      visibility: '',
      begin_date: '',
      end_date: '',
      image: null,

      status: '',

      kelas_id: '',
      siswa_ids: [],
    },
    preview: null,
  }),
  getters: {
    get_init: ({ init }) => init,
    get_init_create: ({ init }) => init?.create,

    get_loading: ({ loading }) => loading,
    get_loading_create: ({ loading }) => loading?.tugas_create,

    get_form_tugas_create: ({ form_tugas_create }) => form_tugas_create,

  },
  actions: {
    setFormTugasEdit(payload) {
      this.form_tugas_edit = payload

      let siswa_ids = []
      payload.tugas_siswa?.forEach((item, i) => {
        siswa_ids.push(item?.siswa_id)
      })
      console.log('setFormTugasEdit', siswa_ids)
      this.form_tugas_edit.siswa_ids = siswa_ids
      this.form_tugas_edit.image = null // wajib agar di bagian q-file tidak error

    },
    onEdit(tugas_id, my_init = false) {
      if (my_init) this.init.form_tugas_edit = my_init
      if (!this.init.form_tugas_edit) return false

      this.onRequest('/lms/tugas/' + tugas_id + '/edit', 'form_tugas_edit')
    },
    async onRequest(url = '', key = '') {

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

    async onCreate() {

      console.log('onCreate', this.loading.create)

      if (this.loading.create) return false;

      this.loading.create = true;

      const formData = new FormData();
      // for (const key in this.form_tugas_create) {
      //   const value = JSON.parse(JSON.stringify(this.form_tugas_create[key]))
      //   console.log(key, value)
      //   formData.append(key, value);
      // }

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

    async onUpdate(id) {

      console.log('onUpdate', this.loading.form_tugas_edit)

      if (this.loading.form_tugas_edit) return false;

      this.loading.form_tugas_edit = true;

      const formData = new FormData();

      // Object.keys(this.form_tugas_edit).forEach(key => {
      //   if(key == 'user') {
      //     const auth = useAuthStore()
      //     formData.append(key, auth.getAuthUser?.id)
      //   } else if(key == 'tugas_kategori') {
      //     formData.append(key, this.form_tugas_edit[key]['id'])
      //   } else {
      //     formData.append(key, this.form_tugas_edit[key])
      //   }
      // })

      Object.keys(this.form_tugas_edit).forEach(key => {
        let value = this.form_tugas_edit[key]

        // 🔥 skip null / undefined
        if (value == null) return

        // 🔥 skip empty string
        if (typeof value === 'string' && value.trim() === '') return

        // 🔥 skip object kosong
        if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return

        if (key === 'user') {
          const auth = useAuthStore()
          value = auth.getAuthUser?.id

        } else if (key === 'tugas_kategori') {
          value = value?.id
          if (!value) return
        }

        formData.append(key, value)
      })

      console.log('formData', this.form_tugas_edit)

      Loading.show()

      const resp = await axios({
        url: host + '/lms/tugas/'+id+'/update',
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

      this.loading.form_tugas_edit = false

      console.log('onLogin', resp)

      if (resp == false) return false
      if (!resp?.data) return false

      if (resp?.data?.isLogin) {
        notifSuccess()

        const data = resp?.data

        console.log('onUpdate', data)

        // perlu karena q-file akan tidak singkron setelah upload
        if(this.preview) {
          this.form_tugas_edit.image = null
          this.form_tugas_edit.url_image = this.preview
          this.preview = null
        }

        return true
      }

    },


  },
});



if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuizActionMultipleStore, import.meta.hot))
}
