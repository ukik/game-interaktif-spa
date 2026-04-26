<template>
  <InitLoading v-if="get_init_show"></InitLoading>
  <q-page v-else class="justify-start items-start q-pa-sm">
    <q-card flat bordered>
      <q-tabs :key="tab"  v-model="tab" dense class="text-grey"
        active-color="primary" indicator-color="primary" align="justify">
        <q-tab :key="1" name="tab1" label="Tugas" />
        <q-tab :key="2" name="tab2" :label="get_show_payload?.model" />
        <q-tab :key="3" name="tab3" label="Peserta" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tab1" class="q-pa-none">
          <ShowTabTugasCard v-if="get_show_payload?.id" :get_show_payload="get_show_payload"
            :get_show_kelas="get_show_kelas"></ShowTabTugasCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab2" class="q-pa-none">
          <ShowTabAktivitasCard v-if="get_show_payload?.tugasable?.id" :get_show_payload="get_show_payload?.tugasable"
            :mapel="get_show_payload?.mapel" :get_show_kelas="get_show_kelas"></ShowTabAktivitasCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
        <q-tab-panel name="tab3" class="q-pa-none">
          <ShowTabPesertaCard v-if="get_show_payload?.tugas_siswa.length > 0"
            :get_show_payload="get_show_payload?.tugas_siswa"></ShowTabPesertaCard>
          <EmptyBlock v-else></EmptyBlock>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div style="height: 50px"></div>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <q-card-actions align="center" class="q-pa-none" :style="`width: ${getPageWidth()}px`">
        <q-item @click="onOpenDialog" class="col-6 text-white" :class="[is_selesai ? 'bg-red' : 'bg-primary', is_hasil ? '' : '']" clickable v-ripple>
          <q-item-section avatar>
            <q-icon text-color="white" name="edit_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Edit Tugas</q-item-label>
          </q-item-section>
        </q-item>
        <q-item @click="gotoHasil" class="col text-white" :class="[is_hasil ? 'bg-teal' : 'bg-red']" clickable v-ripple>
          <q-item-section avatar>
            <q-icon text-color="white" name="task" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Hasil Tugas</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>
    </q-page-sticky>

    <FormEditTugas ref="FormEditTugas"></FormEditTugas>

  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";
import ShowTabTugasCard from "./components/ShowTabTugasCard.vue";
import ShowTabAktivitasCard from "./components/ShowTabAktivitasCard.vue";
import ShowTabPesertaCard from "./components/ShowTabPesertaCard.vue";
import FormEditTugas from "./components/FormEditTugas.vue";


export default {
  components: {
    ShowTabTugasCard, ShowTabAktivitasCard, ShowTabPesertaCard, FormEditTugas
  },
  async preFetch({ store, currentRoute }) {
    const preStore = useLmsTugasStore(store);

    // const page = currentRoute.query.page || 1;
    const slug = currentRoute.params.slug || "";

    await preStore.onShow(slug);
  },
  data() {
    return {
      tab: "tab1",
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
    ...mapState(useLmsTugasStore, ["get_show_payload", "get_init_show", "get_show_kelas"]),
    is_selesai() {
      if(this.get_show_payload?.status_durasi?.status == 'selesai') return true
      return false
    },
    is_hasil() {
      if(this.get_show_payload?.tugas_hasil_count > 0) return true
      return false
    },


  },
  methods: {
    ...mapActions(useAuthStore, ["onLogout"]),
    ...mapActions(useLmsTugasStore, ["onShow", "onChangePage"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
      this.onChangePage(val);
    },
    onOpenDialog() {
      if(this.is_selesai) {
        this.$q.notify({
          type: 'negative',
          message: 'Tugas Selesai',
          caption: 'tidak bisa diedit',
          timeout: 2000,
          position: 'top'
        })
        return
      }
      this.$refs.FormEditTugas?.onOpen()
    },
    gotoHasil() {
      if(!this.is_hasil) {
        this.$q.notify({
          type: 'negative',
          message: 'Hasil Kosong',
          caption: 'belum ada mengerjakan',
          timeout: 2000,
          position: 'top'
        })
        return
      }
      this.$router.push({
        name: `lms-tugas-${this.get_show_payload?.model}-stats-show`?.toLowerCase(),
        params: {
          slug: this.$route?.params?.slug
        }
      })
    }
  },
  async mounted() {
    // await this.$nextTick();
    // this.$glightbox?.init();
  },
};
</script>
