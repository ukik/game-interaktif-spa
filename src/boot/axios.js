
import { boot } from 'quasar/wrappers'
import axios from 'axios'

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

// const api = axios.create({ baseURL: 'http://localhost:8000' })
import { useAuthStore } from 'src/stores/auth/AuthStore';
import { useRouterStore } from 'src/stores/auth/RouterStore'

import { host } from './common'

import { storeToRefs } from 'pinia';

console.log('BOOT AXIOS KELOAD')

export default boot(async ({ app, ssrContext, router, store, urlPath }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const route = useRouterStore(store)

  const _store = useAuthStore(store)
  const { auth } = storeToRefs(_store)
  const { onClearAuth } = _store

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  let cookies = null
  // let token = null
  // let csrf = null

  const is_cookie_secure = {
    secure: process.env.PROD ? true : false,
    path: '/' // wajib
  }

  axios.defaults.baseURL = host

  axios.defaults.params = {} // wajib ada
  // axios.defaults.params['mode'] = 'human' // digunakan untuk merubah createdAt & updatedAt ke diffForHumans

  console.log('axios.js')

  axios.interceptors.request.use(function (config) {

    cookies = process.env.SERVER
      ? Cookies.parseSSR(ssrContext)
      : Cookies // otherwise we're on client

    // Pastikan headers ada
    config.headers = config.headers || {}

    // Authorization
    const token = cookies.get('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // console.log('RouteStore', route?.getName);
    // console.log('RouteStore', route);

    // 🔥 Tambah global params
    config.params = {
      ...(config.params || {}), // biar tidak overwrite params existing
      // idToken: cookies.get('idToken'),
      // refreshToken: cookies.get('refreshToken'),
    }

    // muhamadduki@gmail.com
    if (config.method === 'post') {
      if (config.data instanceof FormData) {
        // Upload file via FormData (umum untuk banyak file sekaligus)
        config.headers['Content-Type'] = 'multipart/form-data'
      } else if (config.data instanceof Blob) {
        // Khusus PDF
        if (config.data.type === 'application/pdf') {
          config.headers['Content-Type'] = 'application/pdf'
        }
        // Khusus Video
        else if (config.data.type.startsWith('video/')) {
          config.headers['Content-Type'] = config.data.type // contoh: video/mp4
        }
        // Khusus Image
        else if (config.data.type.startsWith('image/')) {
          config.headers['Content-Type'] = config.data.type // contoh: image/png
        }
        // Fallback untuk blob lain
        else {
          config.headers['Content-Type'] = 'application/octet-stream'
        }
      } else if (typeof config.data === 'string') {
        // Form url encoded
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      } else {
        // Default JSON
        config.headers['Content-Type'] = 'application/json'
      }
    }

    console.log('boot/axios.js A', config)

    return config

  }, function (error) {
    // Loading.hide()
    console.log('boot/axios.js B', error.response)

    // const message = err?.response?.data?.meta?.message

    // if(message) {
    //   if(message == "could_not_create_token") {
    //     cookies.remove('imajora_cookie')
    //     cookies.remove('imajora_csrf')
    //   }
    // }

    return Promise.reject(error)
  })


  axios.interceptors.response.use(async function (response) {

    Loading.hide()

    const { isLogin, payload } = response?.data
    console.log('------------------------------------', isLogin)
    console.log('boot/axios.js C', response?.data)

    // always update Login status
    if (isLogin) {
      if (payload?.token) await cookies.set('accessToken', payload?.token, is_cookie_secure)
      if (route.getName == 'login' || route.getName == 'register') router.replace({ name: 'dashboard' })
      // if (additional?.idToken) await cookies.set('idToken', additional?.idToken, is_cookie_secure)
      // if (additional?.refreshToken) await cookies.set('refreshToken', additional?.refreshToken, is_cookie_secure)
    } else {
      await onClearAuth()
      await cookies.remove('accessToken')
      if (route.getMeta?.logged) router.replace({ name: 'login' })
    }


    // switch (response?.data?.payload) {
    //   case 'logout':
    //     // await cookies.remove('imajora_cookie')
    //     // await cookies.remove('imajora_csrf')
    //     await cookies.remove('accessToken')

    //     router.replace({ name: 'home' })
    //     break;
    // }



    // if(route.getName != 'auth_login') {
    //   if(response?.data?.init) {
    //     await auth.setInit(response?.data?.init)
    //   }
    // }
    // console.log('RouteStore', route?.getName);
    // console.log('RouteStore', route);
    // console.log('boot/axios.js C', route, response?.data?.isLogin, route.getMeta)

    return response

  })


}, function (error) {
  // Loading.hide()
  console.log('boot/axios.js C', error?.response)

  try {
    if (error?.response?.status == 401) {
      // dipindah ke pinia saat user click logout
      Cookies.remove('accessToken')
    }

    if (error.response.data) { }
  } catch (err) { }

  return Promise.reject(error.response)
})
