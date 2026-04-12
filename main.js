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

const trash = document.querySelector(".trash");

document.addEventListener("mouseup", () => {
  if (!isDragging) return;

  isDragging = false;

  const windowRect = windowEl.getBoundingClientRect();
  const trashRect = trash.getBoundingClientRect();

  const isOverlapping =
    windowRect.right > trashRect.left &&
    windowRect.left < trashRect.right &&
    windowRect.bottom > trashRect.top &&
    windowRect.top < trashRect.bottom;

  if (isOverlapping) {
    // delete window
    windowEl.style.display = "none";
  }
});

})

/* WORKS - ICONS */

const icons = document.querySelectorAll(".icon-item");
const previewImg = document.getElementById("preview-image");
const previewName = document.getElementById("preview-name");
const previewDesc = document.getElementById("preview-desc");

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const img = icon.querySelector("img").src;
    const name = icon.dataset.name;
    const desc = icon.dataset.desc;

    previewImg.src = img;
    previewName.textContent = name;
    previewDesc.textContent = desc;
  });
});