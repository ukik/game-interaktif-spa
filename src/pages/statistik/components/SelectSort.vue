<template>
  <q-select
    :option-label="optionLabel"
    :option-value="optionValue"

    emit-value
    map-options
    class="full-width q-mt-md"
    :multiple="false"
    filled
    v-model="current"
    :use-input="false"
    input-debounce="300"
    label="Urutan"
    :options="options"
    style="width: 250px"
    :behavior="is_mobile_size ? 'dialog' : 'dialog'"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label class="text-uppercase">{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  props: {
    sort: {
      default: null,
    },
    label: {
      type: String,
      default: "",
    },

    optionLabel: {
      type: String,
      default: "label",
    },

    optionValue: {
      type: String,
      default: "value",
    },
  },

  data() {
    return {
      current: null,
      options: [
        { value: "desc", label: "TINGGI - RENDAH" },
        { value: "asc", label: "RENDAH - TINGGI" },
      ],
    };
  },
  emits: ["onBubbleEvent"],
  watch: {
    current: {
      handler(val) {
  console.log("WATCH FIRED", val);
  if(!val) return
  this.$emit("onBubbleEvent", val);
},
      immediate: true,
    },
  },

  mounted() {
    console.log("mounted", this.sort);
    this.current = this.normalizeToString(this.sort) ? this.sort : 'desc';
  },
};
</script>
