// src/boot/global-properties.js

import { boot } from 'quasar/wrappers'
import { Screen } from 'quasar'
import { useAuthStore } from 'src/stores/auth/AuthStore'

export default boot(({ app, router }) => {

  Object.defineProperty(app.config.globalProperties, 'getAuthUser', {
    get() {
      return useAuthStore().getAuthUser
    }
  })

  Object.defineProperty(app.config.globalProperties, 'getIsLogin', {
    get() {
      return useAuthStore().getIsLogin
    }
  })

  Object.defineProperty(app.config.globalProperties, 'getRole', {
    get() {
      return useAuthStore().getRole
    }
  })

  Object.defineProperty(app.config.globalProperties, 'getUser', {
    get() {
      return useAuthStore().getAuthUser
    }
  })

  Object.defineProperty(app.config.globalProperties, 'isLogged', {
    get() {
      return useAuthStore().getIsLogin
    }
  })

  Object.defineProperty(app.config.globalProperties, 'getRouteParams', {
    get() {
      return router.currentRoute.value.params
    }
  })

  Object.defineProperty(app.config.globalProperties, 'getRouteQuery', {
    get() {
      return router.currentRoute.value.query
    }
  })

  Object.defineProperty(app.config.globalProperties, 'getRouteName', {
    get() {
      return router.currentRoute.value.name
    }
  })

  Object.defineProperty(app.config.globalProperties, 'enabled', {
    get() {
      switch (useAuthStore().getRole) {
        case 'superadmin':
        case 'admin':
          return true
        default:
          return false
      }
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_teacher', {
    get() {
      return useAuthStore().getRole == 'teacher'
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_student', {
    get() {
      return useAuthStore().getRole == 'student'
    }
  })

  Object.defineProperty(app.config.globalProperties, 'getScreen', {
    get() {
      return Screen.width
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_higher_laptop', {
    get() {
      return Screen.width > 1024
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_equal_to_higher_laptop', {
    get() {
      return Screen.width >= 1024
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_equal_to_lower_laptop', {
    get() {
      return Screen.width <= 1024
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_lower_laptop', {
    get() {
      return Screen.width < 1024
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_mobile_size', {
    get() {
      return Screen.width < 768
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_ipad_lower_size', {
    get() {
      return Screen.width <= 768
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_ipad_higher_size', {
    get() {
      return Screen.width >= 768
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_ipad_to_laptop_size', {
    get() {
      return Screen.width >= 768 && Screen.width < 1024
    }
  })

})
