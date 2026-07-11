<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm q-pb-sm bg-white">
    <q-banner dense class="bg-grey-1 q-mb-sm rounded-borders q-card--bordered">
      <q-chip
        @remove="() => onClear('kelas')"
        v-if="normalizeToString(valid_filter?.kelas)"
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="kelas"
      ></q-chip>
      <q-chip
        @remove="() => onClear('mapel')"
        v-if="normalizeToString(valid_filter?.mapel)"
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="mapel"
      ></q-chip>

      <q-chip
        @click="() => $refs?.FilterDialog?.onOpen(true)"
        unelevated
        rounded
        clickable
        outline
        label="Filter"
        color="primary"
        icon="search"
      ></q-chip>
    </q-banner>

    <template v-if="get_index_data.length > 0">
      <!-- <div class="row q-gutter-y-md">
        <IndexCard
          @onBuat="onOpenDialog"
          route_play="quiz_intro_public"
          :get_index_data="get_index_data"
          :get_index_kelas="get_index_kelas"
          route_name="lms_quiz_show"
        ></IndexCard>
      </div> -->
      <div v-if="is_ipad_lower_size" class="row q-col-gutter-sm">
        <IndexBCard
          @onBuat="onOpenDialog"
          route_play="quiz_intro_public"
          :get_index_data="get_index_data"
          :get_index_kelas="get_data_global_list_kelas"
          route_name="lms_quiz_show"
        ></IndexBCard>
      </div>
      <div v-else class="row q-col-gutter-sm">
        <IndexACard
          @onBuat="onOpenDialog"
          route_play="quiz_intro_public"
          :get_index_data="get_index_data"
          :get_index_kelas="get_data_global_list_kelas"
          route_name="lms_quiz_show"
        ></IndexACard>
      </div>

    </template>

    <EmptyBlock v-else></EmptyBlock>

    <FormCreateTugas ref="FormCreateTugas" model="LmsQuiz"></FormCreateTugas>

    <div style="height: 47px"></div>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <Pagination
        :current_page="get_index_current_page"
        :last_page="get_index_last_page"
        :disable="get_index_loading"
        @onBubbleEvent="onBubbleEvent"
      ></Pagination>
    </q-page-sticky>

    <q-page-sticky
      :position="is_ipad_lower_size ? 'bottom-right' : 'right'"
      v-if="is_ipad_lower_size"
      :offset="is_ipad_lower_size ? [10, 0] : [10, 10]"
    >
      <!-- <q-fab icon="search" direction="up" color="accent"></q-fab> -->
      <q-btn
        @click="() => $refs?.FilterDialog?.onOpen(true)"
        unelevated
        round
        :color="is_ipad_lower_size ? 'primary' : 'pink'"
        size="md"
        icon="search"
      ></q-btn>
    </q-page-sticky>

    <keep-alive>
      <FilterDialog ref="FilterDialog" onAction=""></FilterDialog>
    </keep-alive>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore";

import IndexCard from "./components/IndexCard.vue";
import IndexACard from "./components/IndexACard.vue";
import IndexBCard from "./components/IndexBCard.vue";
import FilterDialog from "./components/FilterDialog.vue";
import FormCreateTugas from "./components/FormCreateTugas.vue";
import { useGlobalStore } from "src/stores/lms/GlobalStore.js";

export default {
  components: {
    IndexCard,
    IndexACard,
    IndexBCard,
    FormCreateTugas,
    FilterDialog,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsBankQuizStore(store);

    const page = currentRoute.query.page || 1;

    preStore.setKategori(currentRoute.params.quiz);

    await preStore.onIndex(page);
  },
  data() {
    return {
      list_demo: [],
    };
  },
  computed: {
    ...mapState(useGlobalStore, ["get_data_global_list_kelas"]),
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapWritableState(useLmsBankQuizStore, ["valid_filter", "filter"]),
    ...mapState(useLmsBankQuizStore, [
      "get_index_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      "get_init_index",
      // "get_index_kelas",
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsBankQuizStore, ["onIndex", "onChangePage"]),
    async onClear(key) {
      this["filter"][key] = [];

      // this.$q.loading.show()
      this.valid_filter = JSON.parse(JSON.stringify(this.filter));
      await this.onIndex();
      // this.$q.loading.hide()
    },
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    onOpenDialog(payload) {
      this.$refs.FormCreateTugas?.onOpen(payload);
    },
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
