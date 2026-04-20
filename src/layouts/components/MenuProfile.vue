<template>
  <q-btn round flat icon="person">
    <q-menu>
      <q-card flat>
        <!-- <q-card-actions class="bg-primary text-white" align="center">
          <div class="text-h6">PROFIL</div>
        </q-card-actions>
        <q-separator></q-separator> -->
        <q-card-section class="q-py-md">
          <div class="row no-wrap">
            <div class="column">
              <div class="text-h6">PROFIL</div>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label caption lines="1">email</q-item-label>
                  <q-item-label>{{ getAuthUser?.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label caption lines="1">telpon</q-item-label>
                  <q-item-label>{{ getAuthUser?.telpon }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label caption lines="1">whatsapp</q-item-label>
                  <q-item-label>{{ getAuthUser?.whatsapp }}</q-item-label>
                </q-item-section>
              </q-item>


              <!-- <q-item-label>{{ getAuthUser?.email }}</q-item-label> -->
              <!-- <q-item-label>{{ getAuthUser?.role }}</q-item-label> -->
              <!-- <q-item-label>{{ getAuthUser?.telpon }}</q-item-label> -->
              <!-- <q-item-label>{{ getAuthUser?.whatsapp }}</q-item-label> -->
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <q-img :src="getAuthUser?.url_image" @error="getAuthUser.url_image = getAuthUser?.default_image"
                  error-src="getAuthUser?.default_image" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md">{{ getAuthUser?.name }}</div>
              <q-item-label caption class="q-mb-md">{{ getAuthUser?.role }}</q-item-label>

              <q-btn @click="$emit('onBubbleEvent')" color="red" label="Logout" push size="sm" v-close-popup />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import { ref } from 'vue'
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";

export default {
  setup() {
    return {
      mobileData: ref(true),
      bluetooth: ref(false)
    }
  },
  computed: {
    ...mapState(useAuthStore, ['getAuthUser'])
  },
  methods: {
    ...mapState(useAuthStore, ['onLogout'])
  },
}
</script>
