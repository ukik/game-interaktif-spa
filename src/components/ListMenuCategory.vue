<template>
  <div class="text-black">
    <q-tabs
      id="Component_TabMenu"
      style="height: 100px"
      v-model="_tab"
      inline-label
      :mobile-arrows="!is_mobile_size"
      class="text-white col-12"
      indicator-color="transparent"
      active-class=""
    >
      <template v-for="(item, i) in items">
        <q-tab
          @click="$emit('onBubbleEvent', i + 1)"
          :name="i + 1"
          indicator-color="transparent"
          class="q-pa-none"
          style="width: 110px; height: 100px; padding: 0 2px 0 2px; opacity: 100"
        >
          <q-btn
            no-caps
            :class="[i <= 1 ? 'q-ml-xs' : '', i >= items.length ? 'q-mr-xs' : '']"
            style="width: 100px; height: 90px"
            :text-color="_tab !== i + 1 ? 'primary' : 'white'"
            :color="_tab == i + 1 ? 'primary' : 'white'"
            unelevated
            :outline="_tab !== i + 1"
          >
            <q-icon class="q-mb-md" size="30px" :name="item?.icon"></q-icon>
            <div
              class="absolute-bottom q-mb-sm text-caption"
              :class="[_tab == i + 1 ? 'text-white' : 'text-blue']"
            >
              Promo
            </div>
          </q-btn>
        </q-tab>
      </template>
    </q-tabs>
  </div>
</template>

<script>
export default {
  emits: ["onBubbleEvent"],
  data() {
    return {
      _tab: "1",
      items: [
        {
          icon: "fa-solid fa-percent",
        },
        {
          icon: "fa-solid fa-thumbs-up",
        },
        {
          icon: "fa-solid fa-bowl-food",
        },
        {
          icon: "fa-solid fa-burger",
        },
        {
          icon: "fa-solid fa-fish",
        },
        {
          icon: "fa-solid fa-fish",
        },
      ],
    };
  },
  props: {
    tab: {
      default: "1",
    },
  },
  watch: {
    tab(val) {
      this._tab = Number(val);
    },
  },
};
</script>

<style>
#Component_TabMenu .q-tabs__arrow {
  color: rgb(0, 153, 255) !important;
  /* cursor: pointer;
  font-size: 32px;
  min-width: 36px; */
  /* text-shadow: 0 0 3px #fff, 0 0 1px #fff, 0 0 1px #000; */
  text-shadow: none;
  /* transition: opacity 0.3s; */
}
</style>
