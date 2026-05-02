<template>
  <div class="">
    <q-dialog v-model="dialog_result">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator />

        <q-card-section :style="is_mobile_size ? 'max-height: calc(100vh - 100px)' : 'max-height: 60vh'" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro labore.</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useQuizStore } from 'src/stores/lms/form/QuizStore';
import { ref } from 'vue'

export default {
  setup() {
    return {
      fixed: ref(false)
    }
  },
  computed: {
    ...mapWritableState(useQuizStore, {
      dialog_result: 'local.dialog_result'
    })
  }
}
</script>
