// import { defineStore } from 'pinia';

import {
  Loading,
  Notify,
  Cookies,
  Platform,
  Screen
} from 'quasar'

import { host } from 'src/boot/common'

import axios from 'axios'

export function notifSuccess(caption = 'data berhasil diproses', message = 'Loading success') {
  Notify.create({
    color: 'positive',
    position: 'top',
    message: message,
    caption: caption, //'data berhasil diproses',
    icon: 'done'
  })
}

export function notifFailed(caption = 'data gagal diproses', message = 'Loading failed') {
  Notify.create({
    color: 'negative',
    position: 'top',
    message: message,
    caption: caption,
    icon: 'report_problem'
  })
}

export async function onRequestPublic(store, url = {
  url: host + url,
  method: 'get',
  params: {
    page: 1
  }
}, key = '') {

  if (store.loading[key]) return false;

  store.loading[key] = true;

  console.log('onRequestPublic')

  const resp = await axios(url)
    .then((response) => {
      // notifSuccess()
      return response
    })
    .catch((err) => {
      console.log('onRequestPublic', err)
      // notifFailed()
      return false
    })

  store.loading[key] = false
  store.init[key] = false;

  if (resp == false) return false
  if (!resp?.data) return false

  store[key] = resp?.data
  console.log('onRequestPublic', store[key])

  return true
}


export async function onRequestPrivate(store, url = {
  url: host + url,
  method: 'get',
  params: {
    page: 1
  }
}, key = '') {

  if (store.loading[key]) return false;

  store.loading[key] = true;

  console.log('onRequestPrivate')

  const resp = await axios(url)
    .then((response) => {
      // notifSuccess()
      return response
    })
    .catch((err) => {
      console.log('onRequestPrivate', err)
      // notifFailed()
      return false
    })

  store.loading[key] = false
  store.init[key] = false;

  if (resp == false) return false
  if (!resp?.data) return false
  if (resp?.data?.isLogin) {

    store[key] = resp?.data
    console.log('onRequestPrivate', store[key])

    return true
  }
}



export async function onRequestEditPrivate(store, url = {
  // url: host + url,
  // method: 'get',
  // params: {
  //   page: 1
  // }
}, key = '') {

  if (store.loading[key]) return false;

  store.loading[key] = true;

  console.log('onRequestEditPrivate')

  Loading.show()

  const resp = await axios(url)
    .then((response) => {
      notifSuccess()
      return response
    })
    .catch((err) => {
      console.log('onRequestEditPrivate', err)
      notifFailed()
      return false
    })

  store.loading[key] = false
  store.init[key] = false;

  Loading.hide()

  if (resp == false) return false
  if (!resp?.data) return false
  if (resp?.data?.isLogin) {

    return true
    return resp?.data
  }
}
