<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="help" color="red" text-color="white" />
        <span class="q-ml-sm">Apa kamu yakin hapus semua ?</span>
      </q-card-section>

      <q-card-actions align="between">
        <q-btn flat label="BATAL" color="primary" v-close-popup />
        <q-btn flat label="SETUJU" @click="onTrue" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props:['onAction'],
  data() {
    return {
      confirm: false,
    }
  },
  methods: {
    onOpen(val) {
      this.confirm = val
    },
    async onTrue() {
      await this.onAction()
      this.confirm = false
    }
  }
}
</script>
