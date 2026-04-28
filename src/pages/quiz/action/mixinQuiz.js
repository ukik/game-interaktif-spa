import { mapActions, mapState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
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
    onBubbleEvent(val) {
      console.log("onBubbleEvent", val);
    },
  },
  async mounted() {
  },
};
