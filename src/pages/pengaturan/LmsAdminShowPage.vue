<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm bg-white">
    <q-card flat bordered>
      <!-- <q-card-actions align="left">
        <div class="text-h6">PROFIL</div>
      </q-card-actions> -->

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="admin" label="admin" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="admin" class="q-pa-none">
          <template v-if="get_show_payload?.id">
            <!-- <q-card-actions align="center" class="q-py-sm">
              <q-parallax :height="is_mobile_size ? 250 : 450">
                <q-img class="img_blur"
                  position="50% 0%"
                  :src="get_show_payload?.url_image"
                  @error="get_show_payload.url_image = global_url_image"
                  :error-src="global_url_image"
                />
              </q-parallax>

              <q-avatar class="absolute" size="240px">
                <q-img class="bg-black"
                  :src="get_show_payload?.url_image"
                  @error="get_show_payload.url_image = global_url_image"
                  :error-src="global_url_image"
                />
              </q-avatar>
            </q-card-actions> -->

            <q-card-actions align="center" class="q-py-md">
              <!-- <q-parallax :height="250"> -->
              <q-avatar size="240px">
                <q-img class="bg-black"
                  :src="get_show_payload?.url_image"
                  @error="get_show_payload.url_image = global_url_image"
                  :error-src="global_url_image"
                />
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
                      get_show_payload?.name
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
                    <q-item-label lines="1" caption>Role</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-dark text-capitalize">{{
                      get_show_payload?.role
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

    <template v-if="enabled && get_show_payload?.id">
      <div style="height: 40px"></div>

      <FormDialog ref="FormDialog"></FormDialog>

      <q-page-sticky position="bottom" :offset="[0, 10]">
        <q-btn
          @click="onOpenDialog"
          unelevated
          rounded
          label="edit"
          color="pink"
          size="md"
          icon="edit"
        ></q-btn>
      </q-page-sticky>
    </template>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsAdminStore } from "src/stores/lms/LmsAdminStore";
import FormDialog from "./forms/admin/FormDialog.vue";

export default {
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsAdminStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "admin",
    };
  },
  components: {
    FormDialog,
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
    ...mapState(useLmsAdminStore, ["get_show_payload", "get_init_show"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsAdminStore, ["onShow", "onChangePage"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    onOpenDialog(payload) {
      this.$refs.FormDialog?.onOpen(payload?.id);
    },
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
