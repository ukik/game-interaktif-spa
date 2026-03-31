export default function playErrorFX(type) {
  const game = document.querySelector(".game");
  const base = document.getElementById(type + "Sound");

  // shake
  game.classList.remove("shake");
  void game.offsetWidth;
  game.classList.add("shake");

  // clone audio agar bisa overlap
  const snd = base.cloneNode(true);
  snd.volume = type === "error" ? 0.65 : 0.4;

  try {
    snd.play();
  } catch (e) { }
}
