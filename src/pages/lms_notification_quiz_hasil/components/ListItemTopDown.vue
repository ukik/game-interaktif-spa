<template>
  <q-item>
    <q-item-section>
      <q-item-label lines="1" caption>{{ label }}</q-item-label>
      <!-- </q-item-section>
    <q-item-section side> -->
      <q-item-label class="text-dark">
        <slot>
          <div v-html="value"></div>
        </slot>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['label', 'value']
}
</script>
