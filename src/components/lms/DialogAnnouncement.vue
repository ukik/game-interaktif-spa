<template>
  <div class="">
    <q-dialog persistent @before-hide="onBeforeHide" maximized v-model="first_opened">

      <q-card class="bg-transparent">
        <!-- <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator /> -->

        <q-card-section style="height: calc(100% - 58px)" class="scroll" :class="[is_mobile_size ? 'q-pa-none' : 'q-pa-sm']">
          <div class=" row justify-center">
            <Announcement />
          </div>
        </q-card-section>

        <q-separator class="bg-grey-4" />

        <q-card-actions align="between" class="bg-white">
          <div><q-checkbox v-model="full_close" label="Saya tutup permanen" color="pink" /></div>

          <q-btn icon="done" unelevated label="Selesai" color="teal" v-close-popup />
          <!-- <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useAnnouncementStore } from 'src/stores/lms/AnnouncementStore';
// import Announcement from 'src/pages/Announcement.vue';
import Announcement from './AnnouncementView.vue';

export default {
  components: {
    Announcement
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    ...mapWritableState(useAnnouncementStore, ['first_opened','full_close'])
  },
  methods: {
    onBeforeHide() {
      this.first_opened = false;
      if(this.full_close) {
        localStorage.setItem('first_opened', false)
      }
    }
  },
  mounted() {
    // alert(this.first_opened)
    this.open = this.first_opened
  }
}
</script>
