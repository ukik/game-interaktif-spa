<template>
  <div class="q-gutter-md">
    <div>
      <q-input
        v-model="form_edit.nama"
        label="Nama"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_edit.npsn"
        label="NPSN"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div class="q-mb-lg">
      <q-select
        v-model="form_edit.jenjang"
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
        v-model="form_edit.status"
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
        v-model="form_edit.alamat"
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
        v-model="form_edit.provinsi"
        label="Provinsi"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_edit.kota"
        label="Kota"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_edit.kecamatan"
        label="Kecamatan"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_edit.kode_pos"
        label="Kode Pos"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_edit.telpon"
        label="Telpon"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_edit.email"
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
        clearable
        class="col-12"
        v-model="form_edit.image"
        label="Upload Gambar"
        accept=".jpg,.png,.jpeg,.webp"
        outlined
      />
      <div class="row col-12 q-col-gutter-sm">
        <div class="col-12 col-sm-6" v-if="preview">
          <q-img
            height="300px"
            class="rounded-borders q-mt-md q-list--bordered"
            :src="preview"
          >
            <div class="absolute-bottom text-center">Baru</div>
          </q-img>
        </div>
        <div class="col-12 col-sm-6">
          <q-img
            height="300px"
            class="rounded-borders q-mt-md col-6 q-list--bordered"
            @error="form_edit.url_image = global_url_image"
            :error-src="global_url_image"
            :src="form_edit?.url_image"
          >
            <div class="absolute-bottom q-pa-xs text-center">Lama</div>
          </q-img>
        </div>
      </div>
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
    ...mapWritableState(useFormPengaturanSekolahStore, ["form_edit", "preview"]),
    ...mapState(useGlobalStore, ["get_data_global_list_jenjang"]),
  },
  watch: {
    "form_edit.image"(file) {
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
