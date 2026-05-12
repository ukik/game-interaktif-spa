
export function QuizActionBeforeRouteLeave(next) {
  Swal.fire({
    // 🎉
    title: "Keluar dari Quiz?",
    text: "Kamu harus mengulang dari awal jika keluar sekarang.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "KELUAR",
    cancelButtonText: "TUTUP",
    confirmButtonColor: "red", //"#22c55e",
    cancelButtonColor: "green", //"#f97316",

    // ✅ ini kunci
    reverseButtons: true,
    buttonsStyling: true,

  }).then(result => {
    if (result.isConfirmed) {
      next()       // lanjut keluar
    } else {
      next(false)  // batal
    }
  });
}


export function AlertSuccess() {
  Swal.fire({
    icon: "success",
  })
}
