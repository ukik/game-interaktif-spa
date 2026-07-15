<template>
  <q-page class="col-12 flex flex-center row q-pa-md">
    <form
      class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4"
      @submit.prevent.stop="onSubmit"
      @reset.prevent.stop="onReset"
    >

      <q-card v-if="!is_confirmed">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Selamat Datang</div>
          <div class="text-subtitle2">silahkan login</div>
        </q-card-section>

        <q-separator />
<!-- {{ isMobile }} -- {{ getHost }} -->
        <q-card-section class="q-gutter-md">
          <!-- {{ auth }} -->
          <LoginUserDemo />

          <q-input
            :disable="getIsLogin"
            v-if="!form_login_role?.temp_token"
            ref="emailRef"
            filled
            v-model="form_login.email"
            type="email"
            label="Your email *"
            hint="wajib diisi email"
            lazy-rules
            :rules="emailRules"
          />

          <q-input
            :disable="getIsLogin"
            v-if="!form_login_role?.temp_token"
            ref="passwordRef"
            filled
            type="password"
            v-model="form_login.password"
            label="Your password *"
            hint="wajib diisi password"
            lazy-rules
            :rules="passwordRules"
          />

          <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
          <template v-if="form_login_role?.temp_token">
            <q-list bordered>
              <q-toolbar>
                <q-toolbar-title>Pilih User</q-toolbar-title>
              </q-toolbar>
            </q-list>

            <q-list bordered separator>
              <template v-for="user in form_login_role?.users" :key="user.id">
                <q-item
                  @click="
                    onLoginRole(user.id);
                    is_confirmed = true;
                  "
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <q-img
                        :src="user?.url_image"
                        @error="user.url_image = user?.default_image"
                        error-src="user?.default_image"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ user.name }}</q-item-label>
                    <q-item-label caption lines="1">{{ user.role }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </template>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions
          v-if="!form_login_role?.temp_token"
          class="q-pa-md"
          align="between"
        >
          <q-btn :disable="getIsLogin" label="Sign-In" icon="send" type="submit" color="primary" />
          <q-btn :disable="getIsLogin"
            label="Reset"
            @click="onClearFormLogin"
            type="reset"
            color="negative"
            icon="delete"
            outline
            class="q-ml-sm"
          />
        </q-card-actions>
        <q-card-actions v-else class="q-pa-md" align="center">
          <q-btn
            @click="onClearFormLoginRole"
            label="Refresh"
            color="teal"
            outline
            icon="refresh"
          />
        </q-card-actions>
      </q-card>
    </form>
  </q-page>
</template>

<script>
// import { api } from 'boot/axios'
import axios from "axios";
import metaMixin from "src/mixins/createMetaMixin";
import { mapState, mapStores, mapActions } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import LoginUserDemo from "src/components/lms/LoginUserDemo.vue";

const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

import { route_after_login_redirect } from 'src/utils/route_after_login_redirect';


export default {
  mixins: [metaMixin],
  components: {
    LoginUserDemo,
  },
  data() {
    return {
      accept: false,
      is_confirmed: false,
      loading: false,

      emailRules: [
        (val) => !!val || "Tolong isi email kamu",
        (val) => isValidEmail(val) || "Format email tidak valid",
      ],

      passwordRules: [
        (val) => (val !== null && val !== "") || "Tolong isi password kamu",
      ],
    };
  },
  computed: {
    ...mapState(useAuthStore, ["form_login", "form_login_role", "auth"]),
  },
  watch: {
    'getIsLogin': function(val) {
      const route_name = this.$route?.name
      if(val) {
        // alert('watch')
        if (route_name == 'login' || route_name == 'register') this.$router.replace(route_after_login_redirect)
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, [
      "onLogin",
      "onLoginRole",
      "onClearFormLoginRole",
      "onClearFormLogin",
    ]),
    async onSubmit() {
      this.$refs.emailRef.validate();
      this.$refs.passwordRef.validate();

      if (this.$refs.emailRef.hasError || this.$refs.passwordRef.hasError) {
        this.$q.notify({
          icon: "info",
          color: "dark",
          message: "Lengkapi form dengan benar",
        });
        return;
      }
      const resp = await this.onLogin();
      // if (resp) {
      //   Swal.fire({
      //     title: "Sukses Login!",
      //     text: "Data berhasil diproses!",
      //     icon: "success",
      //     timer: 2500,
      //     timerProgressBar: true,
      //     showConfirmButton: false
      //   });
      // }
    },

    onReset() {
      this.email = null;
      this.password = null;

      this.$refs.emailRef.resetValidation();
      this.$refs.passwordRef.resetValidation();
    },
  },
};
</script>
