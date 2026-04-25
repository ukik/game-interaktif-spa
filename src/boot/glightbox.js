import { boot } from 'quasar/wrappers'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.css'

let lightbox = null;

function initLightbox() {
  console.log('GLightbox global init (.q-img)');

  document.addEventListener('click', function (e) {
    const el = e.target.closest('.q-img'); // 🔥 tetap pakai .q-img
    if (!el) return;

    const container = el.closest('.q-tab-panel') || document;

    const images = container.querySelectorAll('.q-img');

    const elements = Array.from(images)
      .map((item) => {
        const img = item.querySelector('img');
        const src = img?.getAttribute('src');
        if (!src) return null;

        return {
          href: src,
          type: 'image'
        };
      })
      .filter(Boolean);

    const currentImg = el.querySelector('img');
    const currentSrc = currentImg?.getAttribute('src');

    const startIndex = elements.findIndex(e => e.href === currentSrc);

    if (lightbox) {
      lightbox.destroy();
      lightbox = null;
    }

    lightbox = GLightbox({
      elements,
      startAt: startIndex,
      loop: true,
      zoomable: true
    });

    lightbox.open();
  });
}

// export default boot(({ app }) => {
//   app.config.globalProperties.$glightbox = {
//     init: initLightbox
//   }
// })

export default boot(() => {
  initLightbox(); // 🔥 cukup sekali, tidak perlu watcher lagi
});
