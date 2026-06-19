<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm bg-white">
    <!-- <q-list v-if="
      normalizeToString(valid_filter?.kelas) ||
      normalizeToString(valid_filter?.mapel) ||
      normalizeToString(valid_filter?.kategori) ||
      normalizeToString(valid_filter?.guru)
    " bordered class="bg-white q-mb-sm q-py-sm text-capitalize">

      <q-item dense class="q-py-none" v-if="normalizeToString(valid_filter?.kelas)">
        <q-item-section>
          <q-item-label caption>Kelas</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ getFilterKelas(valid_filter?.kelas) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn @click="() => onClear('kelas')" dense round flat icon="close"></q-btn>
        </q-item-section>
      </q-item>
      <q-item dense class="q-py-none" v-if="normalizeToString(valid_filter?.mapel)">
        <q-item-section>
          <q-item-label caption>Mapel</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ getFilter(valid_filter?.mapel, 'list_mapel')?.nama }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn @click="() => onClear('mapel')"  dense round flat icon="close"></q-btn>
        </q-item-section>
      </q-item>
      <q-item dense class="q-py-none" v-if="normalizeToString(valid_filter?.kategori)">
        <q-item-section>
          <q-item-label caption>Kategori</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ getFilter(valid_filter?.kategori, 'list_kategori_tugas')?.nama }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn @click="() => onClear('kategori')"  dense round flat icon="close"></q-btn>
        </q-item-section>
      </q-item>
      <q-item dense class="q-py-none" v-if="normalizeToString(valid_filter?.guru)">
        <q-item-section>
          <q-item-label caption>Guru</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ getFilter(valid_filter?.guru, 'list_guru')?.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn @click="() => onClear('guru')"  dense round flat icon="close"></q-btn>
        </q-item-section>
      </q-item>

      <q-separator></q-separator>

      <q-item dense class="q-py-none q-pt-sm">
        <q-item-section class="text-center">
          <q-item-label>
          <q-btn @click="onClearAll" unelevated dense class="q-px-md"  color="red" label="Clear" icon="delete"></q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list> -->

    <q-banner dense class="bg-grey-1 q-mb-sm rounded-borders q-card--bordered">
      <!-- <div class="text-primary text-bold q-mb-sm">FILTER</div> -->
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
        @remove="() => onClear('kategori')"
        v-if="normalizeToString(valid_filter?.kategori)"
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="kategori"
      ></q-chip>
      <!-- <q-chip removable class="text-capitalize" color="teal" text-color="white" label="kategori_quiz"></q-chip> -->
      <q-chip
        @remove="() => onClear('guru')"
        v-if="normalizeToString(valid_filter?.guru)"
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="guru"
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

      <!-- <template v-slot:action>
        <div class="row">
          <q-btn
            @click="() => $refs?.FilterDialog?.onOpen(true)"
            unelevated
            round
            dense
            outline
            class="q-px-md"
            color="primary"
            icon="search"
          ></q-btn>
          <div style="width: 5px" />
        </div>
      </template> -->
    </q-banner>

    <template v-if="get_index_data.length > 0">
      <div class="row q-gutter-y-md">
        <IndexCard
          :get_index_data="get_index_data"
          :get_index_kelas="get_index_kelas"
          route_name="lms_tugas_quiz_stats_show"
          leaderboard_key="tugas_quiz_hasil"
        ></IndexCard>
      </div>
    </template>

    <EmptyBlock v-else></EmptyBlock>

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
      :position="is_ipad_lower_size ? 'bottom-right' : 'right'" v-if="is_ipad_lower_size"
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
import { ref } from "vue";

import { mapActions, mapState, mapWritableState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsTugasQuizLogStore } from "src/stores/lms/LmsTugasQuizLogStore";

import IndexCard from "./components/IndexCard.vue";
import FilterDialog from "./components/FilterDialog.vue";
import { useGlobalStore } from "src/stores/lms/GlobalStore.js";

export default {
  components: {
    IndexCard,
    FilterDialog,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasQuizLogStore(store);

    const page = currentRoute.query.page || 1;

    preStore.setKategoriQuiz(currentRoute.params.quiz);

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
    ...mapWritableState(useLmsTugasQuizLogStore, ["tab", "valid_filter", "filter"]),
    ...mapState(useLmsTugasQuizLogStore, [
      "get_index_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      "get_init_index",
      "get_index_kelas",
    ]),
  },
  methods: {
    ...mapActions(useGlobalStore, ["getFilter", "getFilterKelas"]),
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsTugasQuizLogStore, [
      "onIndex",
      "onChangePage",
      "getNamaKelasList",
    ]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    async onClear(key) {
      this["filter"][key] = [];

      // this.$q.loading.show()
      this.valid_filter = JSON.parse(JSON.stringify(this.filter));
      await this.onIndex();
      // this.$q.loading.hide()
    },
    // async onClearAll() {
    //   this['filter'].kelas = []
    //   this['filter'].mapel = []
    //   this['filter'].kategori = []
    //   this['filter'].guru = []

    //   console.log('onClearAll');
    //   // this.$q.loading.show()
    //   this.valid_filter = JSON.parse(JSON.stringify(this.filter))
    //   await this.onIndex()
    //   // this.$q.loading.hide()
    // }
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
