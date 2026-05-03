<template>
  <q-dialog v-model="report_confirm_dialog" persistent>
    <q-card>
      <!-- <q-card-section class="row items-center"> -->
        <q-banner class="q-ma-sm text-dark rounded-borders">
          <template v-slot:avatar>
            <q-icon name="info_outline" color="red" />
          </template>
          <div class="text-h6">PENDING</div>
          <div class="q-mb-sm">Kamu bisa mengganti data yang sudah <b>Terkirim</b> dengan data ini.
            Proses tidak bisa dibatalkan.</div>
          <div class="">Apa kamu yakin melanjutkan proses ini ?</div>
        </q-banner>
      <!-- </q-card-section> -->
        <q-separator></q-separator>
      <q-card-actions align="between">
        <q-btn flat label="BATAL" color="primary" v-close-popup />
        <q-btn flat label="YAKIN" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { useUiStore } from 'src/stores/ui';

export default {
  computed: {
    ...mapWritableState(useUiStore, ['report_confirm_dialog'])
  },
}
</script>
