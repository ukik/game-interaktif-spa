<template>
  <q-card class="quiz-card card-border-radius">
    <q-card-section align="center">
      <div class="quiz-title">{{ payload?.title }}</div>
      <div class="quiz-snippet">{{ payload?.snippet }}</div>
      <div class="quiz-level">{{ payload?.level }}</div>
    </q-card-section>
    <q-separator class="q-mb-md"></q-separator>
    <q-card-section>
      <div class="quiz-info" v-html="payload?.info"></div>
    </q-card-section>
    <q-card-section>
      <q-btn class="quiz-button" color="positive" :to="{ name: payload?.route, query: { quiz: payload?.quiz } }">🚀 MULAI BELAJAR</q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    payload: {},
  }
}
</script>

<style scoped lang="scss">
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
</style>
