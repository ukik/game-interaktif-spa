import { createMetaMixin } from 'quasar'

export default createMetaMixin(function () {
  const routeTitle = this.$route.meta?.title || 'Default'

  return {
    // 🔥 dinamis
    title: routeTitle,

    titleTemplate: title => `${title} - My Website`,

    meta: {
      description: { name: 'description', content: 'Page 1' },
      keywords: { name: 'keywords', content: 'Quasar website' },
      equiv: {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=UTF-8'
      },
      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        property: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `${ogTitle} - My Website`
        }
      }
    },

    link: {
      material: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    },

    script: {
      ldJson: {
        type: 'application/ld+json',
        innerHTML: `{ "@context": "http://schema.org" }`
      }
    },

    htmlAttr: {
      'xmlns:cc': 'http://creativecommons.org/ns#',
      empty: undefined
    },

    bodyAttr: {
      'action-scope': 'xyz',
      empty: undefined
    },

    // <noscript> tags
    noscript: {
      default: 'This is content for browsers with no JS (or disabled JS)'
    }
  }
})
