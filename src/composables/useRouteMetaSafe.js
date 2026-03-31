// src/composables/useRouteMetaSafe.js
import { useMeta } from 'quasar'
import { useRoute } from 'vue-router'
import { getCurrentInstance } from 'vue'

export default function useRouteMetaSafe() {
  // cek apakah ada instance (hanya ada saat runtime)
  const instance = getCurrentInstance()
  if (!instance) {
    // SSG/Node environment, skip
    return
  }

  const route = useRoute()

  // console.log(route.meta.title, route.meta)

  // ambil meta dari route
  const meta = route.meta.meta || []

  const param = route?.params?.id ? `- ${route?.params?.id}` : ''

  useMeta({
    title: `${route.meta.title} ${param}` || 'Default Title',
    meta: meta
  })
}
