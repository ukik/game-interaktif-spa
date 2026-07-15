<template>
  <!-- <router-view /> -->
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>

<script>
// import { mapActions } from 'pinia';
// import { useGlobalStore } from './stores/lms/GlobalStore';

export default {
  methods: {
    // ...mapActions(useGlobalStore, ['onRequest','onRequestGuru'])
  },
  mounted() {
    return;
    // Requesting fullscreen mode:
    // this.$q.fullscreen
    //   .request()
    //   .then(() => {
    //     // success!
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // oh, no!!!
    //   });

    // this.onRequest()
    // this.onRequestGuru()
  },
};
</script>
