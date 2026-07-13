import { createMetaMixin } from 'quasar'

export default createMetaMixin(function () {
  const routeTitle = this.$route.meta?.title || 'LABSNIP'

  return {

    // meta: {
    //   description: { name: 'description', content: 'Page 1' },
    //   keywords: { name: 'keywords', content: 'LABSNIP - Jadi Pintar Itu Hebat' },
    //   equiv: {
    //     'http-equiv': 'Content-Type',
    //     content: 'text/html; charset=UTF-8'
    //   },
    //   // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    //   ogTitle: {
    //     property: 'og:title',
    //     // optional; similar to titleTemplate, but allows templating with other meta properties
    //     template(ogTitle) {
    //       return `${ogTitle} - Jadi Pintar Itu Hebat`
    //     }
    //   }
    // },

    // saran dari ChatGPT
    // titleTemplate: title => `${title} - Sosial Interaktif Learning`,

    // 🔥 dinamis
    title: routeTitle,

    titleTemplate: title =>
      `${title} | Sosial Interaktif Learning - Jadi Pintar Itu Hebat`,

    meta: {
      description: {
        name: 'description',
        content: 'LABSNIP (Sosial Interaktif Learning) adalah platform LMS dengan pembelajaran interaktif, game edukasi, kuis online, asesmen digital, dan media belajar untuk siswa, guru, dan sekolah.'
      },

      keywords: {
        name: 'keywords',
        content: 'LABSNIP, LMS, e-learning, belajar online, pembelajaran interaktif, game edukasi, kuis online, asesmen digital, media pembelajaran, pendidikan Indonesia'
      },

      author: {
        name: 'author',
        content: 'LABSNIP'
      },

      robots: {
        name: 'robots',
        content: 'index, follow, max-image-preview:large'
      },

      ogTitle: {
        property: 'og:title',
        content: routeTitle,
        template: title =>
          `${title} | Sosial Interaktif Learning - Jadi Pintar Itu Hebat`
      },

      ogDescription: {
        property: 'og:description',
        content: 'LABSNIP Sosial Interaktif Learning'
      },

      ogType: {
        property: 'og:type',
        content: 'website'
      },

      ogImage: {
        property: 'og:image',
        content: '/icons/og-image.png'
      },

      ogUrl: {
        property: 'og:url',
        content: 'https://labsnip.com'
      },

      twitterCard: {
        name: 'twitter:card',
        content: 'summary_large_image'
      },

      twitterTitle: {
        name: 'twitter:title',
        content: routeTitle,
        template: title =>
          `${title} | Sosial Interaktif Learning - Jadi Pintar Itu Hebat`
      },

      twitterDescription: {
        name: 'twitter:description',
        content: 'LABSNIP (Sosial Interaktif Learning) adalah platform LMS dengan pembelajaran interaktif, game edukasi, kuis online, asesmen digital, dan media belajar untuk siswa, guru, dan sekolah.'
      },

      twitterImage: {
        name: 'twitter:image',
        content: 'https://labsnip.com/icons/og-image.png'
      },

      twitterSite: {
        name: 'twitter:site',
        content: '@labsnip'
      },

      twitterUrl: {
        name: 'twitter:url',
        content: 'https://labsnip.com'
      },

      ogSiteName: {
        property: 'og:site_name',
        content: 'LABSNIP'
      },

      ogLocale: {
        property: 'og:locale',
        content: 'id_ID'
      },


      themeColor: {
        name: 'theme-color',
        content: '#1976D2'
      },
    },


    link: {
      material: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },

      canonical: {
        rel: 'canonical',
        href: 'https://labsnip.com'
      }
    },
    script: {
      ldJson: {
        type: 'application/ld+json',
        innerHTML: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "LABSNIP",
          "url": "https://labsnip.com",
          "description": "LABSNIP adalah platform LMS dengan pembelajaran interaktif dan game edukasi.",
          "inLanguage": "id-ID"
        }
      }
    },


    htmlAttr: {
      'xmlns:cc': 'http://creativecommons.org/ns#',
      empty: undefined
    },

    // bodyAttr: {
    //   'action-scope': 'xyz',
    //   empty: undefined
    // },

    // <noscript> tags
    noscript: {
      default: 'Aktifkan JavaScript untuk menggunakan LABSNIP.'
    }
  }
})
