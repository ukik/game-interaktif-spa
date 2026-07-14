<template>
  <q-pull-to-refresh @refresh="refresh" color="yellow-9" icon="lightbulb">
    <slot></slot>
  </q-pull-to-refresh>
</template>

<script>
export default {
  props: ['onAction'],
  methods: {
    async refresh(done) {
      await this.onAction()
      done();
    },
  },
};
</script>
