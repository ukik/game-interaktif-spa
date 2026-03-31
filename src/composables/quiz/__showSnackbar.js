
/* ================= SNACKBAR ================= */
export default function showSnackbar(msg, type = "success", duration = 1800) {
  const container = document.getElementById("snackbar-container");

  const bar = document.createElement("div");
  bar.className = `snackbar ${type}`;
  bar.textContent = msg;

  // ⬇️ JANGAN SET INLINE STYLE
  container?.appendChild(bar);

  // ⛔ PAKSA BROWSER BACA STATE AWAL (.snackbar)
  bar.getBoundingClientRect();

  // ⬆️ BARU TRANSISI KE .show
  bar.classList.add("show");

  setTimeout(() => {
    bar.classList.remove("show");
    setTimeout(() => bar.remove(), 450);
  }, duration);

  /* === RECORD SAAT SNACKBAR MUNCUL === */
  // const currentItems = questions.filter(
  //   (q) => q.current_question === currentSheetSoal
  // );

  // const currentBlockId = activeBlockId;

  // recordQuizEvent({
  //   current_question: currentSheetSoal,
  //   current_block_question: currentBlockId,
  //   status_question: type === "success" ? "berhasil" : "salah",
  //   current_score: score,
  //   time_left: timeLeft,
  //   check_trial: type === "error" ? 1 : 0,
  //   current_minus_score: type === "error" ? 20 : 0,
  // });
}


/* === RECORD EVENT (TRIGGERED WITH SNACKBAR) === */
function recordQuizEvent({
  current_block_question,
  current_question,
  status_question,
  current_score,
  time_left,
  check_trial,
  current_minus_score,
}) {
  const data = JSON.parse(localStorage.getItem(LS_KEY));

  /* === UPDATE TOTAL === */
  data.total_current_score = current_score;
  data.total_check_trail += check_trial;

  if (status_question === "berhasil") {
    data.total_time_left += time_left;
  }

  const index = data.question.findIndex(
    (q) => q.current_block_question === current_block_question
  );

  if (index > -1) {
    const prev = data.question[index];

    // 🔒 JANGAN TURUNKAN STATUS DARI BERHASIL KE SALAH
    if (prev.status_question === "berhasil" && status_question === "salah") {
      return;
    }

    /* === UPDATE + AKUMULASI MINUS === */
    data.question[index] = {
      ...prev,
      status_question,
      current_score,
      time_left,
      check_trial: prev.check_trial + check_trial,
      current_minus_score: -(prev.current_minus_score + current_minus_score),
    };
  } else {
    /* === INSERT BARU === */
    data.question.push({
      current_question,
      current_block_question,
      status_question,
      current_score,
      time_left,
      check_trial,
      current_minus_score: current_minus_score <= 0 ? 0 : -current_minus_score,
    });
  }

  localStorage.setItem(LS_KEY, JSON.stringify(data));
}
