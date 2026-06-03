import { defineStore, acceptHMRUpdate } from 'pinia';

import { host } from 'src/boot/common'

import { onRequestPrivate, notifSuccess, notifFailed } from 'src/utils/apiRequestGlobal';

function normalizeToString(value, separator = ',') {
  if (Array.isArray(value)) {
    return value.join(separator)
  }

  return value == null ? '' : String(value)
}

export const useGlobalStore = defineStore('GlobalStore', {
  state: () => ({
    init: {
      global: true,
    },
    data: {
      global: {
        payload: {
          list_kelas: null,
          list_kategori: null,
          list_guru: null,
          list_mapel: null,
        }
      }
    },
    loading: {
      global: false,
    }
  }),
  getters: {
    get_init_global: ({ init }) => init?.global,
    get_data_global: ({ data }) => data?.global,

    get_data_global_list_kelas: ({ data }) => data?.global?.payload?.list_kelas ?? [],
    get_data_global_list_kategori: ({ data }) => data?.global?.payload?.list_kategori ?? [],
    get_data_global_list_guru: ({ data }) => data?.global?.payload?.list_guru ?? [],
    get_data_global_list_mapel: ({ data }) => data?.global?.payload?.list_mapel ?? [],

    get_loading_global: ({ loading }) => loading?.global,
  },
  actions: {

    getFilter(id, key) {
      const temp = this.data?.global?.payload[key] ?? []

      if(!temp) return;

      let m = null;

      temp?.forEach(el => {
        if(el.id == normalizeToString(id)) {
          m = (el)
        }
      });
      return m
    },

    getFilterKelas(ids) {
      const obj = this.data?.global?.payload?.list_kelas ?? {}

      let temp = [];

      for (const key in obj) {
        if (!Object.hasOwn(obj, key)) continue;

        const element = obj[key];

        temp.push({nama: element, id: key, kelas: Number(key-1)})
      }

      let m = [];

      console.log(temp, ids)

      temp?.forEach(el1 => {
        ids.forEach(el2 => {
          if(el1.id == el2) {
            m.push(el1)
          }
        });
      });


      // console.log('temp', ids, m)

      return normalizeToString(m?.map(item => item.kelas))
    },

    async onRequest() {

      onRequestPrivate(this, {
        url: host + '/global',
        method: 'get',
      }, 'global')

    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
