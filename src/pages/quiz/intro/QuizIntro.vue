<template>
  <q-page id="Intro"
    class="flex flex-center bg-transparent row q-pa-sm animate__animated animate__bounce animate__faster">

    <q-card v-if="get_init_show && get_aktivitas_tugasable?.kategori" class="card-shadow card-border-radius game">
      <q-card-section>
        <div class="title">📘 Present Tense</div>
        <div class="subtitle">Belajar Bahasa Inggris Jadi Seru!</div>
      </q-card-section>

      <q-separator></q-separator>

      <!-- <q-card-section class="q-pb-none" align="center">
        <div class="level">⭐ LEVEL EASY</div>
      </q-card-section> -->

      <q-card-section>
        <div class="stats" v-html="info"></div>

        <!-- <button @click="startQuiz">🚀 MULAI BELAJAR</button> -->

        <q-btn class="quiz-button" color="primary" @click="startQuiz">
          🚀 MULAI BELAJAR
        </q-btn>

        <!-- <q-card-section class="q-pb-none" align="center">
          <div class="footer">
            Ayo jadi jago English! ✨
          </div>
        </q-card-section> -->

      </q-card-section>
    </q-card>
    <Lottie_1_404 v-else>
      <q-btn round to="/" color="pink" size="xl" icon="home" />
    </Lottie_1_404>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useAuthStore } from "src/stores/auth/AuthStore";
import { useLmsTugasStore } from "src/stores/lms/LmsTugasStore";

export default {
  async preFetch({ store, currentRoute }) {
    const slug = currentRoute.params?.slug || ''; // tugas_id
    const mystore = useLmsTugasStore(store)
    if (!mystore.get_aktivitas_tugasable?.konten) await mystore.onAktivitas(slug)
  },
  computed: {
    ...mapState(useLmsTugasStore, {
      get_aktivitas_payload: "get_aktivitas_payload",
      get_aktivitas_tugasable: "get_aktivitas_tugasable",
      get_init_show: "get_init_show",
    }),
  },
  data() {
    return {
      info: `<div>📦 Bank Soal <span>100 soal</span></div>
          <div>🧩 Quiz <span>10 soal acak</span></div>
          <div>⏱️ Waktu <span>60 detik / soal</span></div>
          <div>🎯 Mode <span>Menyusun</span></div>
          <div>❌ Salah <span>-20 poin</span></div>
          <div>✔️ Benar <span>+100 poin</span></div>
          <div>⏰ Time-up <span>-50 poin</span></div>`
    }
  },
  mounted() {
    console.log('this.get_aktivitas_payload', this.get_aktivitas_tugasable)
  },
  methods: {
    startQuiz() {
      const vm = this;

      const quiz = vm.get_aktivitas_tugasable?.kategori
      const slug = vm.$route?.params?.slug

      const route = {
        name: 'quiz_action_' + quiz,
        params: {
          slug,
        }
      }

      console.log(route)

      Swal.fire({
        title: "🎉 Siap bermain?",
        text: "Kerjakan quiz hingga tuntas",
        icon: "question",
        confirmButtonText: "AYO...!!! MULAI",
        cancelButtonText: "NANTI DULU",
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#f97316"
      }).then(result => {
        if (result.isConfirmed) {

          vm.$router.push(route)
        }
      });
    }
  }
}

</script>

<style lang="scss">
#Intro {


  @keyframes pop {
    from {
      transform: scale(.8);
      opacity: 0
    }

    to {
      transform: scale(1);
      opacity: 1
    }
  }


  .level {
    background: rgb(253 224 71 / 50%);
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    font-weight: bold;
    // margin: 16px 0;
  }





  .footer {
    font-size: 13px;
    color: #64748b;
    // margin-top: 14px;
  }

  /* FIX SWEETALERT2 FLEX CENTER BUG */
  body.swal2-height-auto {
    height: 100vh !important;
  }
}
</style>
