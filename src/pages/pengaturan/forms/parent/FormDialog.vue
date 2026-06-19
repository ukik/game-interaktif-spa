<template>
  <q-form ref="formRef">
    <q-dialog
      @hide="step = 1"
      id="FormParentDialog"
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
        <q-toolbar class="bg-pink text-white">
          <q-toolbar-title> Edit Orangtua </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-card-section  v-if="dialog" style="height: calc(100% - 50px - 53px)" class="scroll q-pa-sm">
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
              title="Orangtua"
              icon="settings"
              class="q-pa-md"
              :done="step > 1"
            >
              <FormStep1 v-if="step == 1" />
            </q-step>

            <q-step
              :name="2"
              title="Siswa"
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
import { useFormPengaturanParentStore } from "src/stores/lms/form/FormPengaturanParentStore";
import { useLmsParentStore } from "src/stores/lms/LmsParentStore.js";

export default {
  components: {
    FormStep1,
    FormStep2,
  },
  data() {
    return {
      dialog: false,
      id: null,
      step: 1,
    };
  },
  watch: {
    step(val) {
      console.log('form_edit', this.form_edit)
    }
  },
  computed: {
    ...mapState(useLmsParentStore, ["get_show_payload"]),
    ...mapWritableState(useFormPengaturanParentStore, ["form_edit", "selected_options", "options", "reference"]),
  },
  methods: {
    ...mapActions(useFormPengaturanParentStore, {
      onUpdate: "onUpdate",
    }),
    ...mapActions(useLmsParentStore, ["onShow"]),
    async onOpen(id) {
      this.dialog = true;
      this.id = id;

      const form_edit = JSON.parse(JSON.stringify(this.get_show_payload));
      const reference = JSON.parse(JSON.stringify(this.get_show_payload));
      // console.log("ref?.parent?.siswa", form_edit?.parent?.siswa.map(item => item.siswa.id), form_edit);

      switch (this.$route.name) {
        case "lms_ortu_index":
          await this.onShow(id);
          break;
        case "lms_ortu_show":
          break;
      }
      this.form_edit = form_edit;
      this.form_edit["image"] = null;
      this.form_edit["new_password"] = null;
      this.form_edit["new_password_confirmation"] = null;
      this.form_edit["old_password"] = null;
      this.form_edit['siswa_id'] = form_edit?.parent?.siswa.map(item => item.siswa.id)

      this.reference = reference;
      this.reference["image"] = null;
      this.reference["new_password"] = null;
      this.reference["new_password_confirmation"] = null;
      this.reference["old_password"] = null;
      this.reference['siswa_id'] = reference?.parent?.siswa.map(item => item.siswa.id)

      if(this.options.length <= 0) this.options = form_edit?.parent?.siswa.map(item => item.siswa)

      this.selected_options = form_edit?.parent?.siswa.map(item => item.siswa)

      console.log('this.options', this.options)
      console.log("this.reference['siswa_id']", this.reference['siswa_id'])
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
    showValidationErrors() {
      const form = this.$refs.formRef;

      if (!form) return;

      const errors = [];

      const components = form.getValidationComponents?.() || [];

      components.forEach((comp) => {
        if (comp.validate && !comp.validate()) {
          const label =
            comp.label ||
            comp.$attrs?.label ||
            comp.$options?.propsData?.label ||
            "Field";

          errors.push(label);
        }
      });

      if (errors.length) {
        this.$q.notify({
          type: "negative",
          message: "Periksa: " + errors.join(", "),
          timeout: 2000,
          position: "top",
        });
      }
    },
    async waitAndScrollToError() {
      let attempt = 0;

      const findAndScroll = () => {
        const el = document.querySelector(".q-field--error");

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          return true;
        }

        return false;
      };

      const interval = setInterval(() => {
        attempt++;

        const found = findAndScroll();

        if (found || attempt > 20) {
          clearInterval(interval);
        }
      }, 150);
    },

    async onSubmit() {

      console.log('form_edit', this.form_edit)

      const isValid = await this.$refs.formRef.validate();

      if (!isValid) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.showValidationErrors();
            this.waitAndScrollToError();
          }, 300);
        });

        return;
      }

      await this.onUpdate(this.form_edit?.id);
      this.dialog = false;
    },
  },
  async mounted() {

  },
};
</script>

<style>
#FormParentDialog .q-stepper__step-inner {
  padding: 0px;
}
</style>
