/*
  The SpigotSearchEngineBackground.js is used for the Icon clicking
*/

browser.action.onClicked.addListener(function(tab) {
  if (tab.url === null || tab.url === undefined || !tab.url.includes("spigotmc.org/resources/")) {
    browser.tabs.create({ url: "https://www.spigotmc.org/resources/" });
  }
});


browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    browser.tabs.create({ url: "https://fof1092.de/Plugins/SSE/FirefoxInstall" });
  }
});