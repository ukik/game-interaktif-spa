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

          <q-card-actions class="q-px-md text-caption">
            <!-- <q-item-label caption>ID: {{  }} / Tugas ID: {{ item?.tugasable_id }}</q-item-label> -->
            <q-item-label lines="1" caption class="text-capitalize">
              <q-badge color="cyan" class="q-pa-xs q-mr-sm" :label="'ID: ' + item?.id" />
              <q-badge color="cyan" class="q-pa-xs q-mr-sm" :label="'ID tugas: ' + item?.tugasable_id" />
              <q-badge color="cyan" class="q-pa-xs q-mr-sm" :label="'priority: ' + item?.priority" />
              <!-- <q-badge color="teal" class="q-pa-xs" :label="'visibility: '+item?.visibility" /> -->
            </q-item-label>
          </q-card-actions>

          <q-separator></q-separator>
          <q-card-actions class="q-pa-none">
            <q-item class="col-6">
              <q-item-section avatar top>
                <q-avatar icon="access_alarm" color="blue" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Jadwal Mulai</q-item-label>
                <q-item-label caption>{{ item?.begin_date }}</q-item-label>
              </q-item-section>

              <!-- <q-item-section side>
                <q-icon name="info" color="green" />
              </q-item-section> -->
            </q-item>
            <q-separator vertical></q-separator>
            <q-item>
              <q-item-section avatar top>
                <q-avatar icon="access_alarm" color="blue" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Jadwal Selesai</q-item-label>
                <q-item-label caption>{{ item?.end_date }}</q-item-label>
              </q-item-section>

              <!-- <q-item-section side>
                <q-icon name="info" color="green" />
              </q-item-section> -->
            </q-item>
          </q-card-actions>
          <q-separator></q-separator>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs col">
              <div class="text-overline">{{ item?.mapel?.nama }}</div>
              <div class="text-h6 text-capitalize q-mb-xs">{{ item?.tugasable?.kategori }} </div>
              <q-item-label :lines="is_mobile_size ? 1 : 2" class="text-captionX text-grey-7">
                {{ item?.judul }}
              </q-item-label>
              <q-item-label lines="2" class="text-grey-7" caption>
                {{ item?.tugasable?.judul }}
              </q-item-label>
            </q-card-section>

            <q-card-section class="col-4 flex flex-center justify-end">
              <q-img :height="is_mobile_size ? '' : '140px'" class="rounded-borders" :src="item?.url_image"
                @error="item.url_image = global_url_image" error-src="global_url_image" />
            </q-card-section>
          </q-card-section>

          <q-separator />
          <!-- <q-item>
            <q-item-section>
              <q-item-label lines="2" caption class="text-grey-7">
                {{ !item?.tugasable?.topik ? '_ _ _' : item?.tugasable?.topik }}
              </q-item-label>
              <q-item-label caption>{{ !item?.tugasable?.subtopik ? '_ _ _' : item?.tugasable?.subtopik }}
              </q-item-label>
            </q-item-section>
          </q-item> -->
          <q-card-actions class="q-pa-none">
            <template v-for="(item_0, index) in item?.tugas_modul_hasil">
              <q-card flat class="col-4 q-pt-sm q-pb-xs">
                <q-card-actions align="center">
                  <q-avatar size="75px">
                    <q-img fit="fill" :src="item_0?.siswa?.url_image" @error="item_0.siswa.url_image = global_url_image"
                      error-src="global_url_image" />
                    <q-badge color="orange" class="badge-left round q-pa-sm flex flex-center text-body2"
                      style="width:30px; height:30px; " floating>
                      <q-icon name="fa-brands fa-web-awesome"></q-icon>
                    </q-badge>
                  </q-avatar>
                  <q-item-label class="q-mt-sm" lines="1" caption>{{ item_0?.siswa?.name }} </q-item-label>
                  <q-item-label class="q-mt-sm full-width text-center text-bold text-teal" lines="1">Rank {{
                    Number(index + 1) }} </q-item-label>
                </q-card-actions>
              </q-card>
              <q-separator vertical />
            </template>
          </q-card-actions>
          <q-separator />

          <q-card-actions class="q-py-none" align="between">

            <q-item class="col-auto q-pl-sm" :class="[ item?.status_durasi?.status == 'selesai' ? 'text-red' : 'text-positive' ]">
              <q-item-section avatar top>
                <q-avatar :icon="item?.status_durasi?.status == 'selesai' ? 'lock' : 'task_alt'" :color="item?.status_durasi?.status == 'selesai' ? 'red' : 'positive'" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1" class="text-uppercase text-bold">{{item?.status_durasi?.status}}</q-item-label>
                <q-item-label class="text-caption">{{item?.status_durasi?.text}}</q-item-label>
              </q-item-section>

            </q-item>
            <q-separator vertical></q-separator>
            <div>
            <q-btn :to="{ name: 'lms-tugas-modul-stats-show', params: { slug: item?.id } }"  icon="visibility"
              color="primary" label="Detail"></q-btn>

            <q-btn v-if="item?.status_durasi?.status == 'selesai'" class="q-ml-sm" icon="play_circle" color="pink" label="Play"></q-btn>
            </div>
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
import { useLmsTugasModulStatsStore } from "src/stores/lms/LmsTugasModulStatsStore";

export default {
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
