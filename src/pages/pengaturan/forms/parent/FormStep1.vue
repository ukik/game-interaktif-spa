<template>
  <div class="q-gutter-md">
    <div>
      <div class="q-mb-md">
        <q-input
          v-model="form_edit.old_password"
          label="Password Lama"
          outlined
          hint="required"
          :rules="[(val) => !!val || 'wajib diisi']"
        />
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            v-model="form_edit.new_password"
            label="Password Baru"
            outlined
            hint="required"
            :rules="[(val) => !!val || 'wajib diisi']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="form_edit.new_password_confirmation"
            label="Konfirmasi Password Baru"
            outlined
            hint="required"
            :rules="[(val) => !!val || 'wajib diisi']"
          />
        </div>
      </div>
    </div>
    <div>
      <div>
        <q-input
          class="q-mb-md"
          v-model="form_edit.email"
          readonly
          label="Email"
          outlined
          :error="true"
          error-message="Tidak bisa dirubah (hubungi Admin)"
          hint="Tidak bisa dirubah (hubungi Admin)"
          :rules="[(val) => !!val || 'wajib diisi']"
        />
      </div>

      <q-input
        v-model="form_edit.name"
        label="Nama"
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
        v-model="form_edit.whatsapp"
        label="Whatsapp"
        outlined
        hint="required"
        :rules="[(val) => !!val || 'wajib diisi']"
      />
    </div>

    <!-- <div class="q-mb-lg">
      <q-select
        v-model="form_edit.siswa.kelas_id"
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
    </div> -->
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
import { useFormPengaturanParentStore } from "src/stores/lms/form/FormPengaturanParentStore";
import { useGlobalStore } from "src/stores/lms/GlobalStore";

export default {
  data() {
    return {
      tugas_kategori_options: [],
    };
  },
  computed: {
    ...mapWritableState(useFormPengaturanParentStore, ["form_edit", "preview"]),
    ...mapState(useGlobalStore, ["get_kelas_option_lists"]),
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
