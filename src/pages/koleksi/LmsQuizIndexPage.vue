<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm">
    <template v-if="get_index_data.length > 0">
      <div class="row q-gutter-y-md">
        <IndexCard
          @onBuat="onOpenDialog"
          route_play="quiz_intro_public"
          :get_index_data="get_index_data"
          :get_index_kelas="get_index_kelas"
          route_name="lms_quiz_show"
        ></IndexCard>
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

    <q-page-sticky :position="is_ipad_lower_size ? 'bottom-right' : 'top-right'"
      :offset="is_ipad_lower_size ? [10, 0] : [10, 10]">
      <!-- <q-fab icon="search" direction="up" color="accent"></q-fab> -->
      <q-btn @click="() => $refs?.FilterDialog?.onOpen(true)" unelevated round
        :color="is_ipad_lower_size ? 'primary' : 'pink'" size="md" icon="search"></q-btn>
    </q-page-sticky>

    <keep-alive>
      <FilterDialog ref="FilterDialog" onAction=""></FilterDialog>
    </keep-alive>

  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore";

import IndexCard from "./components/IndexCard.vue";
import FilterDialog from "./components/FilterDialog.vue";
import FormCreateTugas from "./components/FormCreateTugas.vue";

export default {
  components: {
    IndexCard,
    FormCreateTugas,
    FilterDialog,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsBankQuizStore(store);

    const page = currentRoute.query.page || 1;

    preStore.setKategori(currentRoute.params.quiz)

    await preStore.onIndex(page);
  },
  data() {
    return {
      list_demo: [],
    };
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapState(useLmsBankQuizStore, [
      "get_index_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      "get_init_index",
      "get_index_kelas",
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsBankQuizStore, ["onIndex", "onChangePage"]),
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
