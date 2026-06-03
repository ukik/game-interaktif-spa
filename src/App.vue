<template>
  <router-view />
</template>

<script>
import { mapActions } from 'pinia';
import { useGlobalStore } from './stores/lms/GlobalStore';

export default {
  methods:{
    ...mapActions(useGlobalStore, ['onRequest'])
  },
  created() {
    this.onRequest()
  }
}
</script>
