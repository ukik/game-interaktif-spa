import { mapState } from 'pinia';
import { boot } from 'quasar/wrappers'

import { useAuthStore } from "src/stores/auth/AuthStore";
import { useUiStore } from 'src/stores/ui';

const domain = "http://localhost:8000"
const MIX_API_ROUTE_PREFIX = "/api";

export const host = domain + MIX_API_ROUTE_PREFIX; //+"/v1"; // 'http://properti-backend.local/'; //
// untuk akses route yg ada di file routes/api.php
export const route_api = domain + MIX_API_ROUTE_PREFIX; // 'http://properti-backend.local/'; //

export default boot(async ({ app, ssrContext, router, store }) => {

  app.mixin({
    data() {
      return {
        route_api,
        domain,
        global_url_image: "https://placehold.co/400x300/cccccc/000000.png?text=No+Image",
        global_default_image: "https://placehold.co/400x300/cccccc/000000.png?text=No+Image",
      };
    },
    methods: {
      getNamaKelasList(object, kelasString) {
        return kelasString
          .split(',')                 // "1,4,5" → ["1","4","5"]
          .map(id => object[id]?.trim()) // ambil dari object
          .filter(Boolean)            // buang null/undefined
          .join(', ')                 // gabung jadi string
      }
    },
    computed: {
      ...mapState(useAuthStore, [
        'getAuthUser',
        // 'getAuth',
        'getIsLogin',
        // 'getLoadingInit',
        // 'getAccessToken',
        // 'getLoading',
      ]),
      ...mapState(useUiStore, ['getPageWidth']),
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
      is_mobile_size() {
        return this.getScreen < 768;
      },
      is_ipad_lower_size() {
        return this.getScreen <= 768;
      },
      is_ipad_higher_size() {
        return this.getScreen >= 768;
      },
      is_ipad_to_laptop_size() {
        return this.getScreen >= 768 && this.getScreen < 1024;
      },
    }
  })
})
