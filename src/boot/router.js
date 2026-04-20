// import { sync } from 'vuex-router-sync';
import { boot } from 'quasar/wrappers';

import { useRouterStore } from 'src/stores/auth/RouterStore'
import { useAuthStore } from 'src/stores/auth/AuthStore';

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
      next()
    } else if (to.meta.logged && !auth.getIsLogin) {
      next({ name: 'login' })
    } else if (to.name == 'login' && auth.getIsLogin) {
      next({ name: 'dashboard' })
    } else if (to.name == 'register' && auth.getIsLogin) {
      next({ name: 'dashboard' })
    } else {
      next()
    }

    // next()
  })

});
