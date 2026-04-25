import { boot } from 'quasar/wrappers'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.css'

let lightbox = null

function initLightbox() {
  console.log('initLightbox')

  // 🚀 Bonus (biar cuma gambar tertentu aja)

  // Tambahkan class:

  // <q-img class="lightbox" :src="item.url_image" />

  // lalu ubah:

  // const images = document.querySelectorAll('.q-img.lightbox')


  const images = document.querySelectorAll('.q-img')

  const elements = []

  images.forEach((el) => {
    const img = el.querySelector('img')
    if (!img) return

    const src = img.getAttribute('src')
    if (!src) return

    elements.push({
      href: src,
      type: 'image'
    })

    // klik handler
    el.onclick = () => {
      console.log('glightbox')
      if (lightbox) lightbox.destroy()

      lightbox = GLightbox({
        elements: elements,
        startAt: elements.findIndex(e => e.href === src),
        loop: true,
        zoomable: true
      })

      lightbox.open()
    }
  })
}

export default boot(({ app }) => {
  app.config.globalProperties.$glightbox = {
    init: initLightbox
  }
})
