import { mapState } from 'pinia';
import { boot } from 'quasar/wrappers'

import { useAuthStore } from "src/stores/auth/AuthStore";

const domain = "http://localhost:8000"
const MIX_API_ROUTE_PREFIX = "/api";

export const host = domain+MIX_API_ROUTE_PREFIX; //+"/v1"; // 'http://properti-backend.local/'; //
// untuk akses route yg ada di file routes/api.php
export const route_api = domain+MIX_API_ROUTE_PREFIX; // 'http://properti-backend.local/'; //

export default boot(async ({ app, ssrContext, router, store }) => {

  app.mixin({
    data() {
      return {
        route_api,
        domain,
      };
    },
    computed: {
      ...mapState(useAuthStore, [
        'getAuthUser',
        'getAuth',
        'getIsLogin',
        'getLoadingInit',
        'getAccessToken',
        'getLoading',
      ]),
      getScreen() {
        return this.$q.screen.width
      },
      higherLaptop() {
        return this.getScreen > 1024
      },
      equalToHigherLaptop() {
        return this.getScreen >= 1024
      },
      equalToLowerLaptop() {
        return this.getScreen <= 1024
      },
      lowerLaptop() {
        return this.getScreen < 1024
      },

    }
  })
})
