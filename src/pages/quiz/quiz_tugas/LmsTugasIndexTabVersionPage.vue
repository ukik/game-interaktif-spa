<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm bg-white">
    <!-- {{ tab }} {{ expired }} -->

    <!-- <template v-if="get_index_data.length > 0"> -->
    <!-- <q-list v-if="
      normalizeToString(valid_filter?.kelas) ||
      normalizeToString(valid_filter?.mapel) ||
      normalizeToString(valid_filter?.kategori) ||
      normalizeToString(valid_filter?.guru)
    " bordered class="bg-white q-mb-sm q-py-sm text-capitalize">

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
    </q-banner>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      :active-color="tab == 'publish' ? 'primary' : 'pink'"
      align="justify"
    >
      <q-tab name="semua" class="text-teal" label="Semua" />
      <q-tab name="publish" class="text-primary" label="Publish" />
      <q-tab name="draft" class="text-pink" label="Draft" />
    </q-tabs>

    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="semua" class="q-pa-none">
        <template v-if="tab == 'semua'">
          <q-tabs
            v-model="expired_1"
            dense
            inline-label
            class="bg-teal text-grey-4 shadow-2"
            active-color="white"
            indicator-color="white"
            align="center"
          >
            <q-tab icon="lock_open" name="false" label="Tersedia" />
            <q-tab icon="lock" name="true" label="Selesai" />
          </q-tabs>
          <q-tab-panels v-model="expired_1" animated>
            <q-tab-panel name="false" class="q-pa-none q-py-sm">
              <div
                class="row q-col-gutter-sm"
                v-if="get_index_data?.length > 0 && expired_1 == 'false' && !get_loading"
              >
                <IndexCard
                  :get_index_data="get_index_data"
                  :get_index_kelas="get_index_kelas"
                  route_name="lms_tugas_show"
                  route_name_rank="lms_tugas_quiz_stats_show"
                >
                </IndexCard>
              </div>
              <EmptyBlock v-else></EmptyBlock>
            </q-tab-panel>
            <q-tab-panel name="true" class="q-pa-none q-py-sm">
              <div
                class="row q-col-gutter-sm"
                v-if="get_index_data?.length > 0 && expired_1 == 'true' && !get_loading"
              >
                <IndexCard
                  :get_index_data="get_index_data"
                  :get_index_kelas="get_index_kelas"
                  route_name="lms_tugas_show"
                  route_name_rank="lms_tugas_quiz_stats_show"
                >
                </IndexCard>
              </div>
              <EmptyBlock v-else></EmptyBlock>
            </q-tab-panel>
          </q-tab-panels>
        </template>
        <EmptyBlock v-else></EmptyBlock>
      </q-tab-panel>

      <q-tab-panel name="publish" class="q-pa-none">
        <template v-if="tab == 'publish'">
          <q-tabs
            v-model="expired_1"
            dense
            inline-label
            class="bg-primary text-grey-4 shadow-2"
            active-color="white"
            indicator-color="white"
            align="center"
          >
            <q-tab icon="lock_open" name="false" label="Tersedia" />
            <q-tab icon="lock" name="true" label="Selesai" />
          </q-tabs>
          <q-tab-panels v-model="expired_1" animated>
            <q-tab-panel name="false" class="q-pa-none q-py-sm">
              <div
                class="row q-col-gutter-sm"
                v-if="get_index_data?.length > 0 && expired_1 == 'false' && !get_loading"
              >
                <IndexCard
                  :get_index_data="get_index_data"
                  :get_index_kelas="get_index_kelas"
                  route_name="lms_tugas_show"
                  route_name_rank="lms_tugas_quiz_stats_show"
                >
                </IndexCard>
              </div>
              <EmptyBlock v-else></EmptyBlock>
            </q-tab-panel>
            <q-tab-panel name="true" class="q-pa-none q-py-sm">
              <div
                class="row q-col-gutter-sm"
                v-if="get_index_data?.length > 0 && expired_1 == 'true' && !get_loading"
              >
                <IndexCard
                  :get_index_data="get_index_data"
                  :get_index_kelas="get_index_kelas"
                  route_name="lms_tugas_show"
                  route_name_rank="lms_tugas_quiz_stats_show"
                >
                </IndexCard>
              </div>
              <EmptyBlock v-else></EmptyBlock>
            </q-tab-panel>
          </q-tab-panels>
        </template>
        <EmptyBlock v-else></EmptyBlock>
      </q-tab-panel>

      <q-tab-panel name="draft" class="q-pa-none">
        <template v-if="tab == 'draft'">
          <q-tabs
            v-model="expired_2"
            dense
            inline-label
            class="bg-pink text-grey-4 shadow-2"
            active-color="white"
            indicator-color="white"
            align="center"
          >
            <q-tab icon="lock_open" name="false" label="Tersedia" />
            <q-tab icon="lock" name="true" label="Selesai" />
          </q-tabs>
          <q-tab-panels v-model="expired_2" animated>
            <q-tab-panel name="false" class="q-pa-none q-py-sm">
              <div
                class="row q-col-gutter-sm"
                v-if="get_index_data?.length > 0 && expired_2 == 'false' && !get_loading"
              >
                <IndexCard
                  :get_index_data="get_index_data"
                  :get_index_kelas="get_index_kelas"
                  route_name="lms_tugas_show"
                  route_name_rank="lms_tugas_quiz_stats_show"
                >
                </IndexCard>
              </div>
              <EmptyBlock v-else></EmptyBlock>
            </q-tab-panel>
            <q-tab-panel name="true" class="q-pa-none q-py-sm">
              <div
                class="row q-col-gutter-sm"
                v-if="get_index_data?.length > 0 && expired_2 == 'true' && !get_loading"
              >
                <IndexCard
                  :get_index_data="get_index_data"
                  :get_index_kelas="get_index_kelas"
                  route_name="lms_tugas_show"
                  route_name_rank="lms_tugas_quiz_stats_show"
                >
                </IndexCard>
              </div>
              <EmptyBlock v-else></EmptyBlock>
            </q-tab-panel>
          </q-tab-panels>
        </template>
        <EmptyBlock v-else></EmptyBlock>
      </q-tab-panel>
    </q-tab-panels>

    <!-- </template> -->

    <!-- <EmptyBlock v-else></EmptyBlock> -->

    <div v-if="get_index_data?.length > 0"  style="height: 65px"></div>
    <q-page-sticky id="sticky_pagination" position="bottom" :offset="[0, 0]">
      <Pagination v-if="get_index_data?.length > 0"
        :current_page="get_index_current_page"
        :last_page="get_index_last_page"
        :disable="get_index_loading"
        @onBubbleEvent="onBubbleEvent"
      ></Pagination>
    </q-page-sticky>

    <keep-alive>
      <FilterDialog ref="FilterDialog" onAction=""></FilterDialog>
    </keep-alive>

    <q-page-scroller position="right" :scroll-offset="150" :offset="[8, 10]">
      <div>
        <q-btn
          @click="() => $refs?.FilterDialog?.onOpen(true)"
          unelevated
          round
          :color="is_ipad_lower_size ? 'primary' : 'pink'"
          size="md"
          icon="search"
        ></q-btn>
      </div>
      <div class="q-mt-sm">
        <q-btn unelevated round icon="keyboard_arrow_up" color="accent" />
      </div>
    </q-page-scroller>
  </q-page>
</template>

<script>
// import { ref } from "vue";

import { mapActions, mapState, mapWritableState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";
import IndexCard from "./components/IndexCard.vue";
import FilterDialog from "./components/FilterDialog.vue";
import { useGlobalStore } from "src/stores/lms/GlobalStore.js";

export default {
  components: {
    IndexCard,
    FilterDialog,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasStore(store);

    const page = currentRoute.query.page || 1;

    preStore.setKategoriQuiz(currentRoute.params.quiz);

    await preStore.onIndex(page);
  },
  data() {
    return {
      // list_demo: [],
      expired_1: "false",
      expired_2: "false",
    };
  },
  watch: {
    tab: {
      // immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        this.onIndex();
      },
    },
    expired_1: {
      // immediate: true, // 🔥 ini kunci
      deep: true,
      async handler(val) {
        this.expired = val;
        await this.$nextTick();
        this.onIndex();
      },
    },
    expired_2: {
      // immediate: true, // 🔥 ini kunci
      deep: true,
      async handler(val) {
        this.expired = val;
        await this.$nextTick();
        this.onIndex();
      },
    },
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapWritableState(useLmsTugasStore, ["expired", "tab", "valid_filter", "filter"]),
    ...mapState(useLmsTugasStore, [
      "get_index_data",
      "get_index_current_page",
      "get_index_last_page",
      "get_index_loading",
      "get_init_index",
      "get_index_kelas",
      "get_loading",
    ]),
  },
  methods: {
    ...mapActions(useGlobalStore, ["getFilter", "getFilterKelas"]),
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsTugasStore, ["onIndex", "onChangePage"]),
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
