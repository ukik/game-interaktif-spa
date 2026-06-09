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
    label="Bulanan"
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
    month: {
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
        { value: "1", label: "JANUARI" },
        { value: "2", label: "FEBRUARI" },
        { value: "3", label: "MARET" },
        { value: "4", label: "APRIL" },
        { value: "5", label: "MEI" },
        { value: "6", label: "JUNI" },
        { value: "7", label: "JULI" },
        { value: "8", label: "AGUSTUS" },
        { value: "9", label: "SEPTEMBER" },
        { value: "10", label: "OKTOBER" },
        { value: "11", label: "NOVEMBER" },
        { value: "12", label: "DESEMBER" },
      ],
    };
  },
  emits:['onBubbleEvent'],
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
    console.log('mounted', this.month)
    if (!this.normalizeToString(this.month)) {
      const currentMonth = String(new Date().getMonth() + 1);
      const item = this.options.find((x) => x.value === currentMonth);
      this.current = item?.value;
    } else {
      // const item = this.options.find((x) => x.value === this.month);
      this.current = this.month;
    }
  },
};
</script>
