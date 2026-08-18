document.addEventListener("DOMContentLoaded", () => {
  const clockElement = document.getElementById("clock");
  const customTitleDisplay = document.getElementById("customTitleDisplay");
  const linksGrid = document.getElementById("linksGrid");
  const backgroundImg = document.getElementById("background-img");

  const breadcrumb = document.getElementById("breadcrumb");
  const backBtn = document.getElementById("backBtn");
  const currentFolderName = document.getElementById("currentFolderName");

  const dashboardModal = document.getElementById("dashboardModal");
  const openDashboardBtn = document.getElementById("openDashboardBtn");
  const closeDashboardBtn = document.getElementById("closeDashboardBtn");

  const navBtns = document.querySelectorAll(".nav-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const currentTabTitle = document.getElementById("currentTabTitle");

  const langSelect = document.getElementById("langSelect");
  const customTitleInput = document.getElementById("customTitleInput");
  const saveTitleBtn = document.getElementById("saveTitleBtn");

  const btnWallRandom = document.getElementById("btnWallRandom");
  const btnWallUrlToggle = document.getElementById("btnWallUrlToggle");
  const urlInputContainer = document.getElementById("urlInputContainer");
  const wallpaperUrlInput = document.getElementById("wallpaperUrlInput");
  const saveWallUrlBtn = document.getElementById("saveWallUrlBtn");
  const wallpaperUpload = document.getElementById("wallpaperUpload");
  const paletteContainer = document.getElementById("paletteContainer");

  const blurSlider = document.getElementById("blurSlider");
  const blurValue = document.getElementById("blurValue");

  const addLinkForm = document.getElementById("addLinkForm");
  const typeRadios = document.getElementsByName("itemType");
  const linkTitleInput = document.getElementById("linkTitle");
  const linkUrlInput = document.getElementById("linkUrl");
  const linkIconInput = document.getElementById("linkIcon");
  const targetFolderSelect = document.getElementById("targetFolder");
  const urlGroup = document.getElementById("urlGroup");
  const iconGroup = document.getElementById("iconGroup");
  const manageLinksList = document.getElementById("manageLinksList");

  let currentLang = localStorage.getItem("productTab_lang") || "en";
  let customTitle =
    localStorage.getItem("productTab_customTitle") || "My Setup";
  let currentFolderId = "root";

  let bgType = localStorage.getItem("productTab_bgType") || "random";
  let bgValue = localStorage.getItem("productTab_bgValue") || "";
  let selectedThemeColor = localStorage.getItem("productTab_themeColor") || "";
  let blurIntensity = parseInt(localStorage.getItem("productTab_blur") || "8");

  const defaultData = [
    {
      id: "1",
      type: "link",
      title: "GitHub",
      url: "https://github.com",
      icon: "https://github.githubassets.com/favicons/favicon.png",
    },
    {
      id: "2",
      type: "link",
      title: "YouTube",
      url: "https://youtube.com",
      icon: "https://www.youtube.com/s/desktop/1083cc1c/img/favicon.ico",
    },
    {
      id: "f1",
      type: "folder",
      title: "Social",
      children: [
        {
          id: "3",
          type: "link",
          title: "X",
          url: "https://x.com",
          icon: "https://abs.twimg.com/favicons/twitter.3.ico",
        },
      ],
    },
  ];
  let items =
    JSON.parse(localStorage.getItem("productTab_items")) || defaultData;

  const i18n = {
    en: {
      dashTitle: "Settings",
      navGeneral: "General",
      navAppearance: "Appearance",
      navBookmarks: "Bookmarks",
      lblCustomTitle: "Main Title",
      btnSaveTitle: "Save Title",
      btnSaved: "Saved!",
      lblLanguage: "Language",
      lblBackground: "Background",
      lblBlur: "Blur Intensity",
      lblThemeColors: "Theme Palette",
      lblThemeHelper: "Colors extracted from your background.",
      lblAddItem: "Add Item",
      lblLink: "Link",
      lblFolder: "Folder",
      lblItemTitle: "Title",
      lblItemIcon: "Icon URL (optional)",
      lblIconHelper: "Leave blank to auto-fetch.",
      lblTargetFolder: "Target Folder",
      btnAddItem: "Add Item",
      lblYourItems: "Your Items",
      backText: "Back",
      rootFolder: "Main",
    },
    es: {
      dashTitle: "Ajustes",
      navGeneral: "General",
      navAppearance: "Apariencia",
      navBookmarks: "Marcadores",
      lblCustomTitle: "Título Principal",
      btnSaveTitle: "Guardar Título",
      btnSaved: "¡Guardado!",
      lblLanguage: "Idioma",
      lblBackground: "Fondo",
      lblBlur: "Intensidad de Desenfoque",
      lblThemeColors: "Paleta de Tema",
      lblThemeHelper: "Colores extraídos de tu fondo.",
      lblAddItem: "Añadir Nuevo",
      lblLink: "Enlace",
      lblFolder: "Carpeta",
      lblItemTitle: "Título",
      lblItemIcon: "URL Icono (opc)",
      lblIconHelper: "Dejar en blanco para autocompletar.",
      lblTargetFolder: "Carpeta Destino",
      btnAddItem: "Añadir",
      lblYourItems: "Tus Items",
      backText: "Volver",
      rootFolder: "Main",
    },
    fa: {
      dashTitle: "تنظیمات",
      navGeneral: "عمومی",
      navAppearance: "ظاهر",
      navBookmarks: "نشانک‌ها",
      lblCustomTitle: "عنوان اصلی",
      btnSaveTitle: "ذخیره عنوان",
      btnSaved: "ذخیره شد!",
      lblLanguage: "زبان",
      lblBackground: "پس زمینه",
      lblBlur: "شدت تاری",
      lblThemeColors: "پالت رنگ",
      lblThemeHelper: "رنگ‌های استخراج شده از تصویر",
      lblAddItem: "افزودن آیتم",
      lblLink: "لینک",
      lblFolder: "پوشه",
      lblItemTitle: "عنوان",
      lblItemIcon: "آیکون (اختیاری)",
      lblIconHelper: "خالی بگذارید تا خودکار دریافت شود.",
      lblTargetFolder: "پوشه مقصد",
      btnAddItem: "افزودن",
      lblYourItems: "آیتم‌های شما",
      backText: "بازگشت",
      rootFolder: "اصلی",
    },
  };

  function applyLanguage() {
    const lang = i18n[currentLang];
    document.documentElement.dir = currentLang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;

    document.getElementById("dashTitle").textContent = lang.dashTitle;
    document.getElementById("navGeneral").textContent = lang.navGeneral;
    document.getElementById("navAppearance").textContent = lang.navAppearance;
    document.getElementById("navBookmarks").textContent = lang.navBookmarks;

    document.getElementById("lblCustomTitle").textContent = lang.lblCustomTitle;
    saveTitleBtn.textContent = lang.btnSaveTitle;
    document.getElementById("lblLanguage").textContent = lang.lblLanguage;

    document.getElementById("lblBackground").textContent = lang.lblBackground;
    document.getElementById("lblBlur").textContent = lang.lblBlur;
    document.getElementById("lblThemeColors").textContent = lang.lblThemeColors;
    document.getElementById("lblThemeHelper").textContent = lang.lblThemeHelper;

    document.getElementById("lblAddItem").textContent = lang.lblAddItem;
    document.getElementById("lblLink").textContent = lang.lblLink;
    document.getElementById("lblFolder").textContent = lang.lblFolder;
    document.getElementById("lblItemTitle").textContent = lang.lblItemTitle;
    document.getElementById("lblItemIcon").textContent = lang.lblItemIcon;
    document.getElementById("lblIconHelper").textContent = lang.lblIconHelper;
    document.getElementById("lblTargetFolder").textContent =
      lang.lblTargetFolder;
    document.getElementById("btnAddItem").textContent = lang.btnAddItem;
    document.getElementById("lblYourItems").textContent = lang.lblYourItems;
    document.getElementById("backText").textContent = lang.backText;

    const activeNav = document.querySelector(".nav-btn.active span");
    currentTabTitle.textContent = activeNav
      ? activeNav.textContent
      : lang.navGeneral;

    langSelect.value = currentLang;
    updateFolderDropdown();
  }

  function saveState() {
    localStorage.setItem("productTab_lang", currentLang);
    localStorage.setItem("productTab_customTitle", customTitle);
    localStorage.setItem("productTab_bgType", bgType);
    if (bgType !== "random")
      localStorage.setItem("productTab_bgValue", bgValue);
    localStorage.setItem("productTab_themeColor", selectedThemeColor);
    localStorage.setItem("productTab_blur", String(blurIntensity));
    localStorage.setItem("productTab_items", JSON.stringify(items));
  }

  function initGeneral() {
    customTitleDisplay.textContent = customTitle;
    customTitleInput.value = customTitle;
    updateClock();
    setInterval(updateClock, 1000);
  }

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}`;
  }

  function applyBlur() {
    document.documentElement.style.setProperty(
      "--blur-intensity",
      blurIntensity + "px",
    );
    blurSlider.value = blurIntensity;
    blurValue.textContent = blurIntensity + "px";
  }

  function applyThemeColor(rgbString) {
    if (!rgbString) return;
    selectedThemeColor = rgbString;
    document.documentElement.style.setProperty(
      "--accent-color",
      `rgb(${rgbString})`,
    );
    document.documentElement.style.setProperty("--accent-color-rgb", rgbString);

    document.querySelectorAll(".color-swatch").forEach((sw) => {
      if (sw.dataset.rgb === rgbString) sw.classList.add("active");
      else sw.classList.remove("active");
    });
    saveState();
  }

  function extractPaletteFromCanvas(imageSource) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        if (typeof ColorThief !== "undefined") {
          const colorThief = new ColorThief();
          const palette = colorThief.getPalette(canvas, 6);
          paletteContainer.innerHTML = "";

          if (palette && palette.length > 0) {
            palette.forEach((color) => {
              const rgbString = `${color[0]}, ${color[1]}, ${color[2]}`;
              const swatch = document.createElement("div");
              swatch.className = "color-swatch";
              swatch.style.background = `rgb(${rgbString})`;
              swatch.dataset.rgb = rgbString;
              if (selectedThemeColor === rgbString)
                swatch.classList.add("active");

              swatch.addEventListener("click", () =>
                applyThemeColor(rgbString),
              );
              paletteContainer.appendChild(swatch);
            });

            if (
              !selectedThemeColor ||
              !palette.find(
                (c) => `${c[0]}, ${c[1]}, ${c[2]}` === selectedThemeColor,
              )
            ) {
              applyThemeColor(
                `${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}`,
              );
            }
          }
        }
      } catch (e) {
        paletteContainer.innerHTML =
          '<p class="helper-text">Could not extract colors from this image.</p>';
      }
    };
    img.src = imageSource;
  }

  function fetchImageAsDataUrl(url, callback) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result);
        reader.readAsDataURL(blob);
      })
      .catch(() => callback(null));
  }

  function loadWallpaper() {
    backgroundImg.classList.remove("loaded");

    if (bgType === "random") {
      const seed = Math.floor(Math.random() * 1000);
      const url = `https://picsum.photos/1920/1080?random=${seed}`;

      fetchImageAsDataUrl(url, (dataUrl) => {
        if (dataUrl) {
          backgroundImg.src = dataUrl;
          backgroundImg.onload = () => {
            backgroundImg.classList.add("loaded");
            extractPaletteFromCanvas(dataUrl);
          };
        }
      });
    } else if (bgType === "url") {
      fetchImageAsDataUrl(bgValue, (dataUrl) => {
        if (dataUrl) {
          backgroundImg.src = dataUrl;
          backgroundImg.onload = () => {
            backgroundImg.classList.add("loaded");
            extractPaletteFromCanvas(dataUrl);
          };
        } else {
          backgroundImg.src = bgValue;
          backgroundImg.onload = () => {
            backgroundImg.classList.add("loaded");
          };
        }
      });
    } else if (bgType === "base64") {
      backgroundImg.src = bgValue;
      backgroundImg.onload = () => {
        backgroundImg.classList.add("loaded");
        extractPaletteFromCanvas(bgValue);
      };
    }

    backgroundImg.onerror = () => {
      if (bgType !== "random") {
        bgType = "random";
        loadWallpaper();
      }
    };
  }

  function compressAndSaveImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
        bgType = "base64";
        bgValue = dataUrl;
        saveState();
        loadWallpaper();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function getFolder(id, currentList = items) {
    if (id === "root") return { id: "root", type: "folder", children: items };
    for (let item of currentList) {
      if (item.id === id) return item;
      if (item.type === "folder") {
        let found = getFolder(id, item.children);
        if (found) return found;
      }
    }
    return null;
  }

  function deleteItem(id, currentList = items) {
    for (let i = 0; i < currentList.length; i++) {
      if (currentList[i].id === id) {
        currentList.splice(i, 1);
        return true;
      }
      if (currentList[i].type === "folder") {
        if (deleteItem(id, currentList[i].children)) return true;
      }
    }
    return false;
  }

  function collectAllFolders(list = items, prefix = "") {
    let folders = [];
    list.forEach((item) => {
      if (item.type === "folder") {
        folders.push({ id: item.id, title: prefix + item.title });
        folders = folders.concat(
          collectAllFolders(item.children, prefix + item.title + " / "),
        );
      }
    });
    return folders;
  }

  function updateFolderDropdown() {
    const lang = i18n[currentLang];
    targetFolderSelect.innerHTML = `<option value="root">${lang.rootFolder}</option>`;
    const folders = collectAllFolders();
    folders.forEach((f) => {
      const opt = document.createElement("option");
      opt.value = f.id;
      opt.textContent = f.title;
      targetFolderSelect.appendChild(opt);
    });
  }

  function handleImgErrors(container) {
    container.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", function () {
        this.src =
          "https://unpkg.com/boxicons@2.1.4/svg/regular/bx-globe.svg";
        this.style.filter = "invert(1)";
      });
    });
  }

  function renderGrid() {
    linksGrid.innerHTML = "";
    const folder = getFolder(currentFolderId);
    if (!folder || folder.id === "root") {
      breadcrumb.style.display = "none";
    } else {
      breadcrumb.style.display = "flex";
      currentFolderName.textContent = folder.title;
    }

    const currentItems = folder ? folder.children : items;

    currentItems.forEach((item) => {
      const card = document.createElement("a");
      card.className = "link-card";

      if (item.type === "link") {
        card.href = item.url;
        const fallbackIcon = `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=128`;
        const iconUrl =
          item.icon && item.icon.trim() !== "" ? item.icon : fallbackIcon;
        card.innerHTML = `
                    <div class="link-icon-wrapper"><img src="${iconUrl}" class="link-icon"></div>
                    <span class="link-title">${item.title}</span>`;
      } else if (item.type === "folder") {
        card.onclick = (e) => {
          e.preventDefault();
          currentFolderId = item.id;
          renderGrid();
        };
        card.innerHTML = `
                    <div class="link-icon-wrapper"><i class='bx bxs-folder-open'></i></div>
                    <span class="link-title">${item.title}</span>`;
      }
      linksGrid.appendChild(card);
    });
    handleImgErrors(linksGrid);
  }

  function renderDashboardList(list = items, depth = 0) {
    if (depth === 0) manageLinksList.innerHTML = "";
    list.forEach((item) => {
      const li = document.createElement("li");
      li.className = "manage-link-item";
      li.style.marginLeft = `${depth * 20}px`;

      let iconHtml =
        item.type === "link"
          ? `<img src="${item.icon || `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=128`}">`
          : `<i class='bx bxs-folder'></i>`;

      li.innerHTML = `
                <div class="manage-link-info">
                    <div class="manage-link-icon">${iconHtml}</div>
                    <span class="manage-link-title">${item.title}</span>
                </div>
                <button class="delete-link-btn" data-id="${item.id}"><i class='bx bx-trash'></i></button>
            `;
      manageLinksList.appendChild(li);

      if (item.type === "folder" && item.children)
        renderDashboardList(item.children, depth + 1);
    });

    if (depth === 0) {
      handleImgErrors(manageLinksList);
      document.querySelectorAll(".delete-link-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          deleteItem(e.currentTarget.getAttribute("data-id"));
          saveState();
          renderGrid();
          renderDashboardList();
          updateFolderDropdown();
        });
      });
    }
  }

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navBtns.forEach((b) => b.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
      currentTabTitle.textContent = btn.querySelector("span").textContent;
    });
  });

  openDashboardBtn.addEventListener("click", () => {
    dashboardModal.classList.add("active");
    renderDashboardList();
  });
  closeDashboardBtn.addEventListener("click", () =>
    dashboardModal.classList.remove("active"),
  );
  dashboardModal.addEventListener("click", (e) => {
    if (e.target === dashboardModal) dashboardModal.classList.remove("active");
  });

  langSelect.addEventListener("change", (e) => {
    currentLang = e.target.value;
    saveState();
    applyLanguage();
  });
  saveTitleBtn.addEventListener("click", () => {
    const val = customTitleInput.value.trim();
    if (val) {
      customTitle = val;
      customTitleDisplay.textContent = customTitle;
      saveState();
      const originalText = saveTitleBtn.textContent;
      saveTitleBtn.textContent = i18n[currentLang].btnSaved;
      setTimeout(() => {
        saveTitleBtn.textContent = originalText;
      }, 2000);
    }
  });

  btnWallRandom.addEventListener("click", () => {
    bgType = "random";
    saveState();
    loadWallpaper();
    urlInputContainer.style.display = "none";
  });
  btnWallUrlToggle.addEventListener("click", () => {
    urlInputContainer.style.display =
      urlInputContainer.style.display === "none" ? "block" : "none";
  });
  saveWallUrlBtn.addEventListener("click", () => {
    if (wallpaperUrlInput.value.trim()) {
      bgType = "url";
      bgValue = wallpaperUrlInput.value.trim();
      saveState();
      loadWallpaper();
    }
  });
  wallpaperUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) compressAndSaveImage(file);
  });

  blurSlider.addEventListener("input", (e) => {
    blurIntensity = parseInt(e.target.value);
    applyBlur();
    saveState();
  });

  typeRadios.forEach((r) =>
    r.addEventListener("change", (e) => {
      if (e.target.value === "folder") {
        urlGroup.style.display = "none";
        iconGroup.style.display = "none";
        linkUrlInput.removeAttribute("required");
      } else {
        urlGroup.style.display = "block";
        iconGroup.style.display = "block";
        linkUrlInput.setAttribute("required", "required");
      }
    }),
  );
  backBtn.addEventListener("click", () => {
    currentFolderId = "root";
    renderGrid();
  });

  addLinkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.querySelector('input[name="itemType"]:checked').value;
    let newItem = {
      id: "item_" + Date.now(),
      type: type,
      title: linkTitleInput.value.trim(),
    };
    if (type === "link") {
      let url = linkUrlInput.value.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://"))
        url = "https://" + url;
      newItem.url = url;
      newItem.icon = linkIconInput.value.trim();
    } else {
      newItem.children = [];
    }

    getFolder(targetFolderSelect.value).children.push(newItem);
    saveState();
    renderGrid();
    renderDashboardList();
    updateFolderDropdown();
    addLinkForm.reset();
    document.querySelector('input[name="itemType"][value="link"]').click();
  });

  initGeneral();
  applyLanguage();
  applyBlur();
  loadWallpaper();
  renderGrid();
  if (selectedThemeColor) applyThemeColor(selectedThemeColor);

  // --- Rofi Search Feature ---
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const mainHeader = document.getElementById("mainHeader");

  function closeSearch() {
    searchOverlay.classList.remove("active");
    mainHeader.classList.remove("search-active");
    searchInput.value = "";
    searchInput.blur();
  }

  document.addEventListener("keydown", (e) => {
    // Ignore if typing in dashboard inputs
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
      if (e.target === searchInput) {
        if (e.key === "Escape") {
          closeSearch();
        } else if (e.key === "Enter") {
          const query = searchInput.value.trim();
          if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
          }
        }
      }
      return;
    }

    // Only trigger on printable single characters, excluding modifiers
    if (e.ctrlKey || e.altKey || e.metaKey || e.key.length !== 1) return;

    if (!searchOverlay.classList.contains("active")) {
      searchOverlay.classList.add("active");
      mainHeader.classList.add("search-active");
      e.preventDefault();
      searchInput.value = "";
      
      // Focus the input
      setTimeout(() => {
        searchInput.focus();
        searchInput.value = e.key;
      }, 10);
    }
  });

  // Close search when clicking outside
  document.addEventListener("click", (e) => {
    if (searchOverlay.classList.contains("active") && !searchOverlay.contains(e.target)) {
      closeSearch();
    }
  });

  // Dynamic input sizing
  searchInput.addEventListener("input", function() {
    this.size = Math.max(15, this.value.length);
  });
});
