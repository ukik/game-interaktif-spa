<template>
  <q-page id="Report" class="q-my-sm q-card--bordered card-border-radius">
    <!-- Toolbar di dalam page -->

    <div class="q-pa-sm q-pt-md">
      <div class="title">🎉 Quiz Result</div>
      <div class="subtitle">Hasil Matching Progress</div>
    </div>
    <q-separator class="q-mt-md"></q-separator>
    <div class="q-pa-sm">
      <div class="full-width row justify-center">
        <div class="rank-box bg-yellow-2 shadow-2 col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-8">
          <div class="rank-title">🏆 Ranking</div>
          <div class="rank-grade" id="rankGrade">-</div>
          <div class="rank-desc" id="rankDesc">-</div>
        </div>
      </div>

      <div class="summary row q-col-gutter-sm justify-center">
        <div class="col-3 col-lg-3 col-md-3 col-sm-3 col-xs-6">
          <div class="card bg-red-2">Total Lembar Soal<span id="sumSoal">-</span></div>
        </div>
        <div class="col-3 col-lg-3 col-md-3 col-sm-3 col-xs-6">
          <div class="card bg-green-2">Total Unit Soal<span id="sumAnswered">-</span></div>
        </div>
        <div class="col-3 col-lg-3 col-md-3 col-sm-3 col-xs-6">
          <div class="card bg-purple-2">Total Benar<span id="sumCorrect">-</span></div>
        </div>
        <div class="col-3 col-lg-3 col-md-3 col-sm-3 col-xs-6">
          <div class="card bg-orange-2">Total Salah<span id="sumTimeout">-</span></div>
        </div>
        <div class="col-3 col-lg-3 col-md-3 col-sm-3 col-xs-6">
          <div class="card bg-cyan-2">Total Score<span id="sumScore">-</span></div>
        </div>
        <div class="col-3 col-lg-3 col-md-3 col-sm-3 col-xs-6">
          <div class="card bg-teal-2">Total Sisa Waktu<span id="sumTime">-</span></div>
        </div>
        <div class="col-3 col-lg-3 col-md-3 col-sm-3 col-xs-6">
          <div class="card bg-amber-2">Total Percobaan Jawab<span id="sumCheck">-</span></div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Lembar Soal</th>
            <th>Urutan Soal</th>
            <th>Status</th>
            <th>Perubahan Score</th>
            <th>Sisa Waktu</th>
            <th>Percobaan Jawab</th>
            <th>Score Minus</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>

      <canvas id="scoreChart"></canvas>
      <canvas id="timeChart"></canvas>
      <canvas id="checkChart"></canvas>
      <canvas id="minusChart"></canvas>
      <canvas id="statusChart"></canvas>

      <!-- ===== AGGREGATE PER SOAL ===== -->
      <h3 style="margin-top:50px;text-align:center">📊 Rekap Per Lembar</h3>

      <canvas id="aggScoreChart"></canvas>
      <canvas id="aggTimeChart"></canvas>
      <canvas id="aggCheckChart"></canvas>
      <canvas id="aggMinusChart"></canvas>

      <!-- <div class="retry-wrap">
        <button class="retry-btn" onclick="retryQuiz()">📑 Coba Lagi</button>
      </div> -->
    </div>
  </q-page>
</template>

<script>

export default {
  mounted() {
    const data = JSON.parse(localStorage.getItem("record_quiz_matching"));
    /* ===== SORT BLOCK QUESTION 1–15 ===== */
    //data.question.sort((a, b) => a.current_block_question - b.current_block_question);

    if (!data) {
      alert("Data record_quiz_matching tidak ditemukan");
      throw new Error("Data kosong");
    }

    /* SUMMARY */
    sumSoal.textContent = data.total_question;
    sumAnswered.textContent = data.question.length;
    sumScore.textContent = data.total_current_score;
    sumTime.textContent = data.total_time_left+' s';
    sumCheck.textContent = data.total_check_trail;

    const salahCount = data.question.filter(q => q.status_question === "salah").length;
    sumTimeout.textContent = salahCount;

    /* TABLE */
    const tbody = document.getElementById("tableBody");
    data.question.forEach((q, i) => {
      tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${q.current_question}</td>
        <td>${q.current_block_question}</td>
        <td class="status-${q.status_question === "berhasil" ? "benar" : "salah"}">
          ${q.status_question}
        </td>
        <td>${q.current_score}</td>
        <td>${q.time_left} s</td>
        <td>${q.check_trial}</td>
        <td>${q.current_minus_score}</td>
      </tr>`;
    });

    /* DATA CHART */
    const labels = data.question.map((_, i) => `Soal ${i + 1}`);
    const scores = data.question.map(q => q.current_score);
    const times = data.question.map(q => q.time_left);
    const checks = data.question.map(q => q.check_trial);
    const minus = data.question.map(q => -Math.abs(q.current_minus_score));

    new Chart(scoreChart, {
      type: "line", data: {
        labels, datasets: [{
          label: "Distribusi Score", data: scores, borderColor: "#f97316", fill: true
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: "normal" } }
          }
        },
        scales: {
          x: { ticks: { font: { size: 14 } } },
          y: { ticks: { font: { size: 14 } } }
        }
      }
    });
    new Chart(timeChart, {
      type: "bar", data: {
        labels, datasets: [{
          label: "Distribusi Sisa Waktu", data: times, backgroundColor: "#3b82f6"
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: "normal" } }
          }
        },
        scales: {
          x: { ticks: { font: { size: 14 } } },
          y: { ticks: { font: { size: 14 } } }
        }
      }
    });
    new Chart(checkChart, {
      type: "bar", data: { labels, datasets: [{ label: "Distribusi Percobaan Jawab", data: checks, backgroundColor: "#22c55e" }] },
      options: {
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: "normal" } }
          }
        },
        scales: {
          x: { ticks: { font: { size: 14 } } },
          y: { ticks: { font: { size: 14 } } }
        }
      }
    });
    new Chart(minusChart, {
      type: "bar", data: {
        labels, datasets: [{
          label: "Distribusi Minus Score", data: minus, backgroundColor: "#ef4444"
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: "normal" } }
          }
        },
        scales: {
          x: { ticks: { font: { size: 14 } } },
          y: { ticks: { font: { size: 14 } } }
        }
      }
    });

    const benarCount = data.question.filter(q => q.status_question === "berhasil").length;
    sumCorrect.textContent = benarCount;

    new Chart(statusChart, {
      type: "doughnut",
      data: {
        labels: [`Benar (${benarCount})`, `Salah (${salahCount})`],
        datasets: [{
          data: [benarCount, salahCount],
          backgroundColor: ["#22c55e", "#ef4444"],
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Rasio Soal",
            font: { size: 16, weight: "normal" },
            padding: { top: 10, bottom: 20 }
          },
          legend: {
            position: "bottom",
            labels: { font: { size: 14, weight: "normal" } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.raw} soal`
            }
          }
        },
        cutout: "55%"
      }
    });


    /* RANK */
    function getRank(correct) {
      const max = data.question.length; // nilai maksimal
      const steps = 9; // jumlah grade: +A, A, +B, B, +C, C, +D, D, E
      const interval = max / (steps - 1); // jarak tiap tangga

      // buat array batas tiap grade (rounded ke atas supaya aman)
      const limits = Array.from({ length: steps }, (_, i) =>
        Math.round(i * interval)
      );

      // grade labels sesuai pola
      const grades = ["A+", "A", "B+", "B", "C+", "C", "D+", "D", "E"];
      const descriptions = [
        "Perfect! Semua soal benar",
        "Hampir sempurna",
        "Sangat bagus",
        "Bagus",
        "Cukup",
        "Perlu latihan",
        "Kurang",
        "Sangat kurang",
        "Perlu belajar lagi",
      ];

      // cari grade sesuai correct
      for (let i = 0; i < steps; i++) {
        if (correct >= limits[steps - 1 - i]) {
          return { g: grades[i], d: descriptions[i] };
        }
      }

      return { g: "E", d: "Perlu belajar lagi" };
    }

    const rank = getRank(benarCount);

    rankGrade.textContent = rank.g;
    rankDesc.textContent = `${benarCount} soal berhasil`;
    rankDesc.textContent =
      `${benarCount} / ${data.question.length} soal benar — ${rank.d}`;

    function retryQuiz() {
      localStorage.removeItem("record_quiz_matching");
      location.href = "index.html";
    }

    /* ===== AGGREGATE DATA PER current_question ===== */
    const agg = {};

    data.question.forEach(q => {
      const k = q.current_question;
      if (!agg[k]) {
        agg[k] = {
          score: 0,
          time: 0,
          check: 0,
          minus: 0
        };
      }
      agg[k].score += q.current_score;
      agg[k].time += q.time_left;
      agg[k].check += q.check_trial;
      agg[k].minus += q.current_minus_score;
    });

    /* LABEL */
    const qLabels = Object.keys(agg).map(q => `Lembar ${q}`);
    const qScores = Object.values(agg).map(v => v.score);
    const qTimes = Object.values(agg).map(v => v.time);
    const qChecks = Object.values(agg).map(v => v.check);
    const qMinus = Object.values(agg).map(v => -Math.abs(v.minus));

    /* ===== CHART AGGREGATE ===== */
    new Chart(aggScoreChart, {
      type: "bar",
      data: {
        labels: qLabels,
        datasets: [{
          label: "Total Score per Lembar Soal",
          data: qScores,
          backgroundColor: "#f59e0b"
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: "normal" } }
          }
        },
        scales: {
          x: { ticks: { font: { size: 14 } } },
          y: { ticks: { font: { size: 14 } } }
        }
      }
    });

    new Chart(aggTimeChart, {
      type: "bar",
      data: {
        labels: qLabels,
        datasets: [{
          label: "Total Waktu per Lembar Soal",
          data: qTimes,
          backgroundColor: "#3b82f6"
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: "normal" } }
          }
        },
        scales: {
          x: { ticks: { font: { size: 14 } } },
          y: { ticks: { font: { size: 14 } } }
        }
      }
    });

    new Chart(aggCheckChart, {
      type: "bar",
      data: {
        labels: qLabels,
        datasets: [{
          label: "Total Percobaan Jawab per Lembar Soal",
          data: qChecks,
          backgroundColor: "#22c55e"
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: "normal" } }
          }
        },
        scales: {
          x: { ticks: { font: { size: 14 } } },
          y: { ticks: { font: { size: 14 } } }
        }
      }
    });

    new Chart(aggMinusChart, {
      type: "bar",
      data: {
        labels: qLabels,
        datasets: [{
          label: "Total Minus Score per Lembar Soal",
          data: qMinus,
          backgroundColor: "#ef4444"
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: "normal" } }
          }
        },
        scales: { y: { ticks: { font: { size: 14 } }, beginAtZero: true }, x: { ticks: { font: { size: 14 } } } }
      },
    });

  },
};
</script>

<style lang="scss">
/* .container {
  padding: 20px;
  max-width: 650px;
  margin: auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
} */
#Report {
  // .summary {
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: center;
  //   gap: 12px;
  // }

  // .card {
  //   flex: 1 1 27.5% !important;
  //   max-width: 27.5%;
  // }

  // @media (max-width: 600px) {
  //   .card {
  //     flex: 1 1 27.5% !important;
  //     max-width: 100%;
  //   }
  // }
  // @media (max-width: 375px) {
  //   .card {
  //     flex: 1 1 100% !important;
  //     max-width: 100%;
  //   }
  // }

  .card {
    background: linear-gradient(135deg, #fef08a, #fbbf24);
    border-radius: 12px;
    padding: 14px;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .card span {
    display: block;
    font-size: 25px;
    margin-top: 6px;
    color: #1e3a8a;
  }

  table {
    border: 1px solid #fcd34d;
    width: 100%;
    border-collapse: collapse;
    margin-top: 24px;
    background: #fff;
  }

  th,
  td {
    border: 1px solid #fcd34d;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }

  th {
    background: #fbbf24;
    color: #fff;
  }

  .status-benar {
    color: #16a34a;
  }

  .status-salah {
    color: #dc2626;
  }

  canvas {
    margin-top: 30px;
    background: #fff;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #fcd34d;
  }

  @media (max-width: 600px) {
    canvas {
      // height: 350px !important;
    }

    table {
      display: block;
      overflow-x: auto;
      width: 100%;
    }
  }

  .retry-wrap {
    margin-top: 40px;
    text-align: center;
  }

  .retry-btn {
    padding: 14px 28px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    color: #fff;
    background: linear-gradient(135deg, #22c55e, #4ade80);
    box-shadow: 0 10px 25px rgba(34, 197, 94, 0.45);
  }

  /* ===== RANKING ===== */
  .rank-box {
    margin: 20px 0 30px;
    padding: 20px;
    text-align: center;
    border-radius: 20px;
    // background: linear-gradient(135deg, #fde68a, #fbbf24);
    // background: linear-gradient(135deg, #d9f99d, #84cc16);
    // box-shadow: 0 10px 25px rgba(251, 191, 36, .45);
  }

  .rank-title {
    font-size: 18px;
    font-weight: bold;
    // color: #92400e;
  }

  .rank-grade {
    font-size: 56px;
    font-weight: 900;
    margin: 8px 0;
    color: #1e3a8a;
  }

  .rank-desc {
    font-size: 14px;
    font-weight: bold;
    // color: #7c2d12;
  }
}
</style>
