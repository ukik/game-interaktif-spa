<template>
  <q-form @submit="onSubmit">
    <q-dialog v-model="dialog" persistent maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card :style="is_ipad_lower_size ? '' : `width: ${getPageWidth()}px; height: calc(100vh - 50px);`">

        <!-- <q-bar class="bg-primary">
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar> -->

        <!-- <q-card-action> -->
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title> Buat Tugas </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-toolbar>
        <!-- </q-card-action> -->


        <q-card-section style="max-height: calc(100% - 50px - 53px)" class="scroll q-pa-sm q-pt-md">

          <div class=" q-gutter-md">

            <!-- Judul -->
            <div>
              <!-- <q-item-label lines="1" caption class="q-mb-sm">Judul</q-item-label> -->
              <q-input v-model="form_tugas_create.judul" label="Judul" outlined hint="required"
                :rules="[val => !!val || 'wajib diisi']" />
            </div>
            <!-- Deskripsi -->
            <div>
              <!-- <q-item-label lines="1" caption class="q-mb-sm">Deskripsi</q-item-label> -->
              <q-input v-model="form_tugas_create.deskripsi" label="Deskripsi" input-style="min-height: 100px;"
                type="textarea" autogrow outlined hint="required" :rules="[val => !!val || 'wajib diisi']" />
            </div>

            <!-- Catatan -->
            <div>
              <!-- <q-item-label lines="1" caption class="q-mb-sm">Catatan</q-item-label> -->
              <q-input v-model="form_tugas_create.catatan" label="Catatan" input-style="min-height: 100px;"
                type="textarea" outlined hint="opsional" />
            </div>

            <!-- Kategori -->
            <div class="q-mb-lg">
              <!-- {{ get_tugas_kategori_payload }} -->
              <!-- <q-item-label lines="1" caption class="q-mb-sm">Kategori</q-item-label> -->
              <q-select v-model="form_tugas_create.kategori" :options="tugas_kategori_options" option-label="nama"
                option-value="id" emit-value map-options label="Kategori" outlined hint="required" use-input
                input-debounce="100" @filter="filterFn" :rules="[val => !!val || 'wajib diisi']" />
            </div>

            <!-- Prioritas -->
            <div>
              <q-item-label lines="1" caption class="">Prioritas</q-item-label>
              <q-option-group v-model="form_tugas_create.priority" :options="[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' }
              ]" type="radio" inline />
            </div>

            <!-- Visibility -->
            <div>
              <q-item-label lines="1" caption class="q-mb-sm">Visibilitas</q-item-label>
              <q-banner class="bg-yellow-3 rounded-borders">Visibilitas <b>PUBLIC</b> orang lain dapat
                meliihat</q-banner>
              <q-option-group v-model="form_tugas_create.visibility" :options="[
                { label: 'Public', value: 'public' },
                { label: 'Private', value: 'private' }
              ]" type="radio" inline />
            </div>

            <div class="q-mb-lg">
              <q-item-label lines="1" caption class="q-mb-sm">Jadwal</q-item-label>
              <q-banner class="bg-yellow-3 rounded-borders q-mb-md">Waktu <b>Mulai & Selesai</b> tidak bisa
                di ganti</q-banner>

              <div class="row q-gutter-md">
                <!-- BEGIN DATE -->
                <div class="col-6">
                  <q-input outlined v-model="form_tugas_create.begin_date" label="Mulai" placeholder="YYYY-MM-DD"
                    hint="required" :rules="[
                      val => !!val || 'wajib diisi',
                      val => /^\d{4}-\d{2}-\d{2}$/.test(val) || 'format YYYY-MM-DD'
                    ]">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover>
                          <q-date v-model="form_tugas_create.begin_date" mask="YYYY-MM-DD" today-btn
                            :options="disablePast">
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
                  <q-input outlined v-model="form_tugas_create.end_date" label="Selesai" placeholder="YYYY-MM-DD"
                    hint="required" :rules="[
                      val => !!val || 'wajib diisi',
                      val => /^\d{4}-\d{2}-\d{2}$/.test(val) || 'format YYYY-MM-DD',
                      val => !form_tugas_create.begin_date || val >= form_tugas_create.begin_date || 'tidak boleh sebelum tanggal mulai'
                    ]">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover>
                          <q-date v-model="form_tugas_create.end_date" mask="YYYY-MM-DD" today-btn
                            :options="disableEndDate">
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
              <q-file class="col-12" v-model="form_tugas_create.image" label="Upload Gambar"
                accept=".jpg,.png,.jpeg,.webp" outlined />
              <q-img class="rounded-borders q-mt-md col-sm-6 col-xs-12 col-4" v-if="preview" :src="preview" />
            </div>

            <!-- Submit -->
          </div>
          <div style="height:10px"></div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="center" class="q-px-sm bg-redX">
          <q-btn label="Simpan" icon-right="send" type="submit" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-form>


</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useFormTugasStore } from 'src/stores/lms/form/FormTugasStore';
import { useKelasStore } from 'src/stores/lms/form/KelasStore';
import { useTugasKategoriStore } from 'src/stores/lms/form/TugasKategoriStore';

export default {
  data() {
    return {
      dialog: (false),
      kategoriOptions: [

      ],
      tugas_kategori_options: [],

      preview: null,
    }
  },
  computed: {
    ...mapWritableState(useFormTugasStore, ['form_tugas_create']),
    ...mapState(useKelasStore, ['get_kelas_payload']),
    ...mapState(useTugasKategoriStore, ['get_tugas_kategori_payload']),
  },
  watch: {
    'form_tugas_create.image'(file) {
      if (file) {
        this.preview = URL.createObjectURL(file)
      } else {
        this.preview = null
      }
    },
    'form_tugas_create.begin_date'(val) {
      if (!val) return

      // reset end_date biar user pilih ulang
      this.form_tugas_create.end_date = ''
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
      const begin = this.form_tugas_create.begin_date

      if (d < today) return false

      if (!begin) return true

      return d >= begin
    },
    onOpen() {
      this.dialog = true;
    },
    async onSubmit() {
      const formData = new FormData()

      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })

      await this.$axios.post('/api/tugas', formData)

      this.$q.notify({
        type: 'positive',
        message: 'Berhasil disimpan'
      })
    }
  },
  mounted() {
    this.onOpen()
    this.onKelas()
    this.onTugasKategori()
  }
}
</script>
