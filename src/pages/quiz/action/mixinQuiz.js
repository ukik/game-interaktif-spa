import { mapActions, mapState, mapWritableState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useQuizStore } from "src/stores/lms/form/QuizStore";
import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";

export const myMixin = {
  // data() {
  //   return {
  //     list_questions: [],
  //   };
  // },
  watch: {
  },
  computed: {
    ...mapState(useLmsBankQuizStore, [
      "get_show_payload",
    ]),
    ...mapWritableState(useQuizStore, {
      dialog_result: 'local.dialog_result',
      is_quiz_done: 'is_quiz_done',
      is_quiz_start: '',
    })
  },
  methods: {
    ...mapActions(useLmsBankQuizStore, ["onShow"]),
    ...mapActions(useQuizStore, ["setForm", "onCreate"]),
    ...mapActions(useLmsTugasStore, ["onAktivitas"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
    },
    dummyOnCreate(quiz) {

      // this.dialog_result = true;

      return;

      const local = localStorage.getItem('record_quiz_'+quiz+'2')

      console.log('local', JSON.parse(local))

      this.setForm(JSON.parse(local))

      this.onCreate(quiz, this.$route?.params?.slug);
    }
  },

};
