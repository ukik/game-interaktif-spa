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
    label="Caturwulan"
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
    caturwulan: {
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
        { value: 1, label: "CATURWULAN 1 (JAN - APR)" },
        { value: 2, label: "CATURWULAN 2 (MEI - AGU)" },
        { value: 3, label: "CATURWULAN 3 (SEP - DES)" },
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
    console.log("mounted", this.caturwulan);
    if (!this.normalizeToString(this.caturwulan)) {
      const currentCaturwulan = Math.ceil((new Date().getMonth() + 1) / 4);
      const item = this.options.find((x) => x.value === currentCaturwulan);
      this.current = item?.value;
    } else {
      // const item = this.options.find((x) => x.value === this.caturwulan);
      this.current = this.caturwulan;
    }
  },
};
</script>
