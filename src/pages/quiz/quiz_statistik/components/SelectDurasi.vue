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
    :use-input="true"
    input-debounce="300"
    label="Durasi"
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
    durasi: {
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
        { value: "day", label: "HARIAN" },
        { value: "week", label: "MINGGUAN" },
        { value: "month", label: "BULANAN" },
        { value: "triwulan", label: "TRI-WULAN" },
        { value: "caturwulan", label: "CATUR-WULAN" },
        { value: "semester", label: "SEMESTER" },
        { value: "year", label: "TAHUNAN" },
      ],
    };
  },
  emits: ["onBubbleEvent"],
  watch: {
    current: {
      handler(val) {
        console.log("WATCH FIRED", val);
        if (!val) return;
        this.$emit("onBubbleEvent", val);
      },
      immediate: true,
    },
  },

  mounted() {
    this.current = this.normalizeToString(this.durasi) ? this.durasi : 'year';
    console.log("mounted", this.durasi);
  },
};
</script>
