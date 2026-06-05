<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm">
    <!-- {{ tab }} {{ expired }} -->


    <!-- <template v-if="get_index_data.length > 0"> -->
    <q-list v-if="
      normalizeToString(valid_filter?.kelas) || normalizeToString(valid_filter?.mapel) || normalizeToString(valid_filter?.kategori) || normalizeToString(valid_filter?.guru)
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
          <q-item-label>{{ getFilter(valid_filter?.kategori, 'list_kategori')?.nama }}</q-item-label>
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



    </q-list>


    <q-tabs v-model="tab" dense class="text-grey" :active-color="tab == 'publish' ? 'primary' : 'pink'"
      :indicator-color="tab == 'publish' ? 'primary' : 'pink'" align="justify">
      <q-tab name="publish" class="text-primary" label="Publish" />
      <q-tab name="draft" class="text-pink" label="Draft" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="publish" class="q-pa-none">
        <template v-if="get_index_data?.length > 0 && tab == 'publish'">

          <q-tabs v-model="expired_1" dense inline-label @update:model-value="expired = expired_1"
            class="bg-teal text-grey-4 shadow-2"
            active-color="white"
            indicator-color="white" align="center">
            <q-tab icon="lock_open" name="false" label="Tersedia" />
            <q-tab icon="lock" name="true" label="Tutup" />
          </q-tabs>
          <q-tab-panels v-model="expired_1" animated>
            <q-tab-panel name="false" class="q-pa-none">
              <div class="row q-gutter-y-md" v-if="expired_1 == 'false'">
                <IndexCard :get_index_data="get_index_data" :get_index_kelas="get_index_kelas"
                  route_name="lms-tugas-show">
                </IndexCard>
              </div>
            </q-tab-panel>
            <q-tab-panel name="true" class="q-pa-none">
              <div class="row q-gutter-y-md" v-if="expired_1 == 'true'">
                <IndexCard :get_index_data="get_index_data" :get_index_kelas="get_index_kelas"
                  route_name="lms-tugas-show">
                </IndexCard>
              </div>
            </q-tab-panel>
          </q-tab-panels>

        </template>
        <EmptyBlock v-else></EmptyBlock>
      </q-tab-panel>


      <q-tab-panel name="draft" class="q-pa-none">
        <template v-if="get_index_data?.length > 0 && tab == 'draft'">

          <q-tabs v-model="expired_2" dense inline-label @update:model-value="expired = expired_1"
            class="bg-teal text-grey-4 shadow-2"
            active-color="white"
            indicator-color="white" align="center">
            <q-tab icon="lock_open" name="false" label="Tersedia" />
            <q-tab icon="lock" name="true" label="Tutup" />
          </q-tabs>
          <q-tab-panels v-model="expired_2" animated>
            <q-tab-panel name="false" class="q-pa-none">
              <div class="row q-gutter-y-md" v-if="expired_2 == 'false'">
                <IndexCard :get_index_data="get_index_data" :get_index_kelas="get_index_kelas"
                  route_name="lms-tugas-show">
                </IndexCard>
              </div>
            </q-tab-panel>
            <q-tab-panel name="true" class="q-pa-none">
              <div class="row q-gutter-y-md" v-if="expired_2 == 'true'">
                <IndexCard :get_index_data="get_index_data" :get_index_kelas="get_index_kelas"
                  route_name="lms-tugas-show">
                </IndexCard>
              </div>
            </q-tab-panel>
          </q-tab-panels>

        </template>
        <EmptyBlock v-else></EmptyBlock>
      </q-tab-panel>
    </q-tab-panels>









    <!-- </template> -->

    <!-- <EmptyBlock v-else></EmptyBlock> -->

    <div style="height: 47px"></div>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <Pagination :current_page="get_index_current_page" :last_page="get_index_last_page" :disable="get_index_loading"
        @onBubbleEvent="onBubbleEvent"></Pagination>
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
      expired_1: 'false',
      expired_2: 'false',
    };
  },
  watch: {
    tab: {
      // immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        this.onIndex()
      },
    },
    expired: {
      // immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        this.onIndex()
      },
    },
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapWritableState(useLmsTugasStore, [
      "expired",
      "tab",
      "valid_filter",
      "filter",
    ]),
    ...mapState(useLmsTugasStore, [
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
    async onClear(key) {
      this['filter'][key] = []

      this.$q.loading.show()
      await this.onIndex()
      this.valid_filter = JSON.parse(JSON.stringify(this.filter))
      this.$q.loading.hide()
    },
    async onClearAll() {
      this['filter'].kelas = []
      this['filter'].mapel = []
      this['filter'].kategori = []
      this['filter'].guru = []

      console.log('onClearAll');
      this.$q.loading.show()
      await this.onIndex()
      this.valid_filter = JSON.parse(JSON.stringify(this.filter))
      this.$q.loading.hide()
    }
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
