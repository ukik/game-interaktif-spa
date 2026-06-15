<template>
  <div class="q-gutter-md">
    <div>
      <q-input
        v-model="form_create.nama"
        label="Nama"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.npsn"
        label="NPSN"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div class="q-mb-lg">
      <q-select
        v-model="form_create.jenjang"
        :options="get_data_global_list_jenjang"
        option-label="nama"
        option-value="id"
        emit-value
        map-options
        label="Jenjang"
        outlined
        hint="required"
        :use-input="false"
        input-debounce="100"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div class="q-mb-lg">
      <q-select
        v-model="form_create.status"
        :options="[
          { value: 'SWASTA', label: 'SWASTA' },
          { value: 'NEGERI', label: 'NEGERI' },
        ]"
        option-label="label"
        option-value="value"
        emit-value
        map-options
        label="Status"
        outlined
        hint="required"
        :use-input="false"
        input-debounce="100"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.alamat"
        label="Deskripsi"
        input-style="min-height: 100px;"
        type="textarea"
        autogrow
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.provinsi"
        label="Provinsi"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.kota"
        label="Kota"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.kecamatan"
        label="Kecamatan"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.kode_pos"
        label="Kode Pos"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.telpon"
        label="Telpon"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.email"
        label="Email"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>

    <!-- Upload -->
    <div class="row">
      <q-item-label lines="1" caption class="col-12 q-mb-sm">Gambar</q-item-label>
      <q-file
        class="col-12"
        v-model="form_create.image"
        label="Upload Gambar"
        accept=".jpg,.png,.jpeg,.webp"
        outlined
      />
      <q-img
        height="300px"
        class="rounded-borders q-mt-md col-sm-6 col-xs-12 col-4 q-list--bordered"
        v-if="preview"
        :src="preview"
      />
    </div>

    <!-- Submit -->
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useFormPengaturanSekolahStore } from "src/stores/lms/form/FormPengaturanSekolahStore";
import { useGlobalStore } from "src/stores/lms/GlobalStore";

export default {
  data() {
    return {
      tugas_kategori_options: [],
    };
  },
  computed: {
    ...mapWritableState(useFormPengaturanSekolahStore, ["form_create", "preview"]),
    ...mapState(useGlobalStore, ["get_data_global_list_jenjang"]),
  },
  watch: {
    "form_create.image"(file) {
      if (file) {
        this.preview = URL?.createObjectURL(file);
      } else {
        this.preview = null;
      }
    },
  },
  methods: {},
  mounted() {},
};
</script>
