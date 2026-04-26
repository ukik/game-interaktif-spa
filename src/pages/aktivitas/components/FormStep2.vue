<template>
  <div class=" q-gutter-md">


    <!-- Kelas -->
    <div class="q-mb-lg">
      <q-select clearable v-model="form_tugas_edit.kelas_id" :options="get_kelas_payload"
        option-label="nama" option-value="id" emit-value map-options label="Kelas" outlined hint="required" use-input
        input-debounce="100" :rules="[val => !!val || 'wajib diisi']" />
    </div>

    <q-field label="Siswa" stack-label :model-value="form_tugas_edit.siswa_ids" hint="required"
      :rules="[val => val.length > 0 || 'Minimal pilih 1 siswa']" borderless no-error-icon>

      <!-- LABEL CUSTOM -->
      <template v-slot:label>
        <div class="text-weight-medium text-grey-8 q-mb-lg">
          Pilih Siswa
        </div>
        <!-- <q-item-label lines="1"  class="">Pilih Siswa</q-item-label> -->
      </template>
      <template v-slot:control>
        <q-list class="col-12" bordered separator>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-checkbox :model-value="isAllChecked" @update:model-value="toggleAll" color="primary" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Pilih Semua</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="get_siswa_payload?.data.length > 0" v-for="(item, index) in get_siswa_payload?.data" tag="label"
            v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="form_tugas_edit.siswa_ids" :val="item?.siswa?.id" color="teal" />
            </q-item-section>
            <q-item-section avatar>
              <q-avatar>
                <q-img class="rounded-borders" :src="item?.siswa?.url_image"
                  @error="item.siswa.url_image = global_url_image" error-src="global_url_image" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item?.siswa?.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

      </template>
    </q-field>
    <!-- Submit -->
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useFormTugasStore } from 'src/stores/lms/form/FormTugasStore';
import { useKelasStore } from 'src/stores/lms/form/KelasStore';
import { useTugasSiswaStore } from 'src/stores/lms/form/TugasSiswaStore';

export default {
  data() {
    return {
      // color: ['cyan']
    }
  },
  computed: {
    ...mapWritableState(useFormTugasStore, ['form_tugas_edit']),
    ...mapState(useKelasStore, ['get_kelas_payload']),
    ...mapState(useTugasSiswaStore, ['get_siswa_payload', 'get_loading_siswa']),
    ...mapWritableState(useTugasSiswaStore, ['siswa']),
    isAllChecked() {
      const list = this.get_siswa_payload?.data || []
      const selected = this.form_tugas_edit.siswa_ids || []

      return list.length > 0 && list.every(item =>
        selected.includes(item.siswa?.id)
      )
    }
  },
  watch: {
    "form_tugas_edit.kelas_id"(val) {
      console.log(val)
      if (!val) {
        this.form_tugas_edit.siswa_ids = []
        this.onClearSiswa()
      }
      if (val) this.$q.loading.show();
      if (val) this.onSiswa(true)
    },
    "get_loading_siswa"(val) {
      // if (!val) this.form_tugas_edit.siswa_ids = []
    }
  },
  methods: {
    ...mapActions(useKelasStore, ['onKelas']),
    ...mapActions(useTugasSiswaStore, ['onSiswa','onClearSiswa']),
    toggleAll(val) {
      const list = this.get_siswa_payload?.data || []

      if (val) {
        this.form_tugas_edit.siswa_ids = list.map(item => item.siswa?.id)
      } else {
        this.form_tugas_edit.siswa_ids = []
      }
    },
    // async onSubmit() {
    //   const formData = new FormData()

    //   Object.keys(this.form).forEach(key => {
    //     formData.append(key, this.form[key])
    //   })

    //   await this.$axios.post('/api/tugas', formData)

    //   this.$q.notify({
    //     type: 'positive',
    //     message: 'Berhasil disimpan'
    //   })
    // }
  },
  mounted() {
    this.onKelas()
    if(this.form_tugas_edit.kelas_id) this.onSiswa()
  }
}
</script>
