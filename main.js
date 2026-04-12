document.addEventListener('DOMContentLoaded', function() {

const windowEl = document.querySelector(".mac-window");
const titleBar = document.querySelector(".title-bar");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;

  const rect = windowEl.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  windowEl.style.position = "absolute";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  windowEl.style.left = `${e.clientX - offsetX}px`;
  windowEl.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

})