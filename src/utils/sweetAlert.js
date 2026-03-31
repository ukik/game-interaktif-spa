
export function QuizActionBeforeRouteLeave(next) {
  Swal.fire({
    title: "🎉 Yakin mau keluar?",
    text: "Kamu belum menyelesaikan Quiz!",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "YA, GAS!",
    cancelButtonText: "NANTI DULU",
    confirmButtonColor: "#22c55e",
    cancelButtonColor: "#f97316"
  }).then(result => {
    if (result.isConfirmed) {
      next()       // lanjut keluar
    } else {
      next(false)  // batal
    }
  });
}
