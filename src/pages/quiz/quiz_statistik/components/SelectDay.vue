<template>
  <q-input
    clearable
    class="full-width q-mt-md"
    filled
    v-model="current"
    label="Hari"
    style="width: 250px"
    mask="####-##-##"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            ref="popup"
            v-model="current"
            mask="YYYY-MM-DD"
            default-view="Calendar"
            minimal
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup flat color="primary" label="OK" />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    day: {
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

    day: {
      immediate: true,
      handler(val) {
        this.current = val || new Date().toISOString().slice(0, 10);
      },
    },
  },
};
</script>
