import { createPinia, mapActions, mapState } from 'pinia';
import { boot } from 'quasar/wrappers'

import { useAuthStore } from "src/stores/auth/AuthStore";
import { useUiStore } from 'src/stores/ui';

const domain = "http://localhost:8000"
const MIX_API_ROUTE_PREFIX = "/api";

export const host = domain + MIX_API_ROUTE_PREFIX; //+"/v1"; // 'http://properti-backend.local/'; //
// untuk akses route yg ada di file routes/api.php
export const route_api = domain + MIX_API_ROUTE_PREFIX; // 'http://properti-backend.local/'; //

export default boot(async ({ app, ssrContext, router, store }) => {
  // app.use(createPinia())
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
      ...mapActions(useUiStore, ['getPageWidth']),
      getRanking(score) {
        score = parseInt(score);

        // normalisasi
        if (score > 100) score = 100;
        if (score < 0) score = 0;

        const grades = ["A+", "A", "B+", "B", "C+", "C", "D+", "D", "E"];
        const descriptions = [
          "Perfect! Semua soal benar",
          "Hampir sempurna",
          "Sangat bagus",
          "Bagus",
          "Cukup",
          "Perlu latihan",
          "Kurang",
          "Sangat kurang",
          "Perlu belajar lagi",
        ];

        let index;

        if (score === 100) index = 0;
        else if (score >= 90) index = 1;
        else if (score >= 80) index = 2;
        else if (score >= 70) index = 3;
        else if (score >= 60) index = 4;
        else if (score >= 50) index = 5;
        else if (score >= 40) index = 6;
        else if (score >= 30) index = 7;
        else index = 8;

        return {
          grade: grades[index],
          score: score,
          label: descriptions[index],
        };
      },
      getRankColor(val) {
        switch (val) {
          case 0:
            return 'blue';
          case 1:
            return 'green';
          case 2:
            return 'orange';
        }
      },
      getRankColorBootstrap(val) {
        switch (val) {
          case 0:
            return 'primary-bootstrap';
          case 1:
            return 'success-bootstrap';
          case 2:
            return 'warning-bootstrap';
        }
      },
      getNamaKelasList(kelasMap, kelasString) {
        if (!kelasString) return [];

        console.log('getNamaKelasList', kelasMap, kelasString);

        let ids = [];

        if (typeof kelasString === 'string') {
          ids = kelasString.split(',');
        } else if (Array.isArray(kelasString)) {
          ids = kelasString;
        } else {
          ids = [kelasString];
        }

        return ids
          .map(id => kelasMap[id]?.trim())
          .filter(Boolean);
      },
      getNamaKelasListString(kelasMap, kelasString) {
        if (!kelasString) return null;
        console.log('getNamaKelasListString', kelasMap, kelasString)
        const object = kelasMap;
        return kelasString?.split(',')                 // "1,4,5" → ["1","4","5"]
          .map(id => object[id]?.trim()) // ambil dari object
          .filter(Boolean)            // buang null/undefined
          .join(', ')                 // gabung jadi string
      },
      diffFromNow(startStr, endStr) {
        if (!startStr || !endStr) return '-'

        const now = new Date()

        const start = this.parseYMD(startStr)
        const end = this.parseYMD(endStr, true) // 🔥 end of day

        let status, target

        if (now < start) {
          status = 'belum_mulai'
          target = start
        } else if (now > end) {
          return {
            status: 'selesai',
            text: '0 menit'
          }
        } else {
          status = 'berlangsung'
          target = end
        }

        const diffMs = Math.abs(target - now)

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60)

        const parts = []

        if (days > 0) parts.push(days + ' hari')
        if (hours > 0) parts.push(hours + ' jam')
        if (minutes > 0) parts.push(minutes + ' menit')

        const text = parts.length ? parts.join(' ') : '0 menit'

        return {
          status,
          text
        }
      },

      parseYMD(str, endOfDay = false) {
        const [y, m, d] = str.split('-').map(Number)
        return endOfDay
          ? new Date(y, m - 1, d, 23, 59, 59)
          : new Date(y, m - 1, d, 0, 0, 0)
      }
    },
    computed: {
      ...mapState(useAuthStore, [
        'getAuthUser',
        // 'getAuth',
        'getIsLogin',
        'getRole',
        // 'getLoadingInit',
        // 'getAccessToken',
        // 'getLoading',
      ]),
      is_teacher() {
        return this.getRole == 'teacher' ? true : false
      },

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
