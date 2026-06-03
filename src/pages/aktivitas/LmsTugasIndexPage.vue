<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm">

    <template v-if="get_index_data.length > 0">
      <q-list v-if="
        valid_filter?.kelas?.length > 0 || valid_filter?.mapel?.length > 0 || valid_filter?.kategori?.length > 0 || valid_filter?.guru?.length > 0
      " bordered class="bg-white q-mb-sm q-py-sm text-capitalize">

        <q-item dense v-if="valid_filter?.kelas?.length > 0">
          <q-item-section>
            <q-item-label caption>Kelas</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{ getFilterKelas(valid_filter?.kelas) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item dense v-if="normalizeToString(valid_filter?.mapel)">
          <q-item-section>
            <q-item-label caption>Mapel</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{ getFilter(valid_filter?.mapel, 'list_mapel')?.nama }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item dense v-if="normalizeToString(valid_filter?.kategori)">
          <q-item-section>
            <q-item-label caption>Kategori</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{ getFilter(valid_filter?.kategori, 'list_kategori')?.nama }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item dense v-if="normalizeToString(valid_filter?.guru)">
          <q-item-section>
            <q-item-label caption>Guru</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{ getFilter(valid_filter?.guru, 'list_guru')?.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="row q-gutter-y-md">
        <IndexCard :get_index_data="get_index_data" :get_index_kelas="get_index_kelas" route_name="lms-tugas-show">
        </IndexCard>
      </div>
    </template>

    <EmptyBlock v-else></EmptyBlock>

    <div style="height: 47px"></div>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <Pagination :current_page="get_index_current_page" :last_page="get_index_last_page" :disable="get_index_loading"
        @onBubbleEvent="onBubbleEvent"></Pagination>
    </q-page-sticky>

    <q-page-sticky :position="is_ipad_lower_size ? 'bottom-right' : 'top-right'"
      :offset="is_ipad_lower_size ? [10, 0] : [10, 10]">
      <!-- <q-fab icon="search" direction="up" color="accent"></q-fab> -->
      <q-btn @click="() => $refs?.FilterDialog?.onOpen(true)" unelevated round
        :color="is_ipad_lower_size ? 'primary' : 'orange'" size="md" icon="search"></q-btn>
    </q-page-sticky>

    <keep-alive>
      <FilterDialog ref="FilterDialog" onAction=""></FilterDialog>
    </keep-alive>

  </q-page>
</template>

<script>
// import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";
import IndexCard from "./components/IndexCard.vue";
import FilterDialog from "./components/FilterDialog.vue";
import { useGlobalStore } from "src/stores/lms/GlobalStore.js";

export default {
  components: {
    IndexCard,
    FilterDialog
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasStore(store);

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
    ...mapState(useLmsTugasStore, [
      "valid_filter",
      "get_index_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      'get_init_index',
      'get_index_kelas',
    ]),
  },
  methods: {
    ...mapActions(useGlobalStore, [
      'getFilter',
      'getFilterKelas',
    ]),
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsTugasStore, ["onIndex", "onChangePage"]),
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
