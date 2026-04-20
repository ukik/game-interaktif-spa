import { defineStore } from 'pinia';

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

// import domains from 'src/settings/domains'
// import { api } from 'src/settings/axios'

// const { apiDomain } = domains()

// import domains from 'src/settings/domains'
// const { apiDomain } = domains()
// const host = apiDomain

import { host } from 'src/boot/common'

import axios from 'axios'

// const api = axios.create({ baseURL: host })

// const _id = Math.round(Math.random() * 100000000000000)


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


// no need to import defineStore and acceptHMRUpdate
export const useAuthStore = defineStore('AuthStore', {
  id: 'AuthStore',

  state: () => ({
    change_email_dikirim: {
      success: false,
      error: false,
      pending: false,
      message: '',
    },
    email_verify_dikirim: {
      success: false,
      error: false,
      pending: false,
      message: '',
    },
    change_password_dikirim: {
      success: false,
      error: false,
      pending: false,
      message: '',
    },

    form_forgot_password: {
      email: "",
    },
    // form_re_request_verification: {
    //   email: "",
    // },
    form_update_email: {
      email: "",
      token: ""
    },
    form_verify: {
      email: "",
      token: ""
    },
    form_login_role: { // jika 1 email dipakai 2 jenis user, misalnya ortu / anak / 2 anak 1 device
      type: "temp",
      temp_token: '',
      users: [],
    },

    form_login: {
      email: "superadmin@gmail.com",
      password: "12345",
      remember: false,
    },
    form_reset_password: {
      email: "",
      password: "",
      passwordConfirmation: "",
      token: "", // dari badaso_password_resets->token, di create dari forgot-password badaso
    },
    form_register: {
      name: '',
      // username: '',
      email: 'versusmx@gmail.com',
      telpon: '',
      password: '12345',
      passwordConfirmation: '12345',
      gender: 'Gender',
    },
    auth: {
      "isLogin": false,
      "message": "",

      "data": {
        "accessToken": "",

        "user": {
          "id": "",
          "name": "",
          "email": "",
          "image": "",
          "telpon": "",
          "alamat": "",
          "password": "",
          "role": "",
          "createdAt": "",
          "updatedAt": "",
          "deletedAt": ""
        },
        "roles": "",
        "expiresIn": 0
      }
    },
    loading: {
      fetchCSRF: false,
      fetchInitAuth: false, // true after refresh (1x request only)

      init: false,
      relogin: false,
      form_register: false,
      form_login: false,
      form_reset_password: false,
      form_forgot_password: false,
      form_verify: false,
      form_logout: false,
      // form_re_request_verification: false,
    }
  }),

  getters: {
    getAuthUser: state => state.auth?.data?.user,
    getAuth: state => state.auth,
    getIsLogin: state => state.auth.isLogin,
    getLoadingInit: state => state.loading.init,
    getAccessToken: state => state.auth.data?.accessToken,
    getLoading: state => state.loading,
  },

  actions: {


    async onInit() {

      if (this.loading.init) return false;

      this.loading.init = true;

      console.log('onInit')
      const resp = await axios({
        url: host + '/me',
        method: 'get',
      })
        .catch(error => { // wajib ada agar jika error server tidak error UI
          console.log('store/lagia-stores/auth/AuthStore', error.response)
          Cookies.remove('accessToken')
          return false
        })

      if (resp == false) return false
      if (!resp?.data) return false // this.loading.init = false
      if (resp?.data?.isLogin) {
        // notifSuccess()

        const data = resp?.data
        console.log('stores/lagia-stores/auth/AuthStore/onInit', data)

        this.auth = {
          "isLogin": data?.isLogin,
          "message": data?.message,

          "data": {
            "accessToken": data?.payload?.token,
            "user": data?.payload?.user,
            "roles": data?.payload?.user?.role,
            "expiresIn": data?.expires_in
          }
        }

        return true
      }
    },

    async onLogin() {

      if (this.loading.form_login) return false;

      this.loading.form_login = true;

      const formData = new FormData();
      for (const key in this.form_login) {
        const value = JSON.parse(JSON.stringify(this.form_login[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_login)

      Loading.show()

      const resp = await axios({
        url: host + '/login',
        method: 'post',
        data: formData,
      })
        .catch((err) => {
          console.log(err)
          notifFailed(err?.response?.data?.message?.toString())
          return false
        })


      Loading.hide()

      this.loading.form_login = false

      console.log('onLogin', resp)

      if (resp == false) return false
      if (!resp?.data) return false

      if (resp?.data?.payload?.type == 'temp') {
        console.log('login_role', resp?.data)
        this.form_login_role = resp?.data?.payload
        return true
      }

      if (!resp?.data?.isLogin) {
        notifFailed('Gagal login')
        return false
      }


      if (resp?.data?.isLogin) {
        notifSuccess()

        const data = resp?.data

        this.auth = {
          "isLogin": data?.isLogin,
          "message": data?.message,

          "data": {
            "accessToken": data?.payload?.token,
            "user": data?.payload?.user,
            "roles": data?.payload?.user.role,
            "expiresIn": data?.expires_in
          }
        }

        this.onClearFormLoginRole()
        this.onClearFormLogin()

        return true
      }

    },


    async onLoginRole(user_id) {

      if (this.loading.form_login) return false;

      this.loading.form_login = true;

      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('token', this.form_login_role?.temp_token);

      const resp = await axios({
        url: host + '/login-role',
        method: 'post',
        data: formData,
      })
        .then((response) => {
          notifSuccess()
          return response
        })
        .catch((err) => {
          console.log(err)
          notifFailed(err?.response?.data?.message?.toString())
          return false
        })

      this.loading.form_login = false

      console.log('onLogin', resp)

      if (resp == false) return false
      if (!resp?.data) return false

      const data = resp?.data

      this.auth = {
        "isLogin": data?.isLogin,
        "message": data?.message,

        "data": {
          "accessToken": data?.payload?.token,
          "user": data?.payload?.user,
          "roles": data?.payload?.user?.role,
          "expiresIn": data?.expires_in
        }
      }

      this.onClearFormLoginRole()
      this.onClearFormLogin()

      console.log('stores/lagia-stores/auth/AuthStore/onLoginRole', this.auth)

      return true

    },

    async onLogout() {

      if (this.loading.form_logout) return false;

      this.loading.form_logout = true;

      console.log('formData', this.form_logout)

      Loading.show()

      const resp = await axios({
        url: host + '/logout',
        method: 'post',
      })
        .then((response) => {
          notifSuccess('logout berhasil diproses')
          return response
        })
        .catch((err) => {
          notifFailed('Logout gagal')
          return false
        })

      Loading.hide()

      this.loading.form_logout = false

      console.log('onLogout', resp)

      if (resp == false) return false
      if (!resp?.data) return false

      if (!resp?.data?.isLogin) {
        await this.onClearAuth()
        await this.onClearFormLoginRole()
        await this.onClearFormLogin()

        // this.router.push({ name: "/login" })
      }

      return true
    },












    async onRelogin() {

      console.log('onRelogin')

      if (this.loading.relogin) return false;

      this.loading.relogin = true;

      console.log('onRelogin')
      const resp = await axios({
        url: host + '/auth/init',
        method: 'get',
      })
        .catch(error => { // wajib ada agar jika error server tidak error UI
          console.log('store/lagia-stores/auth/AuthStore', error.response)
        })

      this.loading.relogin = false

      if (!resp?.data) return this.loading.relogin = false

      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data

      console.log('stores/lagia-stores/auth/AuthStore/onRelogin', this.auth)
    },




















    async onRegister(slug = '/auth/register') {

      if (this.loading.form_register) return false;

      this.loading.form_register = true;

      Loading.show()

      const formData = new FormData();
      for (const key in this.form_register) {
        const value = JSON.parse(JSON.stringify(this.form_register[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      // untuk /register-simple-google
      formData.append('idToken', Cookies.get('idToken'));

      console.log('formData', this.form_register)

      const resp = await axios({
        url: host + slug,
        method: 'post',
        data: formData,
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log('err', err, err.response)
          notifFailed(err.response?.data?.message?.toString())
          return false
        })

      this.loading.form_register = false
      console.log('onRegister', resp?.data)

      Loading.hide()

      if (resp == false) return
      if (!resp?.data?.isLogin) {
        notifSuccess(resp?.data?.data?.message)
        return
      }

      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data
      console.log('REGISTER', this.auth)
    },


    async onResetPassword() {

      if (this.loading.form_reset_password) return false;

      this.loading.form_reset_password = true;

      const accessToken = Cookies.get("accessToken");
      const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      for (const key in this.form_reset_password) {
        const value = JSON.parse(JSON.stringify(this.form_reset_password[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_reset_password)

      const resp = await axios({
        url: host + '/auth/reset-password',
        method: 'post',
        data: formData,
      })
        .then((response) => {
          // console.log('fetchCSRF AXIOS', response.headers['Set-Cookie'], JSON.parse(JSON.stringify(response.headers)))
          notifSuccess()
          this.change_password_dikirim.error = false

          console.log()
          return response
        })
        .catch((err) => {
          this.change_password_dikirim.error = true
          this.change_password_dikirim.message = err?.response?.data?.message?.toString()
          notifFailed(err?.response?.data?.message?.toString())
          return err?.response
        })


      this.loading.form_reset_password = false
      console.log('onResetPassword', resp)

      if (!resp.data.data) return

      if (this.getIsLogin) {
        if (!resp?.data?.isLogin) {
          this.onClearChangePasswordDikirim()
          await this.onClearAuth()

          this.router.replace({
            name: '/login'
          })
          return
        }
      }

      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data

      if (resp?.data?.isLogin) {
        this.change_password_dikirim.success = true
        this.onClearChangePasswordDikirim()
        this.router.replace({
          name: '/dashboard'
        })
      }

      this.onClearForgotPassword()
      this.onClearResetPassword()
      // if (!resp?.data) return this.loading.form_reset_password = false
    },

    async onForgotPassword() {

      if (this.loading.form_forgot_password) return false;

      this.loading.form_forgot_password = true;

      Loading.show();

      // const accessToken = Cookies.get("accessToken");
      // const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      for (const key in this.form_forgot_password) {
        const value = JSON.parse(JSON.stringify(this.form_forgot_password[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_forgot_password)

      const resp = await axios({
        url: host + '/auth/forgot-password',
        method: 'post',
        data: formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   // authorization: `Bearer ${accessToken}`,
        //   "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
        // }
      })
        .then((response) => {
          notifSuccess()
          this.change_password_dikirim.error = false

          console.log()
          return response
        })
        .catch((err) => {
          this.change_password_dikirim.error = true
          this.change_password_dikirim.message = err?.response?.data?.message?.toString()
          notifFailed(err?.response?.data?.message?.toString())
          return err?.response
        })

      Loading.hide();

      this.loading.form_forgot_password = false
      console.log('onForgotPassword', resp)

      if (!resp.data.data) return

      if (this.getIsLogin) {
        if (!resp?.data?.isLogin) {
          this.onClearChangeEmailDikirim()
          await this.onClearAuth()

          this.router.replace({
            name: '/login'
          })
          return
        }
      }

      if (resp?.data?.data?.status == "email-terkirim") {
        this.change_password_dikirim.pending = true
        this.router.push({
          name: '/reset-password',
          query: {
            email: this.form_forgot_password.email
          }
        })

        return
      }

      // if (!resp?.data) return this.loading.form_forgot_password = false
    },

    async onVerify(slug = 'verify') {

      if (this.loading.form_verify) return false;

      this.loading.form_verify = true;

      Loading.show();

      const formData = new FormData();
      for (const key in this.form_verify) {
        const value = JSON.parse(JSON.stringify(this.form_verify[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_verify)

      const resp = await axios({
        url: host + '/auth/' + slug,
        method: 'post',
        data: formData,
      })
        .then((response) => {
          console.log('VERIFY', response?.data?.message)
          // Notify.create({
          //   color: 'positive',
          //   position: 'top',
          //   message: response?.data?.message?.toString(),
          //   caption: response?.data?.data?.message?.toString(),
          //   icon: 'done'
          // })

          notifSuccess(response?.data?.data?.message?.toString(), response?.data?.message?.toString())

          this.email_verify_dikirim.error = false

          console.log()
          return response
        })
        .catch((err) => {
          this.email_verify_dikirim.error = true
          this.email_verify_dikirim.message = err?.response?.data?.message?.toString()
          notifFailed(err?.response?.data?.message?.toString())
          return err?.response
        })

      this.loading.form_verify = false
      console.log('onVerify', resp?.data)
      console.log('onVerify', resp?.data?.isLogin)

      Loading.hide();

      if (!resp.data.data) return

      if (!resp?.data?.isLogin) {
        this.onClearEmailVerifyDikirim()
        await this.onClearAuth()

        this.router.replace({
          name: '/login'
        })
        return
      }

      if (resp?.data?.data?.status == "email-terkirim") {
        this.email_verify_dikirim.pending = true
        return
      }

      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data

      if (resp?.data?.isLogin && slug == 'verify') {
        this.email_verify_dikirim.success = true
        this.onClearEmailVerifyDikirim()
        this.router.replace({
          name: '/dashboard'
        })
      }

      this.onClearVerify()
    },

    async onRequestVerification() {
      this.onVerify('re-request-verification')
    },

    async onVerifyUpdateEmail(slug = 'verify-email') {

      if (this.loading.form_update_email) return false;

      this.loading.form_update_email = true;

      Loading.show();

      const formData = new FormData();
      for (const key in this.form_update_email) {
        const value = JSON.parse(JSON.stringify(this.form_update_email[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_update_email)

      const resp = await axios({
        url: host + '/auth/user/' + slug,
        method: 'post',
        data: formData,
      })
        .then((response) => {
          console.log('VERIFY', response?.data?.message)
          // Notify.create({
          //   color: 'positive',
          //   position: 'top',
          //   message: response?.data?.message?.toString(),
          //   caption: response?.data?.data?.message?.toString(),
          //   icon: 'done'
          // })
          notifSuccess(response?.data?.data?.message?.toString(), response?.data?.message?.toString())
          console.log()
          this.change_email_dikirim.error = false

          return response
        })
        .catch((err) => {
          this.change_email_dikirim.error = true
          this.change_email_dikirim.message = err?.response?.data?.message?.toString()

          notifFailed(err?.response?.data?.message?.toString())
          return err?.response
        })

      Loading.hide();

      this.loading.form_update_email = false

      if (!resp.data.data) return

      if (!resp?.data?.isLogin) {
        this.onClearChangeEmailDikirim()
        await this.onClearAuth()

        this.router.replace({
          name: '/login'
        })
        return
      }

      if (resp?.data?.data?.status == "email-terkirim") {
        this.change_email_dikirim.pending = true
        return
      }

      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data

      console.log('onVerifyUpdateEmail', resp?.data)

      if (resp?.data?.isLogin && slug == 'verify-email') {
        this.change_email_dikirim.success = true
        this.onClearChangeEmailDikirim()
        this.router.replace({
          name: '/dashboard'
        })
      }

      console.log('onVerifyUpdateEmail', this.auth, resp?.data)

      this.onClearUpdateEmail()
    },

    async onRequestUpdateEmail() {
      this.onVerifyUpdateEmail('email')
    },


    async onClearResetPassword() {
      this.form_reset_password = {
        email: "",
        password: "",
        passwordConfirmation: "",
        token: "",
      }
    },

    async onClearVerify() {
      this.form_verify = {
        email: "",
        token: ""
      }
    },

    async onClearUpdateEmail() {
      this.form_update_email = {
        email: "",
        token: ""
      }
    },

    async onClearForgotPassword() {
      this.form_forgot_password = {
        email: "",
      }
    },

    async onClearFormLogin() {
      this.form_login = {
        email: "",
        password: "",
        remember: false,
      }
    },

    async onClearRegister() {
      this.form_register = {
        name: '',
        username: '',
        email: '',
        telpon: '',
        password: '',
        confirm: '',
        gender: 'Gender',
      }
    },

    async onClearChangeEmailDikirim() {
      this.change_email_dikirim = {
        success: false,
        error: false,
        pending: false,
        message: '',
      }
    },
    async onClearEmailVerifyDikirim() {
      this.email_verify_dikirim = {
        success: false,
        error: false,
        pending: false,
        message: '',
      }
    },
    async onClearChangePasswordDikirim() {
      this.change_password_dikirim = {
        success: false,
        error: false,
        pending: false,
        message: '',
      }
    },
    async onClearFormLoginRole() {
      this.form_login_role = { // jika 1 email dipakai 2 jenis user, misalnya ortu / anak / 2 anak 1 device
        type: "temp",
        temp_token: '',
        users: [],
      }
    },

    async onClearAuth() {
      Cookies.remove('accessToken')
      Cookies.remove('idToken')
      Cookies.remove('refreshToken')

      localStorage.removeItem('firebase_uid');
      localStorage.removeItem('getIdToken');
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');

      this.auth = {
        "isLogin": "",
        "message": "",

        "data": {
          "accessToken": "",
          "user": {
            "id": "",
            "name": "",
            "email": "",
            "image": "",
            "telpon": "",
            "alamat": "",
            "password": "",
            "role": "",
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": ""
          },
          "roles": "",
          "expiresIn": 0
        }
      }
    },
  }
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
// }

// https://trefeltour.labsnip.com/auth/login
