document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     GLOBAL WINDOW BEHAVIOR
  ========================== */

  const windows = document.querySelectorAll(".mac-window");
  const trash = document.querySelector(".trash");

  let zIndex = 100;

  windows.forEach(win => {
    const titleBar = win.querySelector(".title-bar");

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    if (!titleBar) return;

    titleBar.addEventListener("mousedown", (e) => {
      dragging = true;

      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      win.style.position = "absolute";

      zIndex++;
      win.style.zIndex = zIndex;
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;

      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
      dragging = false;

      if (!trash) return;

      const w = win.getBoundingClientRect();
      const t = trash.getBoundingClientRect();

      const overlap =
        w.right > t.left &&
        w.left < t.right &&
        w.bottom > t.top &&
        w.top < t.bottom;

      if (overlap) {
        win.style.display = "none";
      }
    });
  });


  /* =========================
     ICON SYSTEM
  ========================== */

  const icons = document.querySelectorAll(".icon-item");
  const previewImg = document.getElementById("preview-image");
  const previewName = document.getElementById("preview-name");
  const previewDesc = document.getElementById("preview-desc");

  icons.forEach(icon => {
    icon.addEventListener("click", () => {

      icons.forEach(i => i.classList.remove("selected"));
      icon.classList.add("selected");

      if (!previewImg || !previewName || !previewDesc) return;

      previewImg.src = icon.querySelector("img").src;
      previewName.textContent = icon.dataset.name;
      previewDesc.textContent = icon.dataset.desc;
    });
  });


  /* =========================
     WINDOW OPEN / CLOSE
  ========================== */

  const openIconsBtn = document.getElementById("open-icons");
  const openTypographyBtn = document.getElementById("open-typography");
  const openApplicationsBtn = document.getElementById("open-applications");

  const iconsLibrary = document.getElementById("icons-library");
  const iconsPreview = document.getElementById("icons-preview");
  const typographyWindow = document.getElementById("typography-window");
  const typePreview = document.getElementById("type-preview");
  const applicationsWindow = document.getElementById("applications-window");

  function closeAll() {
    document.querySelectorAll(".mac-window").forEach(w => {
      w.classList.add("hidden");
    });
  }

  if (openIconsBtn) {
    openIconsBtn.addEventListener("click", () => {
      closeAll();
      iconsLibrary?.classList.remove("hidden");
      iconsPreview?.classList.remove("hidden");
    });
  }

  if (openTypographyBtn) {
    openTypographyBtn.addEventListener("click", () => {
      closeAll();
      typographyWindow?.classList.remove("hidden");
    });
  }

  if (openApplicationsBtn) {
    openApplicationsBtn.addEventListener("click", () => {
      closeAll();
      applicationsWindow?.classList.remove("hidden");
    });
  }


  /* =========================
     TYPOGRAPHY SYSTEM (FIXED SCALE)
  ========================== */

  const typeItems = document.querySelectorAll(".type-item");

  const typeName = document.getElementById("type-name");
  const typeDesc = document.getElementById("type-desc");
  const typeSample = document.getElementById("type-sample");
  const typeSize = document.getElementById("type-size");
  const charsetWindow = document.getElementById("charset-window");
  const charsetSample = document.getElementById("charset-sample");

  if (!typeItems.length) return;


  function fitTextToWindow() {
    const padding = 40;
    const maxHeight =
      typePreview.querySelector(".preview-content").clientHeight - padding;

    const size = parseInt(typeSize.value);

    typeSample.style.fontSize = size + "px";

    // only warn constraint visually instead of forcing shrink
    if (typeSample.scrollHeight > maxHeight) {
      typeSample.style.outline = "1px solid red"; // optional debug indicator
    } else {
      typeSample.style.outline = "none";
    }
  }


  typeItems.forEach(item => {
    item.addEventListener("click", () => {

      typeItems.forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");

      const name = item.dataset.name;
      const desc = item.dataset.desc;
      const fontClass = item.querySelector("p").classList[1];

      if (typeName) typeName.textContent = name;
      if (typeDesc) typeDesc.textContent = desc;

      if (typeSample) {
        typeSample.className = "";
        typeSample.classList.add(fontClass);
      }

      if (charsetSample) {
        charsetSample.className = "";
        charsetSample.classList.add(fontClass);
      }

      if (typeName) typeName.className = fontClass;
      if (typeDesc) typeDesc.className = fontClass;

      if (typePreview) {
        typePreview.classList.remove("hidden");
        typePreview.style.left = "500px";
        typePreview.style.top = "100px";
      }

      if (charsetWindow) {
        charsetWindow.classList.remove("hidden");
        charsetWindow.style.left = "900px";
        charsetWindow.style.top = "160px";
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(fitTextToWindow);
      });
    });
  });


  if (typeSize) {
    typeSize.addEventListener("input", fitTextToWindow);
  }

});