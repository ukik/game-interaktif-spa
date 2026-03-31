import confetti from "./confetti";

export default function playTrueFX() {
  const base = document.getElementById("successSound");
  const snd = base.cloneNode(true);
  snd.volume = 0.7;
  confetti();
  try {
    snd.play();
  } catch (e) { }
}
