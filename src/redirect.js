chrome.tabs.getCurrent((tab) => {
  chrome.tabs.create({ url: "app.html", active: true }, () => {
    if (tab && tab.id) {
      chrome.tabs.remove(tab.id);
    } else {
      window.close();
    }
  });
});
