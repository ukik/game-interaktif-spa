import { defineStore, acceptHMRUpdate } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'
import { useAuthStore } from 'src/stores/auth/AuthStore';
import { useLmsParentStore } from '../LmsParentStore';


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
  return Math.round(Math.random() * 10000000)
}
function getDummyEmail() {
  return Math.round(Math.random() * 10000000) + "@dummy.com"
}

const form = {
  // table: siswa
  siswa: {
    uuid: '',
    user_id: '',
  },
  // table: users
  name: getDummy(),
  email: getDummyEmail(),
  telpon: getDummy(),
  whatsapp: getDummy(),
  role: 'parent',
  alamat: getDummy(),
  // password: '',
  // raw_password: '',
  image: null,
  // UI
  new_password: '12345',
  new_password_confirmation: '12345',
  old_password: '',
  // addition
  siswa_id: [],
}

const formX = {
  // table: siswa
  siswa: {
    uuid: '',
    user_id: '',
  },
  // table: users
  name: '',
  email: '',
  telpon: '',
  whatsapp: '',
  role: 'parent',
  alamat: '',
  // password: '',
  // raw_password: '',
  image: null,
  // UI
  new_password: '',
  new_password_confirmation: '',
  old_password: '',
  // addition
  siswa_id: [],
}

const empty_form = JSON.parse(JSON.stringify(formX))

export const useFormPengaturanParentStore = defineStore('FormPengaturanParentStore', {
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
    // additional
    options: [], // from ajax saat pencarian
    selected_options: [],
  }),
  getters: {
    get_init: ({ init }) => init,
    get_init_create: ({ init }) => init?.create,

    get_loading: ({ loading }) => loading,
    get_loading_create: ({ loading }) => loading?.tugas_create,

    get_form_create: ({ form_create }) => form_create,

  },
  actions: {

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
        // else if (key == 'tugas_kategori') {
        //   formData.append(key, this.form_create[key]['id'])
        // }
        else {
          formData.append(key, this.form_create[key] ?? '')
        }
      })
      formData.append('nama', this.form_create.name)

      this.selected_options.map(item => item.id)?.forEach(element => {
        formData.append('siswa_id[]', element)
      });

      // console.log('formData', this.form_create)
      console.table([...formData.entries()])

      Loading.show()

      const resp = await axios({
        url: host + '/lms/parent',
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

        this.form_create = empty_form;
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

        // else if (key === 'tugas_kategori') {
        //   value = value?.id
        //   if (!value) return
        // }

        formData.append(key, value ?? '')
      })
      formData.append('nama', this.form_edit.name)

      this.selected_options.map(item => item.id)?.forEach(element => {
        formData.append('siswa_id[]', element)
      });

      console.log('formData', this.form_edit)
      console.table([...formData.entries()])

      Loading.show()

      const resp = await axios({
        url: host + '/lms/parent/' + id,
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

        // untuk menyesuaikan API
        let _temp = []
        this.selected_options?.forEach(element => {
          _temp.push({
            siswa: element
          })
        });

        this.form_edit.parent.siswa = JSON.parse(JSON.stringify(_temp))
        this.reference = JSON.parse(JSON.stringify(this.form_edit))

        console.log('FINISH UPDATE', this.form_edit)

        useLmsParentStore().syncAfterUpdate(this.form_edit)

        return true
      }

    },


  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormPengaturanParentStore, import.meta.hot))
}
