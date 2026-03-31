
export default function moveGhost(e, ghost) {
  const isTouch = e.pointerType === "touch";

  // Offset khusus mobile agar ghost tidak ketutup jari
  const offsetX = isTouch ? 0 : 0;
  const offsetY = isTouch ? 70 : 0;

  ghost.style.left = e.clientX + offsetX + "px";
  ghost.style.top = e.clientY - offsetY + "px";
}
