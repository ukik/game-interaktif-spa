<template>
  <div class="HomeExclusive">
    <q-tabs
      v-model="tab"
      inline-label
      arrows
      :mobile-arrows="!is_mobile_size"
      class="text-white"
    >
      <template v-for="i in 10">
        <q-route-tab
          :to="`/product/${i}`"
          indicator-color="transparent"
          class="q-pa-none"
          style="width: 210px; height: 200px; opacity: 100"
        >
          <q-card flat class="full-height" style="width: 200px; padding: 0 5px 0 5px">
            <q-img class="full-height" src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom text-center text-body2">Caption</div>
            </q-img>
          </q-card>
        </q-route-tab>
      </template>
      <!-- <q-tab name="alarms" icon="alarm" label="Alarms" />
    <q-tab name="movies" icon="movie" label="Movies" />
    <q-tab name="photos" icon="photo" label="Photos" />
    <q-tab name="videos" icon="slow_motion_video" label="Videos" />
    <q-tab name="addressbook" icon="people" label="Address Book" /> -->
    </q-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "1",
    };
  },
  mounted() {
    const el = this.$el.querySelector(".q-tabs__content");

    // ===== wheel scroll horizontal =====
    el.addEventListener("wheel", (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    });

    // // ===== drag scroll =====
    // let isDown = false;
    // let startX;
    // let scrollLeft;

    // el.addEventListener("mousedown", (e) => {
    //   isDown = true;
    //   startX = e.pageX - el.offsetLeft;
    //   scrollLeft = el.scrollLeft;
    // });

    // el.addEventListener("mouseleave", () => {
    //   isDown = false;
    // });

    // el.addEventListener("mouseup", () => {
    //   isDown = false;
    // });

    // el.addEventListener("mousemove", (e) => {
    //   if (!isDown) return;
    //   e.preventDefault();

    //   const x = e.pageX - el.offsetLeft;
    //   const walk = (x - startX) * 1.5;
    //   el.scrollLeft = scrollLeft - walk;
    // });
  },
};
</script>

<style lang="css">
.HomeExclusive {
  height: 210px;
}

@media (max-width: 768px) {
  .HomeExclusive {
    height: 200px;
  }
}

@media (min-width: 769px) {
  .HomeExclusive .q-tabs__content {
    overflow-x: auto !important;
    overflow-y: hidden;
    scrollbar-width: thin; /* Firefox */
  }

  .HomeExclusive .q-tabs__content::-webkit-scrollbar {
    height: 10px;
  }

  .HomeExclusive .q-tabs__content::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 6px;
  }

  .HomeExclusive .q-tabs__content::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>
