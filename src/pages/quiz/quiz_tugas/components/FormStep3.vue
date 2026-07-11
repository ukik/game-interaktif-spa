<template>
  <div class=" q-gutter-md">

    <!-- Status -->
    <div>
      <!-- <q-item-label lines="1" caption class="q-mb-sm">Draft</q-item-label> -->
      <q-banner class="bg-yellow-3 rounded-borders">Status <b>PUBLISH</b> tidak bisa mengganti peserta siswa
        lagi</q-banner>
      <q-field label="Status" stack-label :model-value="form_tugas_edit.status" hint="required"
        :rules="[val => !!val || 'wajib dipilih']" borderless no-error-icon>

        <q-option-group v-model="form_tugas_edit.status" :options="[
          { label: 'Draft', value: 'draft' },
          { label: 'Publish', value: 'publish' }
        ]" type="radio" inline />

      </q-field>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useFormTugasStore } from 'src/stores/lms/form/FormTugasStore';

export default {
  data() {
    return {
      // color: ['cyan']
    }
  },
  computed: {
    ...mapWritableState(useFormTugasStore, ['form_tugas_edit']),
  },
}
</script>
