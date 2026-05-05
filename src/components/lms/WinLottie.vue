<template>
  <q-dialog @show="handleComplete" maximized v-model="is_quiz_done" persistent>
    <div class="flex flex-center">
      <q-card class="bg-transparent" flat>
        <q-card-actions align="center">
          <DotLottieVue style="height: auto; width: 500px; margin-top: 0px;" autoplay loop src="/lottie/used_trophy.json" />
        </q-card-actions>
        <q-card-actions align="center">
          <DotLottieVue style="height: auto; width: 550px; margin-top: -250px;" autoplay loop
            src="/lottie/used_exploding_ribbon_and_confetti.json" />
        </q-card-actions>
        <q-card-actions v-if="is_next" align="center">
          <q-btn rounded @click="gotoReport" color="primary" style="width: 220px; margin-top:0px;" size="xl" icon-right="description" label="Laporan" />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
</script>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useQuizStore } from 'src/stores/lms/form/QuizStore';
import { useUiStore } from 'src/stores/ui';

export default {
  computed: {
    ...mapWritableState(useQuizStore, ['router_push','is_quiz_done'])
    // ...mapWritableState(useUiStore, ['report_confirm_dialog'])
  },
  emits: ['onBubbleEvent'],
  data() {
    return {
      dialog: false,
      is_next: false,
    }
  },
  mounted() {
  },
  methods: {
    gotoReport() {
        this.$router.push(this.router_push)
    },
    handleComplete() {
      console.log('Animasi selesai');
      const vm = this

      setTimeout(function () {
        vm.is_next = true;
        console.log('xxxxxxxxx')
      }, 2500)


      // trigger event ke parent
      // this.onBubbleEvent();

      // atau close dialog
    },
    onOpen() {
      this.dialog = true;
    },
    onBubbleEvent() {
      this.$emit('onBubbleEvent')
    }
  }
}
</script>
