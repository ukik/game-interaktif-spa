import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useQuizStore } from "src/stores/lms/form/QuizStore";
import { useLmsBankQuizStore } from "src/stores/lms/LmsBankQuizStore";

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
  },
  methods: {
    ...mapActions(useLmsBankQuizStore, ["onShow"]),
    ...mapActions(useQuizStore, ["setForm"]),
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
    },
  },
  async mounted() {
  },
};
