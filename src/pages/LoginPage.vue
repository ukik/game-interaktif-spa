<template>
  <q-page class="flex flex-center row q-pa-md">
    <form class="col-12 col-sm-8 col-sm-8 col-md-6" @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
      <q-card >
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Selamat Datang</div>
          <div class="text-subtitle2">silahkan login</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-md">
          <!-- {{ auth }} -->


          <q-input v-if="!form_login_role?.temp_token" ref="emailRef" filled v-model="form_login.email" type="email"
            label="Your email *" hint="wajib diisi email" lazy-rules :rules="emailRules" />

          <q-input v-if="!form_login_role?.temp_token" ref="passwordRef" filled type="text"
            v-model="form_login.password" label="Your password *" hint="wajib diisi password" lazy-rules
            :rules="passwordRules" />

          <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
          <template v-if="form_login_role?.temp_token">
            <q-list bordered>
              <q-toolbar>
                <q-toolbar-title>Pilih User</q-toolbar-title>
              </q-toolbar>
            </q-list>

            <q-list bordered separator>
              <template v-for="user in form_login_role?.users" :key="user.id">
                <q-item @click="onLoginRole(user.id)" clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar>
                      <q-img :src="user?.url_image" @error="user.url_image = user?.default_image"
                        error-src="user?.default_image" />
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

        <q-card-actions class="q-pa-md" align="between">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
      </q-card>
    </form>
  </q-page>
</template>


<script>
// import { api } from 'boot/axios'
import axios from 'axios'
import metaMixin from 'src/mixins/createMetaMixin'
import { mapState, mapStores, mapActions } from 'pinia';
import { useAuthStore } from 'src/stores/auth/AuthStore';


const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

export default {
  mixins: [metaMixin],
  data() {
    return {
      accept: false,

      loading: false,

      emailRules: [
        val => !!val || 'Tolong isi email kamu',
        val => isValidEmail(val) || 'Format email tidak valid'
      ],

      passwordRules: [
        val => (val !== null && val !== '') || 'Tolong isi password kamu'
      ]
    }
  },
  computed: {
    ...mapState(useAuthStore, ['form_login', 'form_login_role', 'auth']),
  },
  methods: {
    ...mapActions(useAuthStore, ['onLogin', 'onLoginRole']),
    async onSubmit() {
      this.$refs.emailRef.validate()
      this.$refs.passwordRef.validate()

      if (this.$refs.emailRef.hasError || this.$refs.passwordRef.hasError) {
        this.$q.notify({
          icon: 'info',
          color: 'dark',
          message: 'Lengkapi form dengan benar'
        })
        return
      }
      this.onLogin();
    },

    onReset() {
      this.email = null
      this.password = null

      this.$refs.emailRef.resetValidation()
      this.$refs.passwordRef.resetValidation()
    }
  }
}
</script>
