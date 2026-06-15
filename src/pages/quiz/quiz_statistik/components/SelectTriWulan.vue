<template>
  <q-select
    :option-label="optionLabel"
    :option-value="optionValue"
    clearable
    emit-value
    map-options
    class="full-width q-mt-md"
    :multiple="false"
    filled
    v-model="current"
    :use-input="true"
    input-debounce="300"
    label="Triwulan"
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
        <q-item-section avatar>
          <q-avatar>
            {{ scope.opt.value }}
          </q-avatar>
        </q-item-section>
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
    triwulan: {
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
      loading: false,
      current: null,
      options: [
        { value: 1, label: "TRIWULAN 1 (JAN - MAR)" },
        { value: 2, label: "TRIWULAN 2 (APR - JUN)" },
        { value: 3, label: "TRIWULAN 3 (JUL - SEP)" },
        { value: 4, label: "TRIWULAN 4 (OKT - DES)" },
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
    console.log("mounted", this.triwulan);
    if (!this.normalizeToString(this.triwulan)) {

      // hitung triwulan dari bulan sekarang
      const currentTriwulan = Math.ceil(
        (new Date().getMonth() + 1) / 3
      )
      const item = this.options.find((x) => x.value === currentTriwulan);
      this.current = item?.value;
    } else {
      // const item = this.options.find((x) => x.value === this.triwulan);
      this.current = this.triwulan;
    }
  },
};
</script>
