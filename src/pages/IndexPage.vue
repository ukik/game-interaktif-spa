<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    {{ getAuthUser }}
  </q-page>
</template>

<script>
import { ref } from "vue";

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";

export default {
  computed: {
    ...mapState(useAuthStore, ['getAuthUser'])
  },
  methods: {
    ...mapActions(useAuthStore, ['onLogout']),
  }
};
</script>
