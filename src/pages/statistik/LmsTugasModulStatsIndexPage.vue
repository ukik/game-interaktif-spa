<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">

    <template v-if="get_index_data.length > 0">
      <div class="row q-gutter-y-md">
        <IndexCard :get_index_data="get_index_data" :get_index_kelas="get_index_kelas" route_name="lms-tugas-modul-stats-show"></IndexCard>
      </div>
    </template>

    <EmptyBlock v-else></EmptyBlock>

    <div style="height: 47px"></div>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <Pagination :current_page="get_index_current_page" :last_page="get_index_last_page" :disable="get_index_loading"
        @onBubbleEvent="onBubbleEvent"></Pagination>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsTugasModulStatsStore } from "src/stores/lms/LmsTugasModulStatsStore";

import IndexCard from "./components/IndexCard.vue";

export default {
  components: {
    IndexCard
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasModulStatsStore(store);

    const page = currentRoute.query.page || 1;

    await preStore.onIndex(page);
  },
  data() {
    return {
      list_demo: [],
    };
  },
  watch: {
    get_index_data: {
      immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        // const m = [...val, ...val, ...val, ...val, ...val, ...val, ...val, ...val];
        // this.list_demo = m;
        // console.log('get_index_data', m)
      },
    },
    get_index_current_page: {
      immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        // const m = [...val, ...val, ...val, ...val, ...val, ...val, ...val, ...val];
        // this.list_demo = m;
        console.log("get_index_current_page", val);
      },
    },
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapState(useLmsTugasModulStatsStore, [
      "get_index_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      'get_init_index',
      'get_index_kelas',
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsTugasModulStatsStore, ["onIndex", "onChangePage", "getNamaKelasList"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
