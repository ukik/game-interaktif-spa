<template>
    <q-dialog
      v-model="dialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        :style="
          is_ipad_lower_size
            ? ''
            : `width: ${getPageWidth()}px; height: calc(100vh - 0px);`
        "
      >
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title> Petunjuk </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-card-section
          ref="scrollArea"
          style="height: calc(100% - 50px)"
          class="scroll q-pa-sm"
        >
          <HintRender class="q-mt-none">
            <div id="hint" v-html="get_aktivitas_payload?.intro?.hint"></div>
          </HintRender>
        </q-card-section>

      </q-card>
    </q-dialog>
</template>

<script>
import { mapState } from 'pinia';
import HintRender from 'src/pages/quiz/quiz_game/components/HintRender.vue';
import { useLmsTugasStore } from 'src/stores/lms/LmsTugasStore';

export default {
  components: {
    HintRender,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapState(useLmsTugasStore, ['get_aktivitas_payload'])
  },
  methods: {
    onOpen(payload) {
      console.log("onOpen", payload);
      this.dialog = true;
    },
  },
  mounted() {
    // this.onOpen()
  },
};
</script>
