export default function shake() {
  const g = document.querySelector(".game");
  g.classList.remove("shake");
  void g.offsetWidth;
  g.classList.add("shake");
}
