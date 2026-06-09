<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-md">
    <q-card flat bordered>
      <!-- <q-card-actions align="left">
        <div class="text-h6">PROFIL</div>
      </q-card-actions> -->

      <!-- <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
        <q-tab name="tab1" label="TUGAS" />
      </q-tabs>

      <q-separator /> -->

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tab1" class="q-pa-none">
          <template v-if="get_show_payload?.id">

            <q-banner dense class="bg-primary text-white">
              <div class="q-mb-md">
                Terimakasih sudah membuka notifikasi tugas. Silahkan dikerjakan sebelum waktu habis.
              </div>
              <template v-slot:action>
                <q-btn color="white" :to="{
                  name: 'lms_tugas_show',
                  params: {
                    slug: get_show_payload?.data?.tugas?.id
                  }
                }" outline label="Detail Tugas" icon="description" />
              </template>
            </q-banner>

            <q-card-section class="q-pa-sm">
              <q-list separator bordered class="text-dark">

                <ListItemTopDown label="ID" :value="get_show_payload?.id"></ListItemTopDown>
                <ListItemTopDown label="Tipe" :value="get_show_payload?.type"></ListItemTopDown>
                <!-- <ListItemTopDown label="User" :value="get_show_payload?.data?.tugas?.teacher?.name ?? '-'"></ListItemTopDown> -->
                <ListItemTopDown label="Title" :value="get_show_payload?.data?.judul ?? '-'"></ListItemTopDown>
                <ListItemTopDown label="Message" :value="nl2br(get_show_payload?.data?.message ?? '-')">
                </ListItemTopDown>
                <ListItemTopDown label="Tugas ID" :value="get_show_payload?.data?.tugas?.id ?? '-'"></ListItemTopDown>
                <!-- <ListItemTopDown label="Mapel" :value="get_show_payload?.data?.tugas?.mapel?.nama ?? '-'"></ListItemTopDown> -->
                <ListItemTopDown label="Model" :value="getJenis(get_show_payload?.data?.tugas?.tugasable_type) ?? '-'">
                </ListItemTopDown>
                <ListItemTopDown label="Status" :value="get_show_payload?.read_at">
                  <q-badge :color="get_show_payload?.read_at ? 'positive' : 'warning'">
                    {{ get_show_payload?.read_at ? 'Sudah Dibaca' : 'Belum Dibaca' }}
                  </q-badge>
                </ListItemTopDown>
                <ListItemTopDown label="Dibaca Pada" :value="get_show_payload?.read_at ?? '-'"></ListItemTopDown>
                <ListItemTopDown label="Dibuat Pada" :value="get_show_payload?.created_at"></ListItemTopDown>
                <ListItemTopDown label="Diupdate Pada" :value="get_show_payload?.updated_at"></ListItemTopDown>


              </q-list>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-actions align="center">
              <q-btn unelevated @click="onConfirmDialog" color="negative" icon="mail" label="Hapus" />
            </q-card-actions>

          </template>

          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <ConfirmDialog ref="ConfirmDialog" :actionDelete="onDelete"></ConfirmDialog>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useLmsNotificationQuizHasilStore } from "src/stores/lms/LmsNotificationQuizHasilStore";
import ListItemTopDown from "./components/ListItemTopDown.vue";
import ConfirmDialog from "./components/ConfirmDialog.vue";

export default {
  components: {
    ListItemTopDown,
    ConfirmDialog,
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsNotificationQuizHasilStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "tab1",
    };
  },
  computed: {
    ...mapState(useLmsNotificationQuizHasilStore, ["get_show_payload", "get_init_show"]),
  },
  methods: {
    ...mapActions(useLmsNotificationQuizHasilStore, ["onShow", "onDelete"]),
    onConfirmDialog() {
      this.$refs.ConfirmDialog.onOpen(true)
    },
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
