<template>

  <q-select
    :option-label="optionLabel"
    :option-value="optionValue"
    clearable
    emit-value
    map-options
    class="full-width"
    :multiple="false"
    filled
    v-model="model"
    :use-input="true"
    input-debounce="250"
    label="Siswa"
    :options="options"
    @filter="onFilter"
    style="width: 250px"
    hint="Cari Siswa"
    :behavior="is_mobile_size ? 'dialog' : 'dialog'"
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
              error-src="global_url_image"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-capitalize">{{ scope.opt.name }}</q-item-label>
          <q-item-label caption>{{ scope.opt.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import axios from "axios";

export default {
  props: {
    modelValue: {
      default: null,
    },

    url: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: "",
    },

    optionLabel: {
      type: String,
      default: "name",
    },

    optionValue: {
      type: String,
      default: "id",
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      loading: false,
      options: []
    }
  },

  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },

  methods: {
    async onFilter(val, update) {
      if (val.length < 2) {
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
};
</script>
