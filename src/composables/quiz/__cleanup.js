export default function cleanup(ghost, dragged) {
  ghost && ghost.remove();
  ghost = null;
  dragged && dragged.classList.remove("dragging");
  dragged = null;
}
