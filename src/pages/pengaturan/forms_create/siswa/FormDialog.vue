<template>
  <q-form ref="formRef">
    <q-dialog
      @before-show="step = 1"
      id="FormSiswaDialog"
      v-model="dialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        :style="
          is_ipad_lower_size
            ? ''
            : `width: ${getPageWidth()}px; height: calc(100vh - 0px);`
        "
      >
        <q-toolbar class="bg-teal text-white">
          <q-toolbar-title> Tambah Siswa </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-card-section v-if="dialog" style="height: calc(100% - 50px - 53px)" class="scroll q-pa-sm">
          <!-- <q-list bordered class="q-pa-sm">
            <FormStep1 />
          </q-list> -->

          <q-stepper
            header-nav
            bordered
            class="q-pa-none"
            flat
            v-model="step"
            ref="stepper"
            color="primary"
            animated
          >
            <q-step
              dense
              :name="1"
              title="Siswa"
              icon="settings"
              class="q-pa-md"
              :done="step > 1"
            >
              <FormStep1 v-if="step == 1" />
            </q-step>

            <q-step
              :name="2"
              title="Orangtua"
              icon="group"
              class="q-pa-md"
              :done="step > 2"
            >
              <FormStep2 v-if="step == 2" />
            </q-step>
          </q-stepper>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="center">
          <q-btn
            unelevated
            v-if="step > 1"
            icon="chevron_left"
            color="teal"
            @click="$refs.stepper.previous()"
            class="q-mx-sm"
            label="Mundur"
          />

          <q-btn
            unelevated
            v-if="step == 1"
            @click="nextStep"
            color="teal"
            label="Maju"
            icon-right="chevron_right"
          />

          <q-btn
          v-if="step >= 2"
            type="submit"
            unelevated
            color="primary"
            label="Proses"
            icon-right="check"
            @click="onSubmit"
            class="q-mx-sm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-form>
</template>

<script>
import { mapActions, mapWritableState, mapState } from "pinia";
import FormStep1 from "./FormStep1.vue";
import FormStep2 from "./FormStep2.vue";
import { useFormPengaturanSiswaStore } from "src/stores/lms/form/FormPengaturanSiswaStore";

export default {
  components: {
    FormStep1,
    FormStep2,
  },
  data() {
    return {
      dialog: false,
      step: 1,
    };
  },
  computed: {
    ...mapWritableState(useFormPengaturanSiswaStore, ["form_create"]),
  },
  methods: {
    ...mapActions(useFormPengaturanSiswaStore, {
      onCreate: "onCreate",
    }),
    async onOpen() {
      this.dialog = true;
    },
    async nextStep() {
      const isValid = await this.$refs.formRef.validate();

      if (!isValid) {
        this.step <= 2;

        this.$nextTick(() => {
          setTimeout(() => {
            this.showValidationErrors();
            this.waitAndScrollToError();
          }, 300);
        });

        return;
      }

      this.$refs.stepper.next();
    },
    async onSubmit() {

      const isValid = await this.$refs.formRef.validate();

      if (!isValid) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.getValidate?.showValidationErrors();
            this.getValidate?.waitAndScrollToError();
          }, 300);
        });

        return;
      }

      if(this.form_create.new_password !== this.form_create.new_password_confirmation) {
        this.$q.notify({
          type: "negative",
          message: "Password Konfirmasi Salah!!!",
          timeout: 2000,
          position: "top",
        });
        return
      }


      const resp = await this.onCreate();
      if(!resp) {
        this.Swal.error()
        return
      }
      this.Swal.success()
      this.dialog = false;
    },
  },
  async mounted() {

  },
};
</script>

<style>
#FormSiswaDialog .q-stepper__step-inner {
  padding: 0px;
}
</style>
