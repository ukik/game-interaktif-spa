// src/boot/global-properties.js

import { boot } from 'quasar/wrappers'
import { Screen } from 'quasar'
import { useAuthStore } from 'src/stores/auth/AuthStore'
import { useUiStore } from 'src/stores/ui'

export default boot(({ app, router }) => {

  Object.defineProperty(app.config.globalProperties, 'getPageWidth', {
    value() {
      return useUiStore().getPageWidth()
    }
  })

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

  Object.defineProperty(app.config.globalProperties, 'is_stakeholder', {
    get() {
      switch (useAuthStore().getRole) {
        case 'teacher':
        case 'principal':
          return true
        default:
          return false
      }
    }
  })


  Object.defineProperty(app.config.globalProperties, 'is_admin', {
    get() {
      switch (useAuthStore().getRole) {
        case 'admin':
          return true
        default:
          return false
      }
    }
  })

  Object.defineProperty(app.config.globalProperties, 'is_superadmin', {
    get() {
      switch (useAuthStore().getRole) {
        case 'superadmin':
          return true
        default:
          return false
      }
    }
  })


  Object.defineProperty(app.config.globalProperties, 'is_parent', {
    get() {
      switch (useAuthStore().getRole) {
        case 'parent':
          return true
        default:
          return false
      }
    }
  })


  Object.defineProperty(app.config.globalProperties, 'is_principal', {
    get() {
      switch (useAuthStore().getRole) {
        case 'principal':
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

  Object.defineProperty(app.config.globalProperties, 'rules', {
    value: {
      passwordOptional: [
        (val) => {
          if (!val) return true; // kosong diperbolehkan
          return val.length >= 5 || 'Minimal 5 karakter';
        },
        (val) => {
          if (!val) return true;
          return val.length <= 100 || 'Maksimal 100 karakter';
        },
      ],
      confirmPassword(passwordRef) {
        return [
          (val) => {
            const password = passwordRef();

            if (!password && !val) return true;

            if (password && !val) {
              return 'Konfirmasi password wajib diisi';
            }

            if (!password && val) {
              return 'Password baru wajib diisi';
            }

            return val === password || 'Password tidak sama';
          }
        ]
      },
      password: [
        val => !!val || 'Password wajib diisi',
        val => val.length >= 5 || 'Minimal 5 karakter',
        val => val.length <= 100 || 'Maksimal 100 karakter',
        // val => /[A-Za-z]/.test(val) || 'Harus mengandung huruf',
        // val => /\d/.test(val) || 'Harus mengandung angka',
      ],

      required: [
        val => !!val || 'Wajib diisi'
      ],

      email: [
        val => !!val || 'Email wajib diisi',
        val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          || 'Format email tidak valid'
      ]
    }
  })

  Object.defineProperty(app.config.globalProperties, 'Swal', {
    value: {
      success() {
        Swal.fire({
          title: "Sukses!",
          text: "Data berhasil diproses!",
          icon: "success"
        });
      },
      error() {
        Swal.fire({
          title: "Batal!",
          text: "Data gagal diproses!",
          icon: "error"
        });
      },
    }
  })

  Object.defineProperty(app.config.globalProperties, 'getValidate', {
    value: {

      async showValidationErrors(formRef = 'formRef') {
        let form = null;

        try {
          form = this.$refs[formRef]
        } catch (error) {
          return
        }

        if (!form) return;

        const errors = [];

        const components = form.getValidationComponents?.() || [];

        components.forEach((comp) => {
          if (comp.validate && !comp.validate()) {
            const label =
              comp.label ||
              comp.$attrs?.label ||
              comp.$options?.propsData?.label ||
              "Field";

            errors.push(label);
          }
        });

        if (errors.length) {
          this.$q.notify({
            type: "negative",
            message: "Periksa: " + errors.join(", "),
            timeout: 2000,
            position: "top",
          });
        }
      },
      async waitAndScrollToError() {
        let attempt = 0;

        const findAndScroll = () => {
          const el = document.querySelector(".q-field--error");

          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            return true;
          }

          return false;
        };

        const interval = setInterval(() => {
          attempt++;

          const found = findAndScroll();

          if (found || attempt > 20) {
            clearInterval(interval);
          }
        }, 150);
      },
    }
  })

})
