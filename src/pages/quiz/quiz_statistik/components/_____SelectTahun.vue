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
    label="Semester"
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
    semester: {
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
    };
  },
  computed: {
    yearOptions() {
      const currentYear = new Date().getFullYear();

      return Array.from({ length: 100 }, (_, i) => ({
        label: String(currentYear - i),
        value: String(currentYear - i),
      }));
    },
  },
  emits: ["onBubbleEvent"],
  watch: {
    current(val) {
      console.log("watch", val);
      this.$emit("onBubbleEvent", val);
    },
  },

  mounted() {
    console.log("mounted", this.semester);
    if (!this.normalizeToString(this.semester)) {
      const currentSemester = Math.ceil((new Date().getMonth() + 1) / 6);
      const item = this.options.find((x) => x.value === currentSemester);
      this.current = item?.value;
    } else {
      // const item = this.options.find((x) => x.value === this.semester);
      this.current = this.semester;
    }
  },
};
</script>
