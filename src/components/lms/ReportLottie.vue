<template>
  <q-dialog maximized v-model="dialog" persistent>
    <div class="flex flex-center">
      <q-card class="bg-transparent" flat>
        <q-card-actions style="overflow-x:hidden;" class="q-pa-none" align="center">
          <DotLottieVue :loop="false" ref="lottieRef" style="height: auto; width: 650px; " autoplay
            src="/lottie/star-success-transparent.json" />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
</script>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    handleComplete() {
      this.dialog = false;
      console.log('Animasi selesai');
    },
    onOpen() {
      this.dialog = true;
    },
  },
  mounted() {
    const vm = this
    if (this.$route?.query?.success == 'true') {
      this.onOpen()

      this.$nextTick(() => {
        const player = this.$refs.lottieRef

        if (player) {
          const instance = player.getDotLottieInstance()

          instance.addEventListener('complete', () => {
            console.log('Animasi selesai 🔥')
            this.handleComplete()
          })
        }
      })
    }
  }

}
</script>
