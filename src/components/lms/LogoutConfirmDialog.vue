<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="help" color="red" text-color="white" />
        <span class="q-ml-sm">Apa kamu yakin ingin keluar ?</span>
      </q-card-section>

      <q-card-actions align="between">
        <q-btn flat label="BATAL" color="primary" v-close-popup />
        <q-btn flat label="KELUAR" @click="onLogout" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'pinia';
import { useAuthStore } from 'src/stores/auth/AuthStore';

export default {
  data() {
    return {
      confirm: false,
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['onLogout']),
    onOpen(val) {
      this.confirm = val
    }
  }
}
</script>
