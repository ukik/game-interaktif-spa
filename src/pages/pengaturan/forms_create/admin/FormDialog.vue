<template>
  <q-form ref="formRef">
    <q-dialog
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
        <q-toolbar class="bg-blue text-white">
          <q-toolbar-title> Tambah Admin </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-card-section v-if="dialog" style="height: calc(100% - 50px - 53px)" class="scroll q-pa-sm">
          <q-list bordered class="q-pa-sm">
            <FormStep1 />
          </q-list>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="center">
          <q-btn
            type="subtmi"
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
import { useFormPengaturanAdminStore } from "src/stores/lms/form/FormPengaturanAdminStore";

export default {
  components: {
    FormStep1,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapWritableState(useFormPengaturanAdminStore, ["form_create"]),
  },
  methods: {
    ...mapActions(useFormPengaturanAdminStore, {
      onCreate: "onCreate",
    }),
    async onOpen() {
      this.dialog = true;
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
