<template>
  <q-dialog v-model="confirm" persistent :full-width="is_mobile_size" transition-show="slide-up"
    transition-hide="slide-down">
    <!-- <q-card :style="is_ipad_lower_size ? '' : `width: ${getPageWidth()}px; height: calc(100vh - 0px);`"> -->

    <q-card style="max-width:450px;">
      <q-form @submit="onSubmit">

        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title> Filter </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup></q-btn>
        </q-toolbar>


        <q-card-section class="scroll" style="max-height: calc(80vh - 52px - 52px);">

          <q-item class="q-px-none" dense>
            <q-item-section>
              <q-item-label caption>Pilih Kelas</q-item-label>
            </q-item-section>
          </q-item>

          <!-- {{ filter.kelas }} -->
          <q-list bordered class="row">
            <q-item v-for="(item, index) in filter.kelasList" class="q-px-none col-6" dense tag="label" v-ripple>
              <q-item-section avatar>
                <q-checkbox v-model="filter.kelas" :val="item?.key" color="teal" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item?.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <!-- {{ filter.mapel }} -->
          <q-select ref="mapelSelect" option-value="id" clearable option-label="nama" emit-value map-options
            class="full-width q-mt-md" :multiple="false" filled v-model="filter.mapel" :use-input="true"
            input-debounce="500" label="Mapel" :options="mapelOptions"
            @filter="(val, update) => filterFn(val, update, 'optionsMapel', 'get_data_global_list_mapel')"
            style="width: 250px" :hint="`${filter.mapel.length}/3 dipilih`"
            :behavior="is_mobile_size ? 'dialog' : 'dialog'" @update:model-value="onUpdate($event, 'mapel')">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>

          <!-- {{ filter.kategori }} -->
          <q-select option-value="id" clearable option-label="nama" emit-value map-options
            class="full-width q-mt-md text-capitalize" :multiple="false" filled v-model="filter.kategori"
            :use-input="false" input-debounce="500" label="Kategori" :options="kategoriOptions"
            @filter="(val, update) => filterFn(val, update, 'optionsKategori', 'get_data_global_list_kategori_tugas')"
            style="width: 250px" :behavior="is_mobile_size ? 'dialog' : 'dialog'"
            @update:model-value="onUpdate($event, 'kategori')">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <!-- <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section> -->
                <q-item-section>
                  <q-item-label class="text-capitalize">{{ scope.opt.nama }}</q-item-label>
                  <!-- <q-item-label caption>{{ scope.opt.nama }}</q-item-label> -->
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <!-- {{ filter.guru }} -->
          <q-select option-value="id" clearable option-label="name" emit-value map-options class="full-width q-mt-md"
            :multiple="false" filled v-model="filter.guru" :use-input="true" input-debounce="500" label="Guru"
            :options="guruOptions"
            @filter="(val, update) => filterFn(val, update, 'optionsGuru', 'get_data_global_list_guru')"
            style="width: 250px" :behavior="is_mobile_size ? 'dialog' : 'dialog'"
            @update:model-value="onUpdate($event, 'guru')">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>


        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="between">
          <q-btn @click="onClear" flat label="BERSIHKAN" icon="delete" color="red" />
          <q-btn type="submit" flat label="CARI" icon="search" color="primary" />
        </q-card-actions>

      </q-form>


    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useGlobalStore } from 'src/stores/lms/GlobalStore';
import { useLmsTugasQuizStatsStore } from 'src/stores/lms/LmsTugasQuizStatsStore';

let kelasList = [];
for (let index = 0; index < 12; index++) {
  kelasList.push({
    key: index + 1,
    label: 'Kelas ' + index
  })
}

export default {
  props: ['onAction'],
  data() {
    return {
      confirm: false,
      // kelas: [],
      // mapel: [],
      // kategori: [],
      // guru: [],

      // kelasList,

      // optionsKelas: [],
      // optionsKategori: [],
      // optionsMapel: [],
      // optionsGuru: [],
    }
  },
  watch: {
    'filter.mapel': function (val) {
      console.log('mapel', val?.length)
      if (val?.length >= 3) {
        this.$refs.mapelSelect.hidePopup()
      }
    }
  },
  computed: {
    // ...mapState(useLmsTugasQuizStatsStore, ['get_index_kategori_list']),
    ...mapState(useGlobalStore, [
      'get_data_global_list_kelas',
      'get_data_global_list_kategori_tugas',
      'get_data_global_list_mapel',
      'get_data_global_list_guru'
    ]),
    ...mapWritableState(useLmsTugasQuizStatsStore, ['filter', 'valid_filter']),
    kategoriOptions() {
      // return []
      const full = this['filter'].kategori.length >= 3

      return this['filter'].optionsKategori.map(item => ({
        ...item,
        disable: full && !this['filter'].kategori.includes(item.id)
      }))
    },
    mapelOptions() {
      // return []
      const full = this['filter'].mapel.length >= 3

      return this['filter'].optionsMapel.map(item => ({
        ...item,
        disable: full && !this['filter'].mapel.includes(item.id)
      }))
    },
    guruOptions() {
      // return []
      const full = this['filter'].guru.length >= 3

      return this['filter'].optionsGuru.map(item => ({
        ...item,
        disable: full && !this['filter'].guru.includes(item.id)
      }))
    },
  },
  methods: {
    ...mapActions(useLmsTugasQuizStatsStore, ['onIndex']),
    async onClear() {
      this['filter'].kelas = []
      this['filter'].mapel = []
      this['filter'].kategori = []
      this['filter'].guru = []

      // this.$q.loading.show()
      this.valid_filter = JSON.parse(JSON.stringify(this.filter))
      await this.onIndex()
      this.confirm = false
      // this.$q.loading.hide()

      this.optionsKategori = [...this.get_data_global_list_kategori_tugas]
      this.optionsMapel = [...this.get_data_global_list_mapel]
      this.optionsGuru = [...this.get_data_global_list_guru]

    },
    onOpen(val) {
      this.confirm = val

      this['filter'].optionsKategori = [...this.get_data_global_list_kategori_tugas]
      this['filter'].optionsMapel = [...this.get_data_global_list_mapel]
      this['filter'].optionsGuru = [...this.get_data_global_list_guru]
    },
    onUpdate(val, key) {
      val = val || []

      if (val.length <= 3) {
        this['filter'][key] = val
        // console.log('onUpdate', this['filter'][key])
      }
    },
    filterFn(val, update, optionKey, sourceKey) {
      update(() => {

        if (!val) {
          this['filter'][optionKey] = [...this[sourceKey]]
          return
        }

        const needle = val.toLowerCase()

        this['filter'][optionKey] = this[sourceKey].filter(item =>
          item.nama?.toLowerCase().includes(needle)
        )

      })
    },
    async onTrue() {
      // await this.onAction()
      this.confirm = false
    },
    async onSubmit() {
      console.log('onSubmit');
      // this.$q.loading.show()
      this.valid_filter = JSON.parse(JSON.stringify(this.filter))
      await this.onIndex()
      this.confirm = false
      // this.$q.loading.hide()
    }
  },
}

</script>
