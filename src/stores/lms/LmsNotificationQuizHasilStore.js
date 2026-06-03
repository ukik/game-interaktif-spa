import {
  Loading,
  // Notify,
  // Cookies,
  // Platform,
  // Screen
} from 'quasar'

import { defineStore, acceptHMRUpdate } from 'pinia';

import { host } from 'src/boot/common'

import { onRequestPrivate, onRequestEditPrivate, notifSuccess, notifFailed } from 'src/utils/apiRequest';
import { useRouterStore } from '../auth/RouterStore';

function now() {
  const d = new Date();

  const pad = (n) => String(n).padStart(2, '0');

  return (
    d.getFullYear() + '-' +
    pad(d.getMonth() + 1) + '-' +
    pad(d.getDate()) + ' ' +
    pad(d.getHours()) + ':' +
    pad(d.getMinutes()) + ':' +
    pad(d.getSeconds())
  );
}

const schema = {
  "payload": {
    "payload": {
      "current_page": 1,
      "data": [],
      "first_page_url": "",
      "from": null,
      "last_page": 1,
      "last_page_url": "",
      "links": [
        {
          "url": null,
          "label": "&laquo; Previous",
          "active": false
        },
        {
          "url": "",
          "label": "1",
          "active": true
        },
        {
          "url": null,
          "label": "Next &raquo;",
          "active": false
        }
      ],
      "next_page_url": null,
      "path": "",
      "per_page": 20,
      "prev_page_url": null,
      "to": null,
      "total": 0
    }
  },
  "status": "success",
  "success": true,
  "message": "OK",
  "flag": null,
  "isLogin": true,
  "expires_in": 3600,
}

export const useLmsNotificationQuizHasilStore = defineStore('LmsNotificationQuizHasilStore', {
  state: () => ({
    tab: 'index',
    keyword: '',
    init: {
      index: true,
      show: true,
      read: true,
      read_all: true,
      delete: true,
      delete_all: true,
    },
    index: JSON.parse(JSON.stringify(schema)),
    index_read: JSON.parse(JSON.stringify(schema)),
    index_unread: JSON.parse(JSON.stringify(schema)),
    show: {
      payload: {
        payload: {}
      }
    },
    loading: {
      index: false,
      read: false,
      delete: false,
    }
  }),
  getters: {
    get_init_index: ({ init }) => init?.index,
    get_init_show: ({ init }) => init?.show,

    get_index_current_page: ({ index }) => index?.payload?.payload?.current_page,
    get_index_data: ({ index }) => index?.payload?.payload?.data,
    get_index_first_page_url: ({ index }) => index?.payload?.payload?.first_page_url,
    get_index_from: ({ index }) => index?.payload?.payload?.from,
    get_index_last_page: ({ index }) => index?.payload?.payload?.last_page,
    get_index_last_page_url: ({ index }) => index?.payload?.payload?.last_page_url,
    get_index_next_page_url: ({ index }) => index?.payload?.payload?.next_page_url,
    get_index_path: ({ index }) => index?.payload?.payload?.path,
    get_index_per_page: ({ index }) => index?.payload?.payload?.per_page,
    get_index_prev_page_url: ({ index }) => index?.payload?.payload?.prev_page_url,
    get_index_to: ({ index }) => index?.payload?.payload?.to,
    get_index_total: ({ index }) => index?.payload?.payload?.total,

    get_index_read_current_page: ({ index_read }) => index_read?.payload?.payload?.current_page,
    get_index_read_data: ({ index_read }) => index_read?.payload?.payload?.data,
    get_index_read_first_page_url: ({ index_read }) => index_read?.payload?.payload?.first_page_url,
    get_index_read_from: ({ index_read }) => index_read?.payload?.payload?.from,
    get_index_read_last_page: ({ index_read }) => index_read?.payload?.payload?.last_page,
    get_index_read_last_page_url: ({ index_read }) => index_read?.payload?.payload?.last_page_url,
    get_index_read_next_page_url: ({ index_read }) => index_read?.payload?.payload?.next_page_url,
    get_index_read_path: ({ index_read }) => index_read?.payload?.payload?.path,
    get_index_read_per_page: ({ index_read }) => index_read?.payload?.payload?.per_page,
    get_index_read_prev_page_url: ({ index_read }) => index_read?.payload?.payload?.prev_page_url,
    get_index_read_to: ({ index_read }) => index_read?.payload?.payload?.to,
    get_index_read_total: ({ index_read }) => index_read?.payload?.payload?.total,

    // get_index_unread: ({ index_unread }) => index_unread?.payload?.payload,
    get_index_unread_current_page: ({ index_unread }) => index_unread?.payload?.payload?.current_page,
    get_index_unread_data: ({ index_unread }) => index_unread?.payload?.payload?.data,
    get_index_unread_first_page_url: ({ index_unread }) => index_unread?.payload?.payload?.first_page_url,
    get_index_unread_from: ({ index_unread }) => index_unread?.payload?.payload?.from,
    get_index_unread_last_page: ({ index_unread }) => index_unread?.payload?.payload?.last_page,
    get_index_unread_last_page_url: ({ index_unread }) => index_unread?.payload?.payload?.last_page_url,
    get_index_unread_next_page_url: ({ index_unread }) => index_unread?.payload?.payload?.next_page_url,
    get_index_unread_path: ({ index_unread }) => index_unread?.payload?.payload?.path,
    get_index_unread_per_page: ({ index_unread }) => index_unread?.payload?.payload?.per_page,
    get_index_unread_prev_page_url: ({ index_unread }) => index_unread?.payload?.payload?.prev_page_url,
    get_index_unread_to: ({ index_unread }) => index_unread?.payload?.payload?.to,
    get_index_unread_total: ({ index_unread }) => index_unread?.payload?.payload?.total,


    get_show_payload: ({ show }) => show?.payload?.payload,

    get_loading_index: ({ loading }) => loading?.index,
    get_show_index: ({ loading }) => loading?.show,
  },
  actions: {
    setCurrentPage(val) {
      this.index.payload.payload.current_page = Number(val)
    },
    setKeyword(val) {
      this.keyword = val
    },
    // onChangePage(page) {

    //   if (this.loading.index) return false;
    //   if (page) this.index.payload.payload.current_page = Number(page)

    //   const route = useRouterStore()

    //   console.log('route', route?.getRouter)

    //   this.router.replace({
    //     ...route?.getName,
    //     query: {
    //       ...route?.getQuery,
    //       page: this.index.payload.payload.current_page ?? 1,
    //     }
    //   })

    //   // this.onIndex()

    // },
    async onIndex(page = null) {

      const route = useRouterStore();

      if (page) this.index.payload.payload.current_page = Number(page)

      // wajib ada query status
      console.log('THIS TAB', this.tab)
      if (route?.getQuery?.status == undefined) {
        return this.init[this.tab] = false;
      }

      const params = {
        page: this.index?.payload?.payload?.current_page ?? 1,
        status: route?.getQuery?.status,
        keyword: route?.getQuery?.keyword,
      }

      console.log('onIndex ----------------', params)

      await onRequestPrivate(this, {
        url: host + '/lms/notifications/quiz-hasil',
        method: 'get',
        params: params,
      }, this.tab)

      this.init.index = false
    },
    async onReadAll() {
      Loading.show();
      const temp = await onRequestPrivate(this, {
        url: host + '/lms/notifications/quiz-hasil/read-all',
        method: 'post',
      }, 'index')
      Loading.hide();
      if(temp) {
        this.onIndex()
      }
    },
    async onDeleteAll() {
      Loading.show();
      const temp = await onRequestPrivate(this, {
        url: host + '/lms/notifications/quiz-hasil',
        method: 'delete',
      }, 'index')
      Loading.hide();
      if(temp) {
        this.onIndex()
      }
    },
    async onRead(id = 1) {
      let temp = this.index?.payload?.payload?.data
      // temp.forEach((el, i) => {
      //   if(id == el?.id) {
      //     el.read_at = '11111111111'
      //     temp.splice(i, 1)
      //   }
      // });


      // const temp = this.index?.payload?.payload?.data?.find(
      //   el => el.id == id
      // )
      // if (temp) {
      //   temp.read_at = '11111111111'
      // }

      const data = await onRequestEditPrivate(this, {
        url: host + `/lms/notifications/quiz-hasil/${id}/read`,
        method: 'post'
      }, 'read')

      if (data) {
        const index = temp.findIndex(el => el.id == id)
        if (index !== -1) {
          temp[index].read_at = now()
          // temp.splice(index, 1)
        }
      }

    },
    async onDelete() {
      let temp = this.index?.payload?.payload?.data

      const id = this.get_show_payload?.id

      Loading.show();
      const data = await onRequestEditPrivate(this, {
        url: host + `/lms/notifications/quiz-hasil/${id}`,
        method: 'delete'
      }, 'read')
      Loading.hide();

      if (data) {
        const index = temp.findIndex(el => el.id == id)
        if (index !== -1) {
          // temp[index].read_at = now()
          temp.splice(index, 1)
        }
        this.show = {
          payload: {
            payload: {}
          }
        }
        return true
      }
      return false

    },

    async onShow(slug = null) {

      await onRequestPrivate(this, {
        url: host + '/lms/notifications/quiz-hasil/'+slug,
        method: 'get',
      }, 'show')

      this.init.show = false;
    },


  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLmsNotificationQuizHasilStore, import.meta.hot))
}
