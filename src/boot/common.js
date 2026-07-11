import { createPinia, mapActions, mapState } from 'pinia';
import { boot } from 'quasar/wrappers'
import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

// import { useAuthStore } from "src/stores/auth/AuthStore";
import { useUiStore } from 'src/stores/ui';

const domain = "http://localhost:8000"
const MIX_API_ROUTE_PREFIX = "/api";

export const host_server = "http://localhost:8000/api" // "https://labsnip.com/api"

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
      // ...mapActions(useUiStore, ['getPageWidth']),
      dateToLocal(myDate) {
        if (!myDate) return ''
        const date = new Date(myDate);
        return date.toLocaleString('sv-SE', {
          timeZone: 'Asia/Jakarta'
        })
      },
      normalizeToString(value, separator = ',') {
        if (Array.isArray(value)) {
          return value.join(separator)
        }

        return value == null ? '' : String(value)
      },
      getJenis(value) {
        switch (value) {
          case 'LmsQuiz':
            return 'Quiz';
          case 'LmsModul':
            return 'Modul';
        }
      },
      nl2br(text) {
        return String(text)
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>')
      },
      ucfirst(str = '') {
        str = String(str);

        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      removeAllEventsInGame() {
        const root = document.querySelector(`#QuizAction .game`);
        if (!root) return;

        const clean = root.cloneNode(true);
        root.replaceWith(clean);

        console.log('removeAllEventsInGame')
      },

      normalizeString(str) {
        return str
          .replace(/&quot;/g, '"')     // HTML entity
          .replace(/\\+"/g, '"')      // escape berlebih
          .replace(/\\+'/g, "'")
          .trim();
      },
      parseUnknown(raw) {
        const str = this.normalizeString(raw)
        try {
          return JSON.parse(str);
        } catch { }

        try {
          return new Function("return " + str)();
        } catch { }

        try {
          // fallback normalize + JSON
          const fixed = str
            .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
            .replace(/'/g, '"')
            .replace(/,\s*]/g, ']');

          return JSON.parse(fixed);
        } catch { }

        return null;
      },
      notifSuccess(caption = 'data berhasil diproses', message = 'Loading success') {
        Notify.create({
          color: 'positive',
          position: 'top',
          message: message,
          caption: caption, //'data berhasil diproses',
          icon: 'done'
        })
      },

      notifFailed(caption = 'data gagal diproses', message = 'Loading failed') {
        Notify.create({
          color: 'negative',
          position: 'top',
          message: message,
          caption: caption,
          icon: 'report_problem'
        })
      },

      getDateOnly(date) {
        return date?.split(" ")[0];
      },

      getRankModel_1(correct, questions) {
        const max = questions; // nilai maksimal
        const steps = 9; // jumlah grade: +A, A, +B, B, +C, C, +D, D, E
        const interval = max / (steps - 1); // jarak tiap tangga

        // buat array batas tiap grade (rounded ke atas supaya aman)
        const limits = Array.from({ length: steps }, (_, i) =>
          Math.round(i * interval)
        );

        // grade labels sesuai pola
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

        // cari grade sesuai correct
        for (let i = 0; i < steps; i++) {
          if (correct >= limits[steps - 1 - i]) {
            return { g: grades[i], d: descriptions[i] };
          }
        }

        return { g: "E", d: "Perlu belajar lagi" };
      },

      getRankModel_2(number) {

        let ranking = ""
        let msg = ""

        if (number >= 4.5) {
          ranking = "A"
          msg = "Sangat memuaskan"
        }
        else if (number >= 3.5) {
          ranking = "B"
          msg = "Bagus"
        }
        else if (number >= 2.5) {
          ranking = "C"
          msg = "Cukup"
        }
        else if (number >= 1.5) {
          ranking = "D"
          msg = "Kurang"
        }
        else {
          ranking = "E"
          msg = "Perlu belajar lagi"
        }

        return {
          d: msg,
          g: ranking,
          s: number
        }

      },


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
        console.log('getNamaKelasList', kelasMap, kelasString);

        if (!kelasString) return [];
        if (!kelasMap) return;

        let ids = [];

        if (typeof kelasString.toString() === 'string') {
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
    // computed: {
    //   ...mapState(useAuthStore, [
    //     'getAuthUser',
    //     // 'getAuth',
    //     'getIsLogin',
    //     'getRole',
    //     // 'getLoadingInit',
    //     // 'getAccessToken',
    //     // 'getLoading',
    //   ]),
    //   getUser() {
    //     return this.getAuthUser
    //   },
    //   isLogged() {
    //     return this.getIsLogin
    //   },
    //   getRouteParams() {
    //     return this.$route?.params;
    //   },
    //   getRouteQuery() {
    //     return this.$route?.query;
    //   },
    //   getRouteName() {
    //     return this.$route?.name;
    //   },
    //   enabled() {
    //     switch (this.getRole) {
    //       case 'superadmin':
    //       case 'admin':
    //         return true
    //       default:
    //         return false
    //     }
    //   },
    //   is_teacher() {
    //     return this.getRole == 'teacher' ? true : false
    //   },
    //   is_student() {
    //     return this.getRole == 'student' ? true : false
    //   },

    //   getScreen() {
    //     return this.$q.screen.width
    //   },
    //   is_higher_laptop() {
    //     return this.getScreen > 1024
    //   },
    //   is_equal_to_higher_laptop() {
    //     return this.getScreen >= 1024
    //   },
    //   is_equal_to_lower_laptop() {
    //     return this.getScreen <= 1024
    //   },
    //   is_lower_laptop() {
    //     return this.getScreen < 1024
    //   },
    //   is_mobile_size() {
    //     return this.getScreen < 768;
    //   },
    //   is_ipad_lower_size() {
    //     return this.getScreen <= 768;
    //   },
    //   is_ipad_higher_size() {
    //     return this.getScreen >= 768;
    //   },
    //   is_ipad_to_laptop_size() {
    //     return this.getScreen >= 768 && this.getScreen < 1024;
    //   },
    // }
  })
})
