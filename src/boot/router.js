// import { sync } from 'vuex-router-sync';
import { boot } from 'quasar/wrappers';

import { useRouterStore } from 'src/stores/auth/RouterStore'
import { useAuthStore } from 'src/stores/auth/AuthStore';

// const route_after_login_redirect = { name: "lms_notification_tugas_index" }
const route_after_login_redirect = {
  name: "lms_quiz_index",
  params: {
    quiz: 'arrange'
  }
}

export default boot(async ({ router, store }) => {
  const auth = useAuthStore(store) // inject disini ya
  await auth.onInit()

  const routerStore = useRouterStore()

  router.beforeEach(async (to, from, next) => {
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too

    console.log('auth.getIsLogin', auth.getIsLogin, to.meta.logged)
    console.log('beforeEach', auth.getIsLogin, store)

    await routerStore.setRouter(to);

    // console.log('form_accounts_password', store.state.value?.router)

    if (to.meta.logged && auth.getIsLogin) {
      console.log('router 1')
      next()
    } else if (to.meta.logged && !auth.getIsLogin) {
      console.log('router 2')
      next({ name: 'login' })
    } else if (to.name == 'login' && auth.getIsLogin) {
      console.log('router 3')
      next(route_after_login_redirect)
    } else if (to.name == 'register' && auth.getIsLogin) {
      console.log('router 4')
      next(route_after_login_redirect)
    } else {
      console.log('router 5')
      next()
    }

    // next()
  })

});
