<template>
  <q-input
    clearable
    class="full-width q-mt-md"
    filled
    v-model="current"
    label="Tahun"
    style="width: 250px"
    mask="####"
    type="date"
  >
    <!-- <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            ref="popup"
            v-model="current"
            mask="YYYY"
            default-view="Years"
            minimal
            years-in-month-view
            @update:model-value="onYearSelected"
            @navigation="onNavigation"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup flat color="primary" label="OK" />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template> -->
  </q-input>
</template>

<script>
export default {
  props: {
    year: {
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
  emits: ["onBubbleEvent"],

  watch: {
    current(val) {
      this.$emit("onBubbleEvent", val);
    },

    year: {
      immediate: true,
      handler(val) {
        this.current = String(val) || String(new Date().getFullYear());
      },
    },
  },

  methods: {
    onNavigation(view) {
      if (view !== "Years") {
        this.$refs.popup.setView("Years");
      }
    },
    onYearSelected(val) {
      this.current = val;

      this.$nextTick(() => {
        this.$refs.popup.hide();
      });
    },
  },
  // mounted() {
  //   console.log("mounted", this.year);
  //   if (!this.normalizeToString(this.year)) {
  //     this.current = new Date().getFullYear();
  //   } else {
  //     this.current = this.year;
  //   }
  // },
};
</script>
