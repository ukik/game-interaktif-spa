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
          <q-toolbar-title> Edit Stakeholder </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-card-section style="height: calc(100% - 50px - 53px)" class="scroll q-pa-sm">
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
import { useFormPengaturanStakeholderStore } from "src/stores/lms/form/FormPengaturanStakeholderStore";
import { useLmsStakeholderStore } from "src/stores/lms/LmsStakeholderStore.js";

export default {
  components: {
    FormStep1,
  },
  data() {
    return {
      dialog: false,
      id: null,
    };
  },
  computed: {
    ...mapState(useLmsStakeholderStore, ["get_show_payload"]),
    ...mapWritableState(useFormPengaturanStakeholderStore, ["form_edit"]),
  },
  methods: {
    ...mapActions(useFormPengaturanStakeholderStore, {
      onUpdate: "onUpdate",
    }),
    ...mapActions(useLmsStakeholderStore, ["onShow"]),
    async onOpen(id) {
      this.dialog = true;
      this.id = id;

      const ref = JSON.parse(JSON.stringify(this.get_show_payload))

      switch (this.$route.name) {
        case "lms_stakeholder_index":
          await this.onShow(id);
          break;
        case "lms_stakeholder_show":
          break;
      }

      this.form_edit = ref;
      this.form_edit["image"] = null;
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
    // if(this.form_tugas_edit?.status_durasi?.status == 'selesai') return
    // this.onOpen()
  },
};
</script>
