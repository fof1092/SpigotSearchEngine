/*
  The SpigotSearchEngineBackground.js is used for the Icon clicking
*/

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: "https://www.spigotmc.org/resources/" });
});
