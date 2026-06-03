<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="help" color="red" text-color="white" />
        <span class="q-ml-sm">Apa kamu yakin menghapus ?</span>
      </q-card-section>

      <q-card-actions align="between">
        <q-btn flat label="BATAL" color="primary" v-close-popup />
        <q-btn flat label="HAPUS" @click="onDelete" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'pinia';


export default {
  props:['actionDelete'],
  data() {
    return {
      confirm: false,
    }
  },
  methods: {
    onOpen(val) {
      this.confirm = val
    },
    async onDelete() {
      // console.log(this.actionDelete)
      const _delete = await this.actionDelete()
      if(_delete) {
        this.confirm = false
        this.$router.back();
      }
    }
  }
}
</script>
