/*
  The SSElocalStorage.js is used to Save selected options for future searches
  The SSElocalStorage.js is setting up at the first use
*/

let SSEVersion = "2.1.1";

class SSELocalStorag {
  /*
      Saving and getting informations from the LocalStorage
    */

  static getBoolean(localStorageItemName) {
    return (
      localStorage.getItem("SpigotSearchEngine_" + localStorageItemName) ==
      "true"
    );
  }

  static getItem(localStorageItemName) {
    return localStorage.getItem("SpigotSearchEngine_" + localStorageItemName);
  }

  static setItem(localStorageItemName, value) {
    localStorage.setItem("SpigotSearchEngine_" + localStorageItemName, value);
  }

  static existsItem(localStorageItemName) {
    return (
      localStorage.getItem("SpigotSearchEngine_" + localStorageItemName) != null
    );
  }
}

/* LocalStorage Setup */

let types = [
  // Categories
  { type: "CategoriePaidPlugin", value: true },
  { type: "CategorieSpigot", value: true },
  // Subcategories of Spigot
  { type: "CategorieSpigotChat", value: true },
  { type: "CategorieSpigotToolsAndUtilities", value: true },
  { type: "CategorieSpigotMisc", value: true },
  { type: "CategorieSpigotFun", value: true },
  { type: "CategorieSpigotWorldManagement", value: true },
  { type: "CategorieSpigotMechanics", value: true },
  { type: "CategorieSpigotEconomy", value: true },
  { type: "CategorieSpigotGameMode", value: true },
  { type: "CategorieSpigotSkript", value: true },
  { type: "CategorieSpigotLibrariesAPIs", value: true },
  { type: "CategorieSpigotNoRating", value: true },

  { type: "CategorieBungeecord", value: true },
  // Subcategories of Bungeecord
  { type: "CategorieBungeecordLibrariesAPIs", value: true },
  { type: "CategorieBungeecordTransportation", value: true },
  { type: "CategorieBungeecordChat", value: true },
  { type: "CategorieBungeecordToolsAndUtilities", value: true },
  { type: "CategorieBungeecordMisc", value: true },

  { type: "CategorieSpigotBungeecord", value: true },
  // Subcategories of Bungeecord - Spigot
  { type: "CategorieSpigotBungeecordTransportation", value: true },
  { type: "CategorieSpigotBungeecordChat", value: true },
  { type: "CategorieSpigotBungeecordToolsAndUtilities", value: true },
  { type: "CategorieSpigotBungeecordMisc", value: true },

  { type: "CategorieSkript", value: true },
  { type: "CategorieWeb", value: true },
  { type: "CategorieStandalone", value: true },

  { type: "Version_v1_7", value: true },
  { type: "Version_v1_8", value: true },
  { type: "Version_v1_9", value: true },
  { type: "Version_v1_10", value: true },
  { type: "Version_v1_11", value: true },
  { type: "Version_v1_12", value: true },
  { type: "Version_v1_13", value: true },
  { type: "Version_v1_14", value: true },
  { type: "Version_v1_15", value: true },
  { type: "Version_v1_16", value: true },
  { type: "Version_v1_17", value: true },
  { type: "Version_v1_18", value: true },
  { type: "Version_Unknown", value: true },

  { type: "SearchOnPluginName", value: true },
  { type: "SearchOnPluginTag", value: false },

  { type: "SearchType", value: 0 },

  { type: "SortBy", value: 0 },

  { type: "UserID", value: Math.random().toString(36).substr(2, 16) },
];

for (let categorie of types) {
  if (!SSELocalStorag.existsItem(categorie["type"])) {
    SSELocalStorag.setItem(categorie["type"], categorie["value"]);
  }
}

/* Bugfix For older SSE versions */

if (SSELocalStorag.getItem("SearchType") == 2) {
  SSELocalStorag.setItem("SearchType", 0);
}

if (!SSELocalStorag.existsItem("CategorieScript")) {
  localStorage.removeItem("SpigotSearchEngine_CategorieScript");
}

/* SSE Version (Only used for Bugfixes) */

SSELocalStorag.setItem("ExtensionVersion", SSEVersion);
