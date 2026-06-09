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
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title> Buat Tugas </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-card-section
          ref="scrollArea"
          style="height: calc(100% - 50px - 53px)"
          class="scroll q-pa-sm q-pt-md"
        >
          <q-item-label overline class="q-pl-sm">DETAIL TUGAS</q-item-label>
          <q-card flat bordered class="q-mb-sm q-mt-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs col bg-grey-1">
                <div class="text-overline">{{ tugas_reference?.mapel?.nama }}</div>
                <div class="text-h6 text-capitalize q-mb-xs">
                  {{ tugas_reference?.tugasable?.kategori }}
                </div>
                <q-item-label lines="2">
                  {{ tugas_reference?.judul }}
                </q-item-label>
                <q-item-label :lines="is_mobile_size ? 1 : 2" class="text-grey-7" caption>
                  {{ tugas_reference?.tugasable?.judul }}
                </q-item-label>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center justify-end bg-grey-1">
                <q-img
                  :height="is_mobile_size ? '' : '140px'"
                  class="rounded-borders bg-white"
                  :src="tugas_reference?.url_image"
                  @error="tugas_reference.url_image = global_url_image"
                  error-src="global_url_image"
                />
              </q-card-section>
            </q-card-section>
            <!-- <q-badge style="margin-top: -15px; margin-right: 10px;" class="bg-transparent q-pa-none" floating>
              <q-chip color="teal" text-color="white" label="Detail Tugas"></q-chip>
            </q-badge> -->
          </q-card>

          <q-stepper
            bordered
            class="q-pa-none"
            flat
            v-model="step"
            ref="stepper"
            color="primary"
            animated
          >
            <q-step dense :name="1" title="Tugas" icon="settings" :done="step > 1">
              <FormStep1 v-if="step == 1" />
            </q-step>

            <q-step :name="2" title="Peserta" icon="group" :done="step > 2">
              <FormStep2 v-if="step == 2" />
            </q-step>

            <q-step :name="3" title="Status" icon="lock" :done="step > 3">
              <FormStep3 v-if="step == 3" />
            </q-step>

            <!-- <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'" />
                <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back"
                  class="q-ml-sm" />
              </q-stepper-navigation>
            </template> -->
          </q-stepper>

          <div style="height: 10px"></div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="center" class="q-px-sm bg-redX">
          <q-btn
            unelevated
            v-if="step > 1"
            icon="chevron_left"
            color="primary"
            @click="$refs.stepper.previous()"
            class="q-mx-sm"
          />

          <q-btn
            unelevated
            v-if="step <= 2"
            @click="nextStep"
            color="primary"
            label="Lanjut"
            icon-right="chevron_right"
          />

          <q-btn
            type="subtmi"
            unelevated
            v-if="step == 3"
            color="primary"
            label="Proses"
            icon-right="check"
            @click="onSubmit"
            class="q-mx-sm"
          />
          <!-- <q-btn @click="step1 = 1" label="Lanjut" icon-right="send" type="submit" color="primary" /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-form>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import FormStep1 from "./FormStep1.vue";
import FormStep2 from "./FormStep2.vue";
import FormStep3 from "./FormStep3.vue";
import { useFormTugasStore } from "src/stores/lms/form/FormTugasStore";
// import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore.js";

export default {
  components: {
    FormStep1,
    FormStep2,
    FormStep3,
  },
  props: ["model"],
  data() {
    return {
      dialog: false,
      step: 1,
    };
  },
  computed: {
    ...mapWritableState(useFormTugasStore, ["form_tugas_create", "tugas_reference"]),
    // ...mapState(useLmsBankQuizStore, [
    //   "get_show_payload",
    //   // "get_init_show",
    //   // "get_show_kelas",
    // ]),
  },
  methods: {
    ...mapActions(useFormTugasStore, {
      onCreate: "onCreate",
    }),
    onOpen(payload) {
      this.dialog = true;
      this.form_tugas_create.aktivitas = this.model + "-" + this.$route.params?.slug;

      this.tugas_reference = payload
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
            this.showValidationErrors();
            this.waitAndScrollToError();
          }, 300);
        });

        return;
      }

      console.log("onSubmit", this.onCreate());
      this.onCreate();
    },
  },
  mounted() {
    // this.onOpen()
  },
};
</script>

<style lang="scss">
.q-stepper__step-inner {
  padding: 12px !important;
}
</style>
