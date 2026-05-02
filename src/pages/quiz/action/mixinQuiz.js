import { mapActions, mapState, mapWritableState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useQuizStore } from "src/stores/lms/form/QuizStore";
import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";

export const myMixin = {
  data() {
    return {
      list_questions: [],
    };
  },
  watch: {
  },
  computed: {
    ...mapState(useLmsBankQuizStore, [
      "get_show_payload",
    ]),
    ...mapWritableState(useQuizStore, {
      dialog_result: 'local.dialog_result'
    })
  },
  methods: {
    ...mapActions(useLmsBankQuizStore, ["onShow"]),
    ...mapActions(useQuizStore, ["setForm", "onCreate"]),
    ...mapActions(useLmsTugasStore, ["onAktivitas"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
    },
    dummyOnCreate(tipe_aktivitas) {

      // this.dialog_result = true;

      return;

      const local = localStorage.getItem('record_quiz_'+tipe_aktivitas+'1')

      console.log('local', JSON.parse(local))

      this.setForm(JSON.parse(local))

      this.onCreate(tipe_aktivitas, this.$route?.params?.slug);
    }
  },

};
