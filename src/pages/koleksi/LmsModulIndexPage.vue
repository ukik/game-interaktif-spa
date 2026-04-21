<template>
  <InitLoading v-if="get_init_index"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">

    <template v-if="get_index_data.length > 0">
      <div class="row q-gutter-y-md">
        <q-card class="col-12" v-for="(item, index) in get_index_data" :key="index" flat bordered>

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-img class="rounded-borders" :src="item?.user?.url_image"
                  @error="item.user.url_image = global_url_image" error-src="global_url_image" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">{{ item?.user?.name }}</q-item-label>
              <q-item-label caption>{{ item?.created_at_date }} </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-badge class="q-pa-sm" :color="item?.status == 'draft' ? 'red' : 'green'" :label="item?.status" />
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs col">
              <div class="text-overline">{{ item?.mapel?.nama }}</div>
              <div class="text-h6 text-capitalize q-mb-xs">{{ item?.kategori }} </div>
              <q-item-label lines="2" class="text-captionX text-grey-7">
                {{ item?.judul }}
              </q-item-label>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center justify-end">
              <q-img :height="is_mobile_size ? '' : '140px'" class="rounded-borders" :src="item?.user?.url_image" @error="item.url_image = global_url_image"
                error-src="global_url_image" />
            </q-card-section>
          </q-card-section>

          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label lines="2" caption class="text-grey-7">
                {{ !item?.topik ? '_ _ _' : item?.topik  }}
              </q-item-label>
              <q-item-label caption>{{ !item?.kelas ? '_ _ _' : getNamaKelasList(get_index_kelas, item?.kelas) }} </q-item-label>
            </q-item-section>

          </q-item>

          <q-separator />

          <q-card-actions align="between">
            <q-btn :to="{ name: 'lms-modul-show', params: { slug: item?.id } }" outline icon="visibility" color="primary"
              label="Detail"></q-btn>
            <q-btn outline icon="play_circle" color="pink" label="Play"></q-btn>
            <!-- <q-chip square icon="school">{{ item?.kelas?.nama }}</q-chip> -->
            <!-- <q-btn flat round icon="event" /> -->
            <!-- <q-btn flat> 7:30PM </q-btn> -->
          </q-card-actions>
        </q-card>
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
import { useLmsBankModulStore } from "src/stores/lms/LmsBankModulStore";

export default {
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsBankModulStore(store);

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
    ...mapState(useLmsBankModulStore, [
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
    ...mapActions(useLmsBankModulStore, ["onIndex", "onChangePage", "getNamaKelasList"]),
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
