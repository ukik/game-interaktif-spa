<template>
  <q-slide-item @left="onLeft" @right="onRight" left-color="green" right-color="white">
    <template v-slot:right>
      <q-btn v-if="!item?.read_at" unelevated @click="onRead" round color="positive" icon="done" class="q-mr-sm" />
      <q-btn @click="onDelete" unelevated round color="red" icon="close" />
    </template>
    <!-- <template v-slot:left>
      <q-btn round flat icon="done" />
    </template> -->

    <q-item :key="index" clickable v-ripple :class="[!item?.read_at ? 'bg-light-blue-1' : '']"
      :to="{ name: 'lms_notification_quiz_hasil_show', params: { slug: item?.id } }">

      <q-item-section>
        <q-item-label>{{ item?.data?.judul }}</q-item-label>
        <q-item-label caption lines="1">{{ item?.data?.message }}</q-item-label>
        <!-- <q-item-label caption lines="1">{{ item?.telpon }} / {{ item?.whatsapp }}</q-item-label> -->
      </q-item-section>

      <q-item-section side top>
        <q-item-label>
          <q-badge :color="item?.read_at ? 'positive' : 'red'">
            {{ item?.read_at ? 'Read' : 'Unread' }}
          </q-badge>
        </q-item-label>
        <q-item-label caption lines="1">{{ dateToLocal(item?.created_at) }}</q-item-label>
      </q-item-section>

    </q-item>
  </q-slide-item>
</template>

<script>
export default {
  props: ['item',"index","onRead","onDelete"],
  data() {
    return {
      timer: null,
    }
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  },
  methods: {
    onLeft({ reset }) {
      // this.$q.notify({ position:'top', message:'Batal dihapus' })
      this.finalize(reset)
    },
    onRight({ reset }) {
      // this.$q.notify({ position:'top', message:'Batal dihapus' })
      this.finalize(reset)
    },
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 2500)
    }

  }
}
</script>
