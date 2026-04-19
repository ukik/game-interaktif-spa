import { defineStore } from 'pinia';
// import axios from 'axios'

export const useRouterStore = defineStore('router', {
  state: () => ({
    isDialogOpen:[],
    route: {
      name: '',
      path: '',
      query: {
        lang: '',
      },
      params: '',
      meta: {
        ssr: null,
        logged: null,
        role: '',
        title: '',
      }
    },
  }),
  getters: {
    getRouter(state) {
      return state.route;
    },
    getName(state) {
      return state.route.name;
    },
    getPath(state) {
      return state.route.path;
    },
    getQuery(state) {
      return state.route.query;
    },
    getParams(state) {
      return state.route.params;
    },
    getMeta(state) {
      return state.route.meta;
    },
  },
  actions: {
    async setRouter(value) {
      this.route = value
      return
    },
    whateverAction(value) {
      setTimeout(() => {
        // this.router.push(value)
      }, 5000);
    },
    isDialogOpenRemove() {
      this.isDialogOpen.pop();
    },
    isDialogOpenAdd() {
      this.isDialogOpen.push(1);
    },
  },
});
