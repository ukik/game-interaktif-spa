<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  font-family: Inter, sans-serif;
  background: #f4f7fb;
  color: #374151;
  line-height: 1.7;
}

.container {
  /* min-width: 80%; */
  margin: auto;
  padding: 50px 20px;
}

.header {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #fff;
  border-radius: 18px;
  padding: 40px;
  margin-bottom: 35px;
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.18);
}

.header h1 {
  font-size: 38px;
  font-weight: 800;
  line-height: 3.5rem;
}

.header p {
  margin-top: 15px;
  margin-bottom: 10px;
  opacity: 0.8;
  font-size: 18px;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 18px;
  border-left: 6px solid #2563eb;
  padding-left: 15px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 22px;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: 0.25s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.card h3 {
  color: #1d4ed8;
  margin-bottom: 8px;
  font-size: 20px;
}

.card h4 {
  color: #111827;
  margin: 18px 0 10px;
  font-size: 16px;
}

.card p {
  color: #6b7280;
  font-size: 15px;
}

ul {
  margin-top: 10px;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

.feature {
  background: #eff6ff;
  border-left: 4px solid #2563eb;
  padding: 12px;
  border-radius: 10px;
  margin-top: 12px;
}

.footer {
  margin-top: 50px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
}

.badge {
  display: inline-block;
  background: #2563eb;
  color: #fff;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}
</style>

<template>
  <q-page class="col-12 row flex flex-center">
    <AnnouncementView></AnnouncementView>
  </q-page>
</template>

<script>
import AnnouncementView from 'src/components/lms/AnnouncementView.vue';
</script>
