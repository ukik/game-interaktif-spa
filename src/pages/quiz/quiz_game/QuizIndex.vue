<template>
  <q-page id="QuizIndex" class="q-my-sm row justify-center bg-transparent">
    <!-- Toolbar di dalam page -->

    <div class="q-pa-sm game">

      <h1>🎯 Kids Quiz – Pilih Quiz</h1>

      <div class="card-container">
        <template v-for="(item, index) in lists">
          <QuizIndexCard :payload='item' />
        </template>
      </div>

    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          title: "📘 Present Tense",
          snippet: "Belajar Bahasa Inggris Jadi Seru!",
          level: "⭐ LEVEL MEDIUM",
          info: `<div>🧩 Quiz: <span>15 soal acak</span></div>
              <div>⏱️ Waktu: <span>180 detik / lembar</span></div>
              <div>🎯 Mode: <span>Mencocokkan</span></div>`,
          route: "quiz_intro_arrange",
          quiz: "quiz_action_match"
        },
        {
          title: "📘 Present Tense",
          snippet: "Belajar Bahasa Inggris Jadi Seru!",
          level: "⭐ LEVEL EASY",
          info: `<div>🧩 Quiz: <span>10 soal acak</span></div>
            <div>⏱️ Waktu: <span>60 detik / soal</span></div>
            <div>🎯 Mode: <span>Menyusun</span></div>`,
          route: "quiz_intro_arrange",
          quiz: "quiz_action_arrange"
        },
        {
          title: "📘 Present Tense",
          snippet: "Belajar Bahasa Inggris Jadi Seru!",
          level: "⭐ LEVEL EASY",
          info: `<div>🧩 Quiz: <span>15 soal acak</span></div>
            <div>⏱️ Waktu: <span>100 detik / lembar</span></div>
            <div>🎯 Mode: <span>Benar / Salah</span></div>`,
          route: "quiz_intro_arrange",
          quiz: "quiz_action_boolean"
        },
        {
          title: "📘 Present Tense",
          snippet: "Belajar Bahasa Inggris Jadi Seru!",
          level: "⭐ LEVEL EASY",
          info: `<div>🧩 Quiz: <span>15 soal acak</span></div>
            <div>⏱️ Waktu: <span>30 detik / soal</span></div>
            <div>🎯 Mode: <span>Pilihan Ganda</span></div>`,
          route: "quiz_intro_arrange",
          quiz: "quiz_action_multiple"
        },
        {
          title: "📘 Present Tense",
          snippet: "Belajar Bahasa Inggris Jadi Seru!",
          level: "⭐ LEVEL HARD",
          info: `<div>🧩 Quiz: <span>15 soal acak</span></div>
            <div>⏱️ Waktu: <span>90 detik / soal</span></div>
            <div>🎯 Mode: <span>Isian Singkat</span></div>`,
          route: "quiz_intro_arrange",
          quiz: "quiz_action_short_answer"
        },
        {
          title: "📘 Teknologi Informasi",
          snippet: "Belajar Ilmu Pengetahuan Jadi Seru!",
          level: "⭐ LEVEL VERY HARD",
          info: `<div>🧩 Quiz: <span>10 soal acak</span></div>
            <div>⏱️ Waktu: <span>120 detik / soal</span></div>
            <div>🎯 Mode: <span>Essay</span></div>`,
          route: "quiz_intro_arrange",
          quiz: "quiz_action_essay"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#QuizIndex {
  h1 {
    color: #fff;
    text-align: center;
    font-size: 32px;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 700px;
  }

  .quiz-card {
    background: #ffffff;
    border-radius: 24px;
    // padding: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .quiz-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  .quiz-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .quiz-snippet {
    font-size: 16px;
    color: #475569;
    margin-bottom: 12px;
  }

  .quiz-level {
    display: inline-block;
    background: rgb(253 224 71 / 50%);
    padding: 6px 14px;
    border-radius: 999px;
    font-weight: bold;
    // margin-bottom: 12px;
  }



  .quiz-card button {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border: none;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    padding: 12px;
    width: 100%;
    border-radius: 16px;
    cursor: pointer;
    transition: transform .2s, box-shadow .2s;
  }

  .quiz-card button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}
</style>
