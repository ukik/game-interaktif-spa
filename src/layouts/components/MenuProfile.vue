<template>
  <q-btn round flat icon="person">
    <q-menu>
      <q-card flat>
        <!-- <q-card-actions class="bg-primary text-white" align="center">
          <div class="text-h6">PROFIL</div>
        </q-card-actions>
        <q-separator></q-separator> -->
        <q-card-section class="q-py-sm">
          <div class="row no-wrap">
            <div class="column">
              <!-- <div class="text-h6">PROFIL ({{ getAuthUser?.id }})</div> -->
              <q-item class="q-px-none q-py-none">
                <q-item-section>
                  <q-item-label caption lines="1">nama</q-item-label>
                  <q-item-label lines="1">{{ getAuthUser?.name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label caption lines="1">email</q-item-label>
                  <q-item-label lines="1">{{ getAuthUser?.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label caption lines="1">telpon</q-item-label>
                  <q-item-label lines="1">{{ getAuthUser?.telpon }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label caption lines="1">whatsapp</q-item-label>
                  <q-item-label lines="1">{{ getAuthUser?.whatsapp }}</q-item-label>
                </q-item-section>
              </q-item>

              <!-- <q-item-label>{{ getAuthUser?.email }}</q-item-label> -->
              <!-- <q-item-label>{{ getAuthUser?.role }}</q-item-label> -->
              <!-- <q-item-label>{{ getAuthUser?.telpon }}</q-item-label> -->
              <!-- <q-item-label>{{ getAuthUser?.whatsapp }}</q-item-label> -->
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center q-mt-md">
              <q-avatar size="72px">
                <q-img
                  :src="getAuthUser?.url_image"
                  @error="getAuthUser.url_image = getAuthUser?.default_image"
                  error-src="getAuthUser?.default_image"
                />
                <q-badge class="badge-left" color="pink" floating>{{
                  getAuthUser?.id
                }}</q-badge>
              </q-avatar>

              <q-item-label class="text-capitalize text-dark text-body q-mt-md">{{
                getAuthUser?.role
              }}</q-item-label>
              <!-- <q-item-label caption>( ID: {{ getAuthUser?.id }} )</q-item-label> -->

              <q-btn
                class="q-mb-xs q-mt-md"
                :to="gotoDetail"
                color="teal"
                label="Profile"
                unelevated
                size="sm"
                v-close-popup
              />

              <q-btn
                @click="$emit('onBubbleEvent')"
                color="red"
                label="Logout"
                unelevated
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";

export default {
  setup() {
    return {
      mobileData: ref(true),
      bluetooth: ref(false),
    };
  },
  computed: {
    ...mapState(useAuthStore, ["getAuthUser"]),
    gotoDetail() {
      const params = {
        slug: this.getAuthUser?.id,
      };
      switch (this.getAuthUser?.role) {
        case "student":
          return {
            name: "lms_siswa_show",
            params: params,
          };
          break;
        case "parent":
          return {
            name: "lms_ortu_show",
            params: params,
          };
          break;
        case "teacher":
        case "principal":
        case "superadmin":
        case "admin":
          return {
            name: "lms_stakeholder_show",
            params: params,
          };
          break;
      }
    },
  },
  methods: {
    ...mapState(useAuthStore, ["onLogout"]),
  },
};
</script>
