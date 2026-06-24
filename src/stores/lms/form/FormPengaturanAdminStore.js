import { defineStore, acceptHMRUpdate } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'
import { useAuthStore } from 'src/stores/auth/AuthStore';
import { useLmsAdminStore } from '../LmsAdminStore';


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

function getDummy() {
  return Math.round(Math.random()*10000000)
}
function getDummyEmail() {
  return Math.round(Math.random()*10000000)+"@dummy.com"
}

const form_dummy = {
  // table: users
  name: getDummy(),
  email: getDummyEmail(),
  telpon: getDummy(),
  whatsapp: getDummy(),
  role: '',
  alamat: getDummy(),
  // password: '',
  // raw_password: '',
  image: null,
  // UI
  new_password: '12345',
  new_password_confirmation: '12345',
  old_password: '',
}


const form = {
  // table: users
  name: '',
  email: '',
  telpon: '',
  whatsapp: '',
  role: '',
  alamat: '',
  // password: '',
  // raw_password: '',
  image: null,
  // UI
  new_password: '',
  new_password_confirmation: '',
  old_password: '',
}

const empty_form = JSON.parse(JSON.stringify(form))

export const useFormPengaturanAdminStore = defineStore('FormPengaturanAdminStore', {
  state: () => ({
    init: {
      edit: true,
      create: true,
      form_edit: true,
    },
    loading: {
      edit: false,
      create: false,
      form_edit: false,
    },
    reference: null,
    form_create: JSON.parse(JSON.stringify(form)),
    form_edit: JSON.parse(JSON.stringify(form)),
    preview: null,
  }),
  getters: {
    get_init: ({ init }) => init,
    get_init_create: ({ init }) => init?.create,

    get_loading: ({ loading }) => loading,
    get_loading_create: ({ loading }) => loading?.tugas_create,

    get_form_create: ({ form_create }) => form_create,

  },
  actions: {
    setFormEdit(payload) {
      this.form_edit = payload

      let siswa_ids = []
      payload.tugas_siswa?.forEach((item, i) => {
        siswa_ids.push(item?.siswa_id)
      })
      console.log('setFormEdit', siswa_ids)
      this.form_edit.siswa_ids = siswa_ids
      this.form_edit.image = null // wajib agar di bagian q-file tidak error

    },
    async onCreate() {

      console.log('onCreate', this.loading.create)

      if (this.loading.create) return false;

      this.loading.create = true;

      const formData = new FormData();

      Object.keys(this.form_create).forEach(key => {
        if (key == 'user') {
          const auth = useAuthStore()
          formData.append(key, auth.getAuthUser?.id)
        }
        else {
          formData.append(key, this.form_create[key] ?? '')
        }
      })
      formData.append('nama', this.form_create.name)

      console.log('formData', this.form_create)

      Loading.show()

      const resp = await axios({
        url: host + '/lms/admin',
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



      if (resp == false) return false
      if (!resp?.data) return false

      if (resp?.data?.isLogin) {
        notifSuccess()

        const data = resp?.data

        this.form_create = empty_form
        this.reference = null
        this.options = [] // from ajax saat pencarian
        this.selected_options = []
        this.preview = null

        console.log('onCreate', data)

        return true
      }

    },

    async onUpdate(id) {

      console.log('onUpdate', this.loading.edit)

      if (this.loading.edit) return false;

      this.loading.edit = true;

      const formData = new FormData();


      Object.keys(this.form_edit).forEach(key => {
        console.log('key', key)
        let value = this.form_edit[key]

        // 🔥 skip null / undefined
        if (value == null) return

        // 🔥 skip empty string
        if (typeof value === 'string' && value.trim() === '') return

        // 🔥 skip object kosong
        if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return

        if (key === 'user') {
          const auth = useAuthStore()
          value = auth.getAuthUser?.id

        }

        formData.append(key, value ?? '')
      })
      formData.append('nama', this.form_edit.name)

      console.log('formData', this.form_edit)

      Loading.show()

      const resp = await axios({
        url: host + '/lms/admin/' + id,
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

      this.loading.edit = false



      if (resp == false) return false
      if (!resp?.data) return false

      if (resp?.data?.isLogin) {
        notifSuccess()

        // perlu karena q-file akan tidak singkron setelah upload
        if (this.preview) {
          this.form_edit.image = null
          this.form_edit.url_image = this.preview
          this.preview = null
        }

        useLmsAdminStore().syncAfterUpdate(this.form_edit)

        return true
      }

    },


  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormPengaturanAdminStore, import.meta.hot))
}
