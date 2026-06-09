<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm">
    <!-- <q-list
      v-if="
        normalizeToString(valid_filter?.kelas) ||
        normalizeToString(valid_filter?.mapel) ||
        normalizeToString(valid_filter?.kategori) ||
        normalizeToString(valid_filter?.guru)
      "
      bordered
      class="bg-white q-mb-sm q-py-sm text-capitalize"
    >
      <q-item dense class="q-py-none" v-if="valid_filter?.kelas?.length > 0">
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
          <q-item-label>{{
            getFilter(valid_filter?.mapel, "list_mapel")?.nama
          }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn @click="() => onClear('mapel')" dense round flat icon="close"></q-btn>
        </q-item-section>
      </q-item>
      <q-item dense class="q-py-none" v-if="normalizeToString(valid_filter?.kategori)">
        <q-item-section>
          <q-item-label caption>Kategori</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{
            getFilter(valid_filter?.kategori, "list_kategori_tugas")?.nama
          }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn @click="() => onClear('kategori')" dense round flat icon="close"></q-btn>
        </q-item-section>
      </q-item>
      <q-item dense class="q-py-none" v-if="normalizeToString(valid_filter?.guru)">
        <q-item-section>
          <q-item-label caption>Guru</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{
            getFilter(valid_filter?.guru, "list_guru")?.name
          }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn @click="() => onClear('guru')" dense round flat icon="close"></q-btn>
        </q-item-section>
      </q-item>

      <q-separator></q-separator>

      <q-item dense class="q-py-none q-pt-sm">
        <q-item-section class="text-center">
          <q-item-label>
            <q-btn
              @click="onClearAll"
              unelevated
              dense
              outline
              class="q-px-md"
              color="red"
              label="Clear"
              icon="delete"
            ></q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list> -->



    <q-banner dense class="bg-grey-1 text-white q-mb-sm">
      <q-chip
        @remove="() => onClear('durasi')"
        v-if="normalizeToString(valid_filter?.durasi)"
        icon="done"
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="durasi"
      ></q-chip>

      <q-chip
        @remove="() => onClear('year')"
        v-if="normalizeToString(valid_filter?.year)"
        icon="done"
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="tahun"
      ></q-chip>

      <q-chip
        @remove="() => onClear('sort')"
        v-if="normalizeToString(valid_filter?.sort)"
        icon="done"
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="urutan"
      ></q-chip>

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
        @remove="() => onClear('siswa')"
        v-if="normalizeToString(valid_filter?.siswa)"
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="siswa"
      ></q-chip>


      <q-chip
        @remove="() => onClear('day')"
        v-if="normalizeToString(valid_filter?.day) && valid_filter?.durasi == 'day'"
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="hari"
      ></q-chip>
      <q-chip
        @remove="() => onClear('week')"
        v-if="normalizeToString(valid_filter?.week) && valid_filter?.durasi == 'week'"
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="mingguan"
      ></q-chip>
      <q-chip
        @remove="() => onClear('month')"
        v-if="normalizeToString(valid_filter?.month) && valid_filter?.durasi == 'month'"
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="bulanan"
      ></q-chip>
      <q-chip
        @remove="() => onClear('triwulan')"
        v-if="
          normalizeToString(valid_filter?.triwulan) && valid_filter?.durasi == 'triwulan'
        "
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="triwulan"
      ></q-chip>
      <q-chip
        @remove="() => onClear('caturwulan')"
        v-if="
          normalizeToString(valid_filter?.caturwulan) &&
          valid_filter?.durasi == 'caturwulan'
        "
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="caturwulan"
      ></q-chip>
      <q-chip
        @remove="() => onClear('semester')"
        v-if="
          normalizeToString(valid_filter?.semester) && valid_filter?.durasi == 'semester'
        "
        removable
        class="text-capitalize"
        color="teal"
        text-color="white"
        label="semester"
      ></q-chip>
      <template v-slot:action>
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
          <!-- <q-btn
            round
            @click="onClearAll"
            unelevated
            dense
            outline
            class="q-px-md"
            color="red"
            icon="delete"
          ></q-btn> -->
        </div>
      </template>
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
      :position="is_ipad_lower_size ? 'bottom-right' : 'top-right'"
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
import { useLmsTugasQuizStatsStore } from "src/stores/lms/LmsTugasQuizStatsStore";

import IndexCard from "./components/IndexCard.vue";
import FilterDialog from "./components/FilterDialog.vue";
import { useGlobalStore } from "src/stores/lms/GlobalStore.js";

export default {
  components: {
    IndexCard,
    FilterDialog,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasQuizStatsStore(store);

    const page = currentRoute.query.page || 1;

    preStore.setKategoriQuiz(currentRoute.params.quiz);

    await preStore.onIndex(page);
  },
  data() {
    return {
      list_demo: [],
    };
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapWritableState(useLmsTugasQuizStatsStore, [
      "tab",
      "valid_filter",
      "filter",
    ]),
    ...mapState(useLmsTugasQuizStatsStore, [
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
    ...mapActions(useLmsTugasQuizStatsStore, [
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
    //   this["filter"].kelas = [];
    //   this["filter"].mapel = [];
    //   this["filter"].kategori = [];
    //   this["filter"].guru = [];

    //   console.log("onClearAll");
    //   // this.$q.loading.show()
    //   this.valid_filter = JSON.parse(JSON.stringify(this.filter));
    //   await this.onIndex();
    //   // this.$q.loading.hide()
    // },
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
