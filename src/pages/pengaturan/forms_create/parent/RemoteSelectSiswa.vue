<template>
  <!-- {{ options }} -->
  <q-select
    outlined
    :loading="loading"
    option-label="name"
    option-value="id"
    clearable
    emit-value
    map-options
    class="full-width"
    :multiple="true"
    v-model="current"
    :use-input="true"
    input-debounce="250"
    label="Siswa"
    :options="options"
    @filter="onFilter"
    hint="Cari Siswa: nama, email, nis, nisn"
    :behavior="is_mobile_size ? 'dialog' : 'dialog'"
    :options-disable="optionDisable"
    @update:model-value="onChange"
    :error="current.length <= 0"
    error-message="wajib diisi"
    :rules="[(val) => !!val || 'wajib diisi']"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-avatar>
            <q-img
              class="rounded-borders"
              :src="scope.opt?.url_image"
              @error="scope.opt.url_image = global_url_image"
              :error-src="global_url_image"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-capitalize">{{ scope.opt.name }}</q-item-label>
          <q-item-label caption>{{ scope.opt.email }} / NIS: {{ scope.opt.siswa?.nis }} / NISN: {{ scope.opt.siswa?.nisn }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import axios from "axios";
import { mapWritableState } from "pinia";
import { useFormPengaturanParentStore } from "src/stores/lms/form/FormPengaturanParentStore";

export default {
  props: {
    parent: {
      default: null,
    },

    url: {
      type: String,
      default: "name",
    },
  },

  computed: {
    ...mapWritableState(useFormPengaturanParentStore, {
      options: "options",
      selected_options: "selected_options",
    }),
    isMaxSelected() {
      return this.current?.length >= 3;
    },
  },

  emits: ["onBubbleEvent"],

  data() {
    return {
      loading: false,
      current: [],
    };
  },

  watch: {
    current: {
      handler(val) {

        if (!Array.isArray(val)) return;

        if (val?.length > 5) {
          this.current = val.slice(0, 5);
          this.$q.notify({
            type: 'warning',
            message: 'Maksimal 5 Siswa',
            position: 'top'
          });
          return;
        }

        this.$emit("onBubbleEvent", val);
        console.log("WATCH FIRED", val);

        const vm = this
        let temp = vm.selected_options;
        val.forEach(id => {
          vm.options.forEach(element => {
            if(id == element?.id) {
              console.log(id, element?.id)
              temp.push(element)
            }
          });
        });

        this.selected_options = [...new Map(temp.map(item => [item.id, item])).values()];

        console.log('vm.selected_options', vm.selected_options)
      },
      immediate: true,
    },
  },

  methods: {
    setCurrent(payload) {
      this.current = payload
    },
    onChange(val) {
      if (val?.length > 5) {
        this.current = val.slice(0, 5);

        this.$q.notify({
          type: "warning",
          message: "Maksimal 5 Siswa",
          position: 'top'
        });

        return;
      }

      this.current = val;
      this.$emit("onBubbleEvent", val);
    },
    optionDisable(opt) {
      return this.current.length >= 5 && !this.current.includes(opt.id);
    },
    async onFilter(val, update) {
      if (val?.length < 2) {
        update(() => {
          this.options = this.options ?? [];
        });
        return;
      }

      const vm = this;
      update(async () => {
        vm.loading = true;

        try {
          const { data } = await axios.get(vm.url, {
            params: {
              q: val,
            },
          });

          vm.options = data.payload?.users;
        } catch (e) {
          console.error(e);
        }

        console.log("RemoteSelectSiswa", vm.options);

        vm.loading = false;
      });
    },
  },

  mounted() {
    console.log("parent", this.parent, this.options);
    this.current = this.parent ?? [];
  },
};
</script>
