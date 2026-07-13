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
    <div class="body col-12 col-xs-12 col-sm-12 col-md-10 col-lg-8 col-xl-7">
      <div class="container">
        <div class="header">
          <!-- <div class="badge">RELEASE</div> -->
          <h1>Release Announcement v1.0.0</h1>
          <p>LABSNIP | Sosial Interaktif Learning - Jadi Pintar Itu Hebat</p>
        </div>

        <!-- USERS -->

        <section class="section">
          <h2 class="section-title">A. Users</h2>

          <div class="grid">
            <div class="card">
              <h3>👑 Administrator</h3>
              <p>Pengguna dengan hak akses penuh untuk mengelola seluruh sistem.</p>

              <div class="feature">
                <strong>Akses:</strong>
                <ul>
                  <li>Mengelola seluruh pengguna</li>
                  <li>Mengelola quiz</li>
                  <li>Mengelola sekolah</li>
                  <li>Melihat seluruh laporan</li>
                  <li>Mengatur sistem</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <h3>🏫 Principal</h3>
              <p>Kepala sekolah yang memantau aktivitas pembelajaran.</p>

              <div class="feature">
                <strong>Akses:</strong>

                <ul>
                  <li>Monitoring aktivitas belajar</li>
                  <li>Melihat statistik sekolah</li>
                  <li>Melihat hasil quiz</li>
                  <li>Melihat ranking siswa</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <h3>👨‍🏫 Teacher</h3>

              <p>Guru yang mengelola pembelajaran dan evaluasi siswa.</p>

              <div class="feature">
                <strong>Akses:</strong>

                <ul>
                  <li>Membuat Bank Quiz</li>
                  <li>Mengelola tugas</li>
                  <li>Menilai Essay</li>
                  <li>Melihat hasil siswa</li>
                  <li>Monitoring kelas</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <h3>👨‍👩‍👧 Parent</h3>

              <p>Orang tua yang memantau perkembangan belajar siswa.</p>

              <div class="feature">
                <strong>Akses:</strong>

                <ul>
                  <li>Monitoring nilai</li>
                  <li>Monitoring tugas</li>
                  <li>Monitoring aktivitas belajar</li>
                </ul>
              </div>
            </div>

            <div class="card">
              <h3>🎓 Student</h3>

              <p>Peserta didik yang mengikuti seluruh aktivitas pembelajaran.</p>

              <div class="feature">
                <strong>Akses:</strong>

                <ul>
                  <li>Mengerjakan quiz</li>
                  <li>Melihat nilai</li>
                  <li>Melihat ranking</li>
                  <li>Melihat riwayat quiz</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- GENERAL -->

        <section class="section">
          <h2 class="section-title">B. General Features</h2>

          <div class="grid">
            <div class="card">
              <h3>📊 Dashboard</h3>

              <ul>
                <li>
                  <strong>Metrik Quiz</strong><br />Ringkasan jumlah quiz, peserta, dan
                  aktivitas.
                </li>

                <li>
                  <strong>Statistik Quiz</strong><br />Grafik performa dan perkembangan
                  pembelajaran.
                </li>

                <li>
                  <strong>Tugas Quiz</strong><br />Daftar tugas aktif, selesai, dan
                  mendatang.
                </li>
              </ul>
            </div>

            <div class="card">
              <h3>🔔 Notifications</h3>

              <ul>
                <li><strong>Notifikasi Tugas</strong><br />Tugas baru dan deadline.</li>

                <li>
                  <strong>Notifikasi Hasil</strong><br />Informasi nilai quiz telah
                  tersedia.
                </li>
              </ul>
            </div>

            <div class="card">
              <h3>👤 User Settings</h3>

              <ul>
                <li>Profile Sekolah</li>

                <li>Profile Admin</li>

                <li>Profile Teacher</li>

                <li>Profile Principal</li>

                <li>Profile Parent</li>

                <li>Profile Student</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- QUIZ -->

        <section class="section">
          <h2 class="section-title">C. Quiz Features</h2>

          <div class="grid">
            <div class="card">
              <h3>STEP 1</h3>

              <h4>📚 Bank Quiz</h4>

              <p>Pusat pengelolaan berbagai jenis soal quiz</p>

              <ul>
                <li>Arrange</li>

                <li>Boolean</li>

                <li>Match</li>

                <li>Multiple Choice</li>

                <li>Short Answer</li>

                <li>Essay</li>
              </ul>
            </div>

            <div class="card">
              <h3>STEP 2</h3>

              <h4>📝 Quiz Result</h4>

              <p>Penilaian otomatis / manual sesuai tipe soal.</p>

              <ul>
                <li>Arrange</li>

                <li>Boolean</li>

                <li>Match</li>

                <li>Multiple Choice</li>

                <li>Short Answer</li>

                <li>Essay</li>
              </ul>
            </div>

            <div class="card">
              <h3>STEP 3</h3>

              <h4>🏆 Ranking Quiz</h4>

              <p>Peringkat peserta berdasarkan jenis quiz.</p>

              <ul>
                <li>Arrange</li>

                <li>Boolean</li>

                <li>Match</li>

                <li>Multiple Choice</li>

                <li>Short Answer</li>

                <li>Essay</li>
              </ul>
            </div>

            <div class="card">
              <h3>🎮 Gameplay Quiz</h3>

              <ul>
                <li><strong>Intro</strong><br />Petunjuk sebelum quiz dimulai.</li>

                <li>
                  <strong>Action</strong><br />Proses mengerjakan quiz secara interaktif.
                </li>

                <li>
                  <strong>Report</strong><br />Ringkasan hasil setelah quiz selesai.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- AUDIO -->

        <section class="section">
          <h2 class="section-title">E. Audio Effects</h2>

          <div class="grid">
            <div class="card">
              <h3>🔊 Audio Feedback</h3>

              <ul>
                <li>✅ Sound Benar</li>

                <li>❌ Sound Salah</li>

                <li>⏰ Time's Up</li>
              </ul>
            </div>
          </div>
        </section>

        <div class="footer">Release Version 1.0.0 © LABSNIP</div>
      </div>
    </div>
  </q-page>
</template>
