<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">
    <q-card flat bordered>
      <!-- <q-card-actions align="left">
        <div class="text-h6">PROFIL</div>
      </q-card-actions> -->

      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
        <q-tab name="school" label="SEKOLAH" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="school" class="q-pa-none">
          <template v-if="get_show_payload?.id">
            <q-card-actions align="center" class="q-py-md">
              <!-- <q-parallax :height="250"> -->
              <q-avatar size="240px">
                <q-img :src="get_show_payload?.url_image" @error="get_show_payload.url_image = global_url_image"
                  error-src="global_url_image" />
              </q-avatar>
              <!-- <div class="col-12 text-center">
                <q-chip class="q-mt-md" color="primary" text-color="white">ID: {{ get_show_payload?.id }}</q-chip>
              </div> -->
              <!-- </q-parallax> -->
            </q-card-actions>
            <q-separator></q-separator>
            <q-card-section class="q-pa-sm">
              <q-list separator bordered class="text-dark">
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>ID</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.id
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Nama</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.nama
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Email</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.email
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Telpon</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.telpon
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Whatsapp</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.whatsapp
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>NPSN</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.npsn
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Jenjang</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.jenjang
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Provinsi</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark text-capitalize">{{
                      get_show_payload?.provinsi
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Kota</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark text-capitalize">{{
                      get_show_payload?.kota
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Kecamatan</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark text-capitalize">{{
                      get_show_payload?.kecamatan
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Kode Pos</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark text-capitalize">{{
                      get_show_payload?.kode_pos
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-item-label lines="1" caption>Alamat</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-dark text-right">{{
                      get_show_payload?.alamat
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label lines="1" caption>Dibuat</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      get_show_payload?.created_at_human
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </template>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsSekolahStore } from "src/stores/lms/LmsSekolahStore";

export default {
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsSekolahStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "school",
    };
  },
  watch: {
    get_show_payload: {
      immediate: true, // 🔥 ini kunci
      deep: true,
      handler(val) {
        // const m = [...val, ...val, ...val, ...val, ...val, ...val, ...val, ...val];
        // this.list_demo = m;
        // console.log('get_index_data', m)
      },
    },
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    ...mapState(useLmsSekolahStore, ["get_show_payload", "get_init_show"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsSekolahStore, ["onShow", "onChangePage"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
  },
  async mounted() {
    await this.$nextTick();
    this.$glightbox?.init();
  },
};
</script>
