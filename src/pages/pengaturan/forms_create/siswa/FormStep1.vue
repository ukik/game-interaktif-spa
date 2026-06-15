<template>
  <div class="q-gutter-md">
    <div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            v-model="form_create.new_password"
            label="Password Baru"
            outlined
            type="password"
            hint="required"
            :rules="rules.password"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="form_create.new_password_confirmation"
            label="Konfirmasi Password Baru"
            outlined
            type="password"
            hint="required"
            :rules="[
              (val) => !!val || 'Konfirmasi password wajib diisi',
              (val) => val === form_create.new_password || 'Password tidak sama',
            ]"
          />
        </div>
      </div>
    </div>


    <div>
      <div>
        <q-input
          class="q-mb-md"
          v-model="form_create.email"

          label="Email"
          outlined

          hint="Tidak bisa dirubah (hubungi Admin)"
          :rules="[(val) => !!val || 'wajib diisi']"
        />
      </div>

      <q-input
        v-model="form_create.name"
        label="Nama"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.siswa.nis"
        label="NIS"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>
    <div>
      <q-input
        v-model="form_create.siswa.nisn"
        label="NISN"
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
        v-model="form_create.whatsapp"
        label="Whatsapp"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>

    <div class="q-mb-lg">
      <q-select
        v-model="form_create.siswa.kelas_id"
        :options="get_kelas_option_lists"
        option-label="label"
        option-value="value"
        emit-value
        map-options
        label="Kelas"
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
import { useFormPengaturanSiswaStore } from "src/stores/lms/form/FormPengaturanSiswaStore";
import { useGlobalStore } from "src/stores/lms/GlobalStore";

export default {
  data() {
    return {
      tugas_kategori_options: [],
    };
  },
  computed: {
    ...mapWritableState(useFormPengaturanSiswaStore, ["form_create", "preview"]),
    ...mapState(useGlobalStore, ["get_kelas_option_lists"]),
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
