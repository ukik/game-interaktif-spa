<template>
  <!-- <q-btn flat round icon="logout" @click="onLogoutConfirmDialog" /> -->
  <q-btn flat round color="white" icon="add">
    <q-menu>
      <q-list bordered separator style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>Buat Tugas (Quiz)</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Buat Tugas (Modul)</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>


  <FormDialogParent ref="FormDialogParent"></FormDialogParent>
  <FormDialogSekolah ref="FormDialogSekolah"></FormDialogSekolah>
  <FormDialogSiswa ref="FormDialogSiswa"></FormDialogSiswa>
  <FormDialogStakeholder ref="FormDialogStakeholder"></FormDialogStakeholder>
</template>

<script>
import { defineAsyncComponent } from "vue";

const FormDialogParent = defineAsyncComponent(() =>
  import("src/pages/pengaturan/forms_create/parent/FormDialog.vue")
);
const FormDialogSekolah = defineAsyncComponent(() =>
  import("src/pages/pengaturan/forms_create/sekolah/FormDialog.vue")
);
const FormDialogSiswa = defineAsyncComponent(() =>
  import("src/pages/pengaturan/forms_create/siswa/FormDialog.vue")
);
const FormDialogStakeholder = defineAsyncComponent(() =>
  import("src/pages/pengaturan/forms_create/stakeholder/FormDialog.vue")
);

export default {
  components: {
    FormDialogParent,
    FormDialogSekolah,
    FormDialogSiswa,
    FormDialogStakeholder,
  },
  methods: {
    onOpenDialog(ref) {
      this.$refs[ref].onOpen();
    },
  },
};
</script>
