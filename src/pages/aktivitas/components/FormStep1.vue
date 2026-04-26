<template>
  <div class=" q-gutter-md">

    <!-- Judul -->
    <div>
      <!-- <q-item-label lines="1" caption class="q-mb-sm">Judul</q-item-label> -->
      <q-input v-model="form_tugas_edit.judul" label="Judul" outlined hint="required"
        :rules="[val => !!val || 'wajib diisi']" />
    </div>
    <!-- Deskripsi -->
    <div>
      <!-- <q-item-label lines="1" caption class="q-mb-sm">Deskripsi</q-item-label> -->
      <q-input v-model="form_tugas_edit.deskripsi" label="Deskripsi" input-style="min-height: 100px;" type="textarea"
        autogrow outlined hint="required" :rules="[val => !!val || 'wajib diisi']" />
    </div>

    <!-- Catatan -->
    <div>
      <!-- <q-item-label lines="1" caption class="q-mb-sm">Catatan</q-item-label> -->
      <q-input v-model="form_tugas_edit.catatan" label="Catatan" input-style="min-height: 100px;" type="textarea"
        outlined hint="opsional" />
    </div>

    <!-- Kategori -->
    <div class="q-mb-lg">
      <!-- {{ get_tugas_tugas_kategori_payload }} -->
      <!-- <q-item-label lines="1" caption class="q-mb-sm">Kategori</q-item-label> -->
      <q-select v-model="form_tugas_edit.tugas_kategori" :options="tugas_kategori_options" option-label="nama"
        option-value="id" emit-value map-options label="Kategori" outlined hint="required" use-input
        input-debounce="100" @filter="filterFn" :rules="[val => !!val || 'wajib diisi']" />
    </div>

    <!-- Prioritas -->
    <div>
      <!-- <q-item-label lines="1" caption class="">Prioritas</q-item-label> -->

      <q-field label="Prioritas" stack-label :model-value="form_tugas_edit.priority" hide-bottom-space
        :rules="[val => !!val || 'Status wajib dipilih']" borderless no-error-icon>
        <q-option-group v-model="form_tugas_edit.priority" :options="[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' }
        ]" type="radio" inline />
      </q-field>
    </div>

    <!-- Visibility -->
    <div>
      <!-- <q-item-label lines="1" caption class="q-mb-sm">Visibilitas</q-item-label> -->
      <q-banner class="bg-yellow-3 rounded-borders">Visibilitas <b>PUBLIC</b> orang lain dapat
        melihat</q-banner>

      <q-field label="Visibilitas" stack-label :model-value="form_tugas_edit.visibility" hide-bottom-space
        :rules="[val => !!val || 'Status wajib dipilih']" borderless no-error-icon>

        <q-option-group v-model="form_tugas_edit.visibility" :options="[
          { label: 'Public', value: 'public' },
          { label: 'Private', value: 'private' }
        ]" type="radio" inline />

      </q-field>
    </div>

    <div class="q-mb-lg">
      <q-item-label lines="1" caption class="q-mb-sm">Jadwal</q-item-label>
      <!-- <q-banner class="bg-yellow-3 rounded-borders q-mb-md">Waktu <b>Mulai & Selesai</b> tidak bisa
        di ganti</q-banner> -->

      <div class="row q-gutter-md">
        <!-- BEGIN DATE -->
        <div class="col-6">
          <q-input outlined v-model="form_tugas_edit.begin_date" label="Mulai" placeholder="YYYY-MM-DD" hint="required"
            :rules="[
              val => !!val || 'wajib diisi',
              val => /^\d{4}-\d{2}-\d{2}$/.test(val) || 'format YYYY-MM-DD'
            ]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover>
                  <q-date v-model="form_tugas_edit.begin_date" mask="YYYY-MM-DD" today-btn :options="disablePast">
                    <div class="row justify-end">
                      <q-btn flat label="Close" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <!-- END DATE -->
        <div class="col">
          <q-input outlined v-model="form_tugas_edit.end_date" label="Selesai" placeholder="YYYY-MM-DD" hint="required"
            :rules="[
              val => !!val || 'wajib diisi',
              val => /^\d{4}-\d{2}-\d{2}$/.test(val) || 'format YYYY-MM-DD',
              val => !form_tugas_edit.begin_date || val >= form_tugas_edit.begin_date || 'tidak boleh sebelum tanggal mulai'
            ]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover>
                  <q-date v-model="form_tugas_edit.end_date" mask="YYYY-MM-DD" today-btn :options="disableEndDate">
                    <div class="row justify-end">
                      <q-btn flat label="Close" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>


    <!-- Upload -->
    <div class="row">
      <q-item-label lines="1" caption class="col-12 q-mb-sm">Gambar</q-item-label>
      <q-file clearable class="col-12" v-model="form_tugas_edit.image" label="Upload Gambar" accept=".jpg,.png,.jpeg,.webp"
        outlined />

      <div class="row col-12 q-col-gutter-sm">
        <div class="col-6" v-if="preview">
          <q-img class="rounded-borders q-mt-md" :src="preview">
            <div class="absolute-bottom text-center">
              Baru
            </div>
          </q-img>
        </div>
        <div class="col">
          <q-img class="rounded-borders q-mt-md col-6" :src="form_tugas_edit?.url_image">
            <div class="absolute-bottom q-pa-xs text-center">
              Lama
            </div>
          </q-img>
        </div>
      </div>
    </div>

    <!-- Submit -->
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useFormTugasStore } from 'src/stores/lms/form/FormTugasStore';
import { useKelasStore } from 'src/stores/lms/form/KelasStore';
import { useTugasKategoriStore } from 'src/stores/lms/form/TugasKategoriStore';

export default {
  data() {
    return {
      tugas_kategori_options: [],
    }
  },
  computed: {
    ...mapWritableState(useFormTugasStore, ['form_tugas_edit','preview']),
    ...mapState(useKelasStore, ['get_kelas_payload']),
    ...mapState(useTugasKategoriStore, ['get_tugas_kategori_payload']),
  },
  watch: {
    'form_tugas_edit.image'(file) {
      if (file) {
        this.preview = URL.createObjectURL(file)
      } else {
        this.preview = null
      }
    },
    'form_tugas_edit.begin_date'(val) {
      if (!val) return

      // reset end_date biar user pilih ulang
      this.form_tugas_edit.end_date = ''
    }
  },
  methods: {
    ...mapActions(useTugasKategoriStore, ['onTugasKategori']),
    ...mapActions(useKelasStore, ['onKelas']),
    filterFn(val, update, abort) {
      update(() => {
        if (!val) {
          this.tugas_kategori_options = this.get_tugas_kategori_payload
          return
        }

        const needle = val.toLowerCase()

        this.tugas_kategori_options = this.get_tugas_kategori_payload.filter(v =>
          (v.nama || '').toLowerCase().includes(needle)
        )
      })
    },
    normalize(date) {
      return date.replace(/\//g, '-') // ubah YYYY/MM/DD → YYYY-MM-DD
    },
    formatDate(date) {
      const d = new Date(date)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    },

    disablePast(date) {
      const today = this.formatDate(new Date()) // YYYY-MM-DD
      const d = this.normalize(date)

      return d >= today
    },
    disableEndDate(date) {
      const today = this.formatDate(new Date())
      const d = this.normalize(date)
      const begin = this.form_tugas_edit.begin_date

      if (d < today) return false

      if (!begin) return true

      return d >= begin
    },
  },
  mounted() {
    this.onKelas()
    this.onTugasKategori()
  }
}
</script>
