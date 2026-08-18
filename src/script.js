document.addEventListener("DOMContentLoaded", () => {
  const clockElement = document.getElementById("clock");
  const dateElement = document.getElementById("dateDisplay");
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
  const fontSelect = document.getElementById("fontSelect");
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
  let currentFont =
    localStorage.getItem("productTab_font") ||
    "system-ui, -apple-system, sans-serif";

  let dateMode = localStorage.getItem("productTab_dateMode") || "short";

  if (dateElement) {
    dateElement.addEventListener("click", () => {
      dateMode = dateMode === "short" ? "full" : "short";
      localStorage.setItem("productTab_dateMode", dateMode);
      updateClock();
    });
  }
  let customTitle =
    localStorage.getItem("productTab_customTitle") || "My Setup";
  let currentFolderId = "root";
  let editingItemId = null;

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
      lblFont: "Font Family",
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
      lblFont: "Fuente",
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
      lblFont: "فونت دسکتاپ",
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
    document.getElementById("lblFont").textContent = lang.lblFont;

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
    localStorage.setItem("productTab_font", currentFont);
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

  function applyFont() {
    document.body.style.fontFamily = currentFont;
    fontSelect.value = currentFont;
  }

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}`;

    if (dateElement) {
      const jalaliWeekdays = { '\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647': 'Yekshanbe', '\u062f\u0648\u0634\u0646\u0628\u0647': 'Doshanbe', '\u0633\u0647\u200c\u0634\u0646\u0628\u0647': 'Seshanbe', '\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647': 'Chaharshanbe', '\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647': 'Panjshanbe', '\u062c\u0645\u0639\u0647': 'Jome', '\u0634\u0646\u0628\u0647': 'Shanbe' };
      const faWeekday = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(now);
      const enWeekday = jalaliWeekdays[faWeekday] || faWeekday;
      if (dateMode === "short") {
        dateElement.textContent = enWeekday;
      } else {
        const y = new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric' }).format(now);
        const m = new Intl.DateTimeFormat('fa-IR-u-nu-latn', { month: 'numeric' }).format(now);
        const d = new Intl.DateTimeFormat('fa-IR-u-nu-latn', { day: 'numeric' }).format(now);
        dateElement.textContent = `${y}/${m}/${d}`;
      }
    }
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

  function findItem(id, currentList = items) {
    for (let item of currentList) {
      if (item.id === id) return item;
      if (item.type === "folder") {
        let found = findItem(id, item.children);
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

  function moveItem(sourceId, targetId) {
    if (sourceId === targetId) return;
    
    // Find and remove source item
    let sourceItem = null;
    function removeSource(currentList) {
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id === sourceId) {
          sourceItem = currentList.splice(i, 1)[0];
          return true;
        }
        if (currentList[i].type === "folder" && currentList[i].children) {
          if (removeSource(currentList[i].children)) return true;
        }
      }
      return false;
    }
    removeSource(items);
    if (!sourceItem) return;

    // Find target and insert before it
    function insertBeforeTarget(currentList) {
      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].id === targetId) {
          currentList.splice(i, 0, sourceItem);
          return true;
        }
        if (currentList[i].type === "folder" && currentList[i].children) {
          if (insertBeforeTarget(currentList[i].children)) return true;
        }
      }
      return false;
    }
    
    if (!insertBeforeTarget(items)) {
      items.push(sourceItem); // fallback
    }
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
        // Replace broken images with a globe icon SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "link-icon");
        svg.innerHTML = '<use href="#icon-globe"></use>';
        svg.style.width = "40px";
        svg.style.height = "40px";
        svg.style.fill = "none";
        svg.style.stroke = "rgba(255,255,255,0.7)";
        svg.style.strokeWidth = "2";
        this.replaceWith(svg);
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
        card.href = "#";
        card.innerHTML = `
                    <div class="link-icon-wrapper"><svg class="icon" style="width:32px;height:32px;stroke:var(--accent-color);"><use href="#icon-folder"></use></svg></div>
                    <span class="link-title">${item.title}</span>`;
        card.addEventListener("click", (e) => {
          e.preventDefault();
          currentFolderId = item.id;
          renderGrid();
        });
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
      li.setAttribute("draggable", "true");
      li.setAttribute("data-id", item.id);

      let iconHtml;
      if (item.type === "link") {
        iconHtml = `<img src="${item.icon || `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=32`}" class="manage-icon">`;
      } else {
        iconHtml = `<svg class="icon manage-icon" style="stroke:var(--accent-color);"><use href="#icon-folder"></use></svg>`;
      }

      li.innerHTML = `
                <div class="manage-item-info">
                    ${iconHtml}
                    <div class="manage-item-text">
                        <div class="manage-item-title">${item.title}</div>
                        <div class="manage-item-url">${item.type === "link" ? item.url : "Folder"}</div>
                    </div>
                </div>
                <div class="manage-item-actions">
                    <button class="edit-btn" data-id="${item.id}" title="Edit"><svg class="icon"><use href="#icon-edit"></use></svg></button>
                    <button class="delete-btn" data-id="${item.id}" title="Delete"><svg class="icon"><use href="#icon-trash"></use></svg></button>
                </div>
            `;
      manageLinksList.appendChild(li);

      if (item.type === "folder" && item.children)
        renderDashboardList(item.children, depth + 1);
    });

    if (depth === 0) {
      handleImgErrors(manageLinksList);
      
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data-id");
          const item = findItem(id);
          if (item) {
            editingItemId = id;
            document.getElementById("linkTitle").value = item.title;
            if (item.type === "link") {
              document.querySelector("input[value='link']").checked = true;
              document.getElementById("urlGroup").style.display = "block";
              document.getElementById("linkUrl").value = item.url;
            } else {
              document.querySelector("input[value='folder']").checked = true;
              document.getElementById("urlGroup").style.display = "none";
            }
            document.getElementById("addLinkBtn").textContent = "Update";
            document.getElementById("lblAddItem").textContent = "Edit Item";
            document.getElementById("addLinkForm").scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          deleteItem(e.currentTarget.getAttribute("data-id"));
          saveState();
          renderGrid();
          renderDashboardList();
          updateFolderDropdown();
        });
      });
      
      initDragAndDrop();
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
  
  fontSelect.addEventListener("change", (e) => {
    currentFont = e.target.value;
    saveState();
    applyFont();
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
    const itemType = document.querySelector('input[name="itemType"]:checked').value;
    const title = linkTitleInput.value.trim();
    let url = linkUrlInput.value.trim();
    const targetFolder = targetFolderSelect.value;
    if (itemType === "link" && !url) return;

    if (editingItemId) {
      const item = getFolder(editingItemId) || findItem(editingItemId);
      if (item) {
        item.title = title;
        if (item.type === "link") {
          if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;
          item.url = url;
          if (document.getElementById("linkIcon")) {
            item.icon = document.getElementById("linkIcon").value;
          }
        }
      }
      editingItemId = null;
      document.getElementById("addLinkBtn").textContent = i18n[currentLang].addLinkBtn || "Add";
      document.getElementById("lblAddItem").textContent = i18n[currentLang].lblAddItem || "Add Item";
    } else {
      const newItem = {
        id: "item_" + Date.now(),
        type: itemType,
        title: title,
      };

      if (itemType === "link") {
        if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;
        newItem.url = url;
        if (document.getElementById("linkIcon")) {
          newItem.icon = document.getElementById("linkIcon").value;
        }
      } else {
        newItem.children = [];
      }

      if (targetFolder === "root") {
        items.push(newItem);
      } else {
        const folder = getFolder(targetFolder);
        if (folder) folder.children.push(newItem);
      }
    }

    saveState();
    renderGrid();
    renderDashboardList();
    updateFolderDropdown();
    e.target.reset();
    document.querySelector('input[name="itemType"][value="link"]').click();
  });

  initGeneral();
  applyLanguage();
  applyFont();
  applyBlur();
  loadWallpaper();
  renderGrid();
  if (selectedThemeColor) applyThemeColor(selectedThemeColor);

  // --- Rofi Search Feature ---
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const suggestionsEl = document.getElementById("suggestions");
  const mainHeader = document.getElementById("mainHeader");
  let searchActive = false;
  let selectedIndex = -1;
  let currentSuggestions = [];
  let fetchTimer = null;

  function openSearch(firstChar) {
    searchActive = true;
    searchOverlay.classList.add("active");
    mainHeader.classList.add("search-active");
    searchInput.value = firstChar || "";
    searchInput.focus();
    if (firstChar) fetchSuggestions(firstChar);
  }

  function closeSearch() {
    searchActive = false;
    searchOverlay.classList.remove("active");
    mainHeader.classList.remove("search-active");
    searchInput.value = "";
    searchInput.blur();
    clearSuggestions();
  }

  function clearSuggestions() {
    suggestionsEl.innerHTML = "";
    currentSuggestions = [];
    selectedIndex = -1;
  }

  function navigateTo(query) {
    if (!query) return;
    const urlPattern = /^((https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?)$/i;
    if (urlPattern.test(query) && !query.includes(' ')) {
      if (!query.startsWith("http://") && !query.startsWith("https://")) {
        query = "https://" + query;
      }
      window.location.href = query;
    } else {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  }

  function fetchSuggestions(query) {
    if (fetchTimer) clearTimeout(fetchTimer);
    if (!query.trim()) { clearSuggestions(); return; }
    fetchTimer = setTimeout(() => {
      fetch(`https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`)
        .then(r => r.json())
        .then(data => {
          if (searchInput.value.trim() !== query.trim()) return;
          currentSuggestions = (data[1] || []).slice(0, 6);
          renderSuggestions();
        })
        .catch(() => {});
    }, 150);
  }

  function renderSuggestions() {
    suggestionsEl.innerHTML = "";
    selectedIndex = -1;
    currentSuggestions.forEach((text, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span>${text}</span>`;
      li.addEventListener("click", () => navigateTo(text));
      li.addEventListener("mouseenter", () => {
        selectedIndex = i;
        highlightItem();
      });
      suggestionsEl.appendChild(li);
    });
  }

  function highlightItem() {
    const items = suggestionsEl.querySelectorAll("li");
    items.forEach((li, i) => li.classList.toggle("active", i === selectedIndex));
  }

  searchInput.addEventListener("input", () => {
    fetchSuggestions(searchInput.value);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSearch();
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentSuggestions.length > 0) {
        selectedIndex = (selectedIndex + 1) % currentSuggestions.length;
        highlightItem();
        searchInput.value = currentSuggestions[selectedIndex];
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentSuggestions.length > 0) {
        selectedIndex = selectedIndex <= 0 ? currentSuggestions.length - 1 : selectedIndex - 1;
        highlightItem();
        searchInput.value = currentSuggestions[selectedIndex];
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigateTo(searchInput.value.trim());
    }
  });

  document.addEventListener("keydown", (e) => {
    if (searchActive) return;
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
    if (dashboardModal.classList.contains("active")) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key.length !== 1) return;

    e.preventDefault();
    openSearch(e.key);
  });

  document.addEventListener("click", (e) => {
    if (searchActive && !searchOverlay.contains(e.target)) {
      closeSearch();
    }
  });

  // Drag and drop initialization
  function initDragAndDrop() {
    let draggedItem = null;

    const listItems = document.querySelectorAll('.manage-link-item');
    listItems.forEach(item => {
      item.addEventListener('dragstart', function(e) {
        draggedItem = this;
        setTimeout(() => this.classList.add('dragging'), 0);
      });

      item.addEventListener('dragend', function(e) {
        this.classList.remove('dragging');
        listItems.forEach(li => li.classList.remove('drag-over'));
      });

      item.addEventListener('dragover', function(e) {
        e.preventDefault();
        if (this !== draggedItem) {
          this.classList.add('drag-over');
        }
      });

      item.addEventListener('dragleave', function(e) {
        this.classList.remove('drag-over');
      });

      item.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        if (this !== draggedItem && draggedItem) {
          const sourceId = draggedItem.getAttribute('data-id');
          const targetId = this.getAttribute('data-id');
          moveItem(sourceId, targetId);
          saveState();
          renderGrid();
          renderDashboardList();
          updateFolderDropdown();
        }
      });
    });
  }

  // Export / Import Backup
  const btnExportBackup = document.getElementById("btnExportBackup");
  const btnImportBackup = document.getElementById("btnImportBackup");

  if (btnExportBackup) {
    btnExportBackup.addEventListener("click", () => {
      const data = {
        productTab_items: localStorage.getItem("productTab_items"),
        productTab_bgType: localStorage.getItem("productTab_bgType"),
        productTab_bgValue: localStorage.getItem("productTab_bgValue"),
        productTab_themeColors: localStorage.getItem("productTab_themeColors"),
        productTab_font: localStorage.getItem("productTab_font"),
        productTab_customTitle: localStorage.getItem("productTab_customTitle"),
        productTab_blur: localStorage.getItem("productTab_blur"),
        productTab_lang: localStorage.getItem("productTab_lang")
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zed_tab_backup_${new Date().getTime()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (btnImportBackup) {
    btnImportBackup.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          for (let key in data) {
            if (data[key]) {
              localStorage.setItem(key, data[key]);
            }
          }
          window.location.reload();
        } catch (error) {
          console.error("Invalid backup file");
        }
      };
      reader.readAsText(file);
    });
  }
});
