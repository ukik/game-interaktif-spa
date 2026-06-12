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
    label="Parent"
    :options="options"
    @filter="onFilter"
    hint="Cari Ortu"
    :behavior="is_mobile_size ? 'dialog' : 'dialog'"
    :options-disable="optionDisable"
    @update:model-value="onChange"
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
          <q-item-label caption>{{ scope.opt.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import axios from "axios";
import { mapWritableState } from "pinia";
import { useFormPengaturanSiswaStore } from "src/stores/lms/form/FormPengaturanSiswaStore";

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
    ...mapWritableState(useFormPengaturanSiswaStore, {
      options: "parent_options",
      selected_parents: "selected_parents",
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

        if (val.length > 3) {
          this.current = val.slice(0, 3);
          this.$q.notify({
            type: 'warning',
            message: 'Maksimal 3 parent',
            position: 'top'
          });
          return;
        }

        this.$emit("onBubbleEvent", val);
        console.log("WATCH FIRED", val);

        const vm = this
        let temp = [];
        val.forEach(id => {
          vm.options.forEach(element => {
            if(id == element?.id) {
              console.log(id, element?.id)
              temp.push(element)
            }
          });
        });

        this.selected_parents = temp
        // console.log("onBubbleEvent", this.selected_parents, this.options);

        // if (!val) return;
        // this.$emit("onBubbleEvent", val);
      },
      immediate: true,
    },
  },

  methods: {
    onChange(val) {
      if (val.length > 3) {
        this.current = val.slice(0, 3);

        this.$q.notify({
          type: "warning",
          message: "Maksimal 3 parent",
          position: 'top'
        });

        return;
      }

      this.current = val;
      this.$emit("onBubbleEvent", val);
    },
    optionDisable(opt) {
      return this.current.length >= 3 && !this.current.includes(opt.id);
    },
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

  mounted() {
    console.log("parent", this.parent, this.options);
    this.current = this.parent ?? [];
  },
};
</script>
