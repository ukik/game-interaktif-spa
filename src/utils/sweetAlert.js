
export function QuizActionBeforeRouteLeave(next) {
  Swal.fire({
    // 🎉
    title: "Keluar dari Quiz?",
    text: "Kamu harus mengulang dari awal jika keluar sekarang.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Lanjut",
    cancelButtonText: "Keluar",
    confirmButtonColor: "#22c55e",
    cancelButtonColor: "#f97316",

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
