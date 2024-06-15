/*
  The SSEGuiManager.js is used to setup all Gui Checkboxes
*/

/* Used to save the "ExtraOptions..."*/
var showExtras;

class SSEGuiManager {
  /* showCategories */

  static showCategories() {
    let divSortByBox = document.createElement("div");
    divSortByBox.classList.add("SortCategorie");

    /* Primary Content Menu Heade */

    let divPrimaryContentMenuHeader = document.createElement("div");
    divPrimaryContentMenuHeader.classList.add("primaryContent");
    divPrimaryContentMenuHeader.classList.add("menuHeader");
    divPrimaryContentMenuHeader.classList.add("PrimaryContentMenuHeader");
    let tnPrimaryContentMenuHeader = document.createTextNode("Categories...");

    divPrimaryContentMenuHeader.appendChild(tnPrimaryContentMenuHeader);
    divSortByBox.appendChild(divPrimaryContentMenuHeader);

    /* Primary Content Menu Heade */

    let ulBlockLinksList = document.createElement("ul");
    ulBlockLinksList.classList.add("blockLinksList");

    /* Categories*/

    let types = [
      { type: "CategoriePaidPlugin", text: " Paid Plugin" },
      {
        type: "CategorieSpigot",
        text: " Spigot",
        sub: [
          { type: "CategorieSpigotChat", text: " Chat" },
          {
            type: "CategorieSpigotToolsAndUtilities",
            text: " Tools and Utilities",
          },
          { type: "CategorieSpigotMisc", text: " Misc" },
          { type: "CategorieSpigotFun", text: " Fun" },
          { type: "CategorieSpigotWorldManagement", text: " World Management" },
          { type: "CategorieSpigotMechanics", text: " Mechanics" },
          { type: "CategorieSpigotEconomy", text: " Economy" },
          { type: "CategorieSpigotGameMode", text: " Game Mode" },
          { type: "CategorieSpigotSkript", text: " Skript" },
          { type: "CategorieSpigotLibrariesAPIs", text: " Libraries / APIs" },
          { type: "CategorieSpigotNoRating", text: " No Rating" },
        ],
      },
      { type: "CategorieSkript", text: " Skript" },
      {
        type: "CategorieBungeecord",
        text: " Bungeecord",
        sub: [
          {
            type: "CategorieBungeecordLibrariesAPIs",
            text: " Libraries / APIs",
          },
          {
            type: "CategorieBungeecordTransportation",
            text: " Transportation",
          },
          {
            type: "CategorieBungeecordChat",
            text: " Chat",
          },
          {
            type: "CategorieBungeecordToolsAndUtilities",
            text: " Tools and Utilities",
          },
          {
            type: "CategorieBungeecordMisc",
            text: " Misc",
          },
        ],
      },
      {
        type: "CategorieSpigotBungeecord",
        text: " Bungeecord - Spigot",
        sub: [
          {
            type: "CategorieSpigotBungeecordTransportation",
            text: " Transportation",
          },
          {
            type: "CategorieSpigotBungeecordChat",
            text: " Chat",
          },
          {
            type: "CategorieSpigotBungeecordToolsAndUtilities",
            text: " Tools and Utilities",
          },
          {
            type: "CategorieSpigotBungeecordMisc",
            text: " Misc",
          },
        ],
      },
      { type: "CategorieWeb", text: " Web" },
      { type: "CategorieStandalone", text: " Standalone" },
    ];

    for (let categorie of types) {
      let liCategorie = document.createElement("li");

      let cbCategorie = document.createElement("input");
      cbCategorie.type = "checkbox";
      cbCategorie.checked = SSELocalStorag.getBoolean(categorie["type"]);
      cbCategorie.id = "Checkbox_" + categorie["type"];
      cbCategorie.classList.add("Disabler");

      cbCategorie.onclick = function () {
        if (categorie["type"] != "CategoriePaidPlugin") {
          if (!SSELocalStorag.getBoolean(categorie["type"])) {
            document.getElementById(
              "Checkbox_CategoriePaidPlugin"
            ).checked = true;
            SSELocalStorag.setItem("CategoriePaidPlugin", true);
          }
        }

        SSELocalStorag.setItem(
          categorie["type"],
          !SSELocalStorag.getBoolean(categorie["type"])
        );

        var subMenu = liCategorie.querySelector("ul");
        if (subMenu) {
          subMenu.style.display = SSELocalStorag.getBoolean(categorie["type"])
            ? "block"
            : "none";

          for (let subCategory of categorie.sub) {
            SSELocalStorag.setItem(
              subCategory["type"],
              SSELocalStorag.getBoolean(categorie["type"])
            );
            document.getElementById("Checkbox_" + subCategory["type"]).checked =
              SSELocalStorag.getBoolean(categorie["type"]);
          }
        }

        ResourceListener.sortAndDisplay();
      };

      let tnCategorie = document.createTextNode(categorie["text"]);

      liCategorie.appendChild(cbCategorie);
      liCategorie.appendChild(tnCategorie);

      if (categorie.sub && categorie.sub.length > 0) {
        let ulSubCategorie = document.createElement("ul");
        ulSubCategorie.style.marginLeft = "16px";
        ulSubCategorie.style.marginTop = "3px";
        ulSubCategorie.style.marginBottom = "2px";
        ulSubCategorie.style.fontSize = "11px";
        ulSubCategorie.style.display = SSELocalStorag.getBoolean(
          categorie["type"]
        )
          ? "block"
          : "none";

        for (let subCategory of categorie.sub) {
          let liSubCategorie = document.createElement("li");

          let cbSubCategorie = document.createElement("input");
          cbSubCategorie.type = "checkbox";
          cbSubCategorie.checked = SSELocalStorag.getBoolean(
            subCategory["type"]
          );
          cbSubCategorie.id = "Checkbox_" + subCategory["type"];
          cbSubCategorie.classList.add("Disabler");
          cbSubCategorie.style.height = "10px";
          cbSubCategorie.onclick = function () {
            SSELocalStorag.setItem(
              subCategory["type"],
              !SSELocalStorag.getBoolean(subCategory["type"])
            );

            ResourceListener.sortAndDisplay();
          };

          let tnSubCategorie = document.createTextNode(subCategory["text"]);

          liSubCategorie.appendChild(cbSubCategorie);
          liSubCategorie.appendChild(tnSubCategorie);
          ulSubCategorie.appendChild(liSubCategorie);
        }

        liCategorie.appendChild(ulSubCategorie);
      }

      ulBlockLinksList.appendChild(liCategorie);
    }

    /* Final adding */
    divSortByBox.appendChild(ulBlockLinksList);
    document.getElementById("divSortBox").appendChild(divSortByBox);
  }

  /* showSearchOn */

  static showSearchOn() {
    let divSortByBox = document.createElement("div");
    divSortByBox.classList.add("SortByBox");

    /* Primary Content Menu Heade */

    let divPrimaryContentMenuHeader = document.createElement("div");
    divPrimaryContentMenuHeader.classList.add("primaryContent");
    divPrimaryContentMenuHeader.classList.add("menuHeader");
    divPrimaryContentMenuHeader.classList.add("PrimaryContentMenuHeader");
    let tnPrimaryContentMenuHeader = document.createTextNode("Search on...");

    divPrimaryContentMenuHeader.appendChild(tnPrimaryContentMenuHeader);
    divSortByBox.appendChild(divPrimaryContentMenuHeader);

    /* Primary Content Menu Heade */

    let ulBlockLinksList = document.createElement("ul");
    ulBlockLinksList.classList.add("blockLinksList");

    /* Search on*/

    let types = [
      { type: "SearchOnPluginName", text: " Plugin Name" },
      { type: "SearchOnPluginTag", text: " Plugin Tag" },
    ];

    for (let categorie of types) {
      let liSearchOn = document.createElement("li");

      let cbSearchOn = document.createElement("input");
      cbSearchOn.type = "checkbox";
      cbSearchOn.checked = SSELocalStorag.getBoolean(categorie["type"]);
      cbSearchOn.id = "Checkbox_" + categorie["type"];
      cbSearchOn.classList.add("Disabler");

      cbSearchOn.onclick = function () {
        SSELocalStorag.setItem(
          categorie["type"],
          !SSELocalStorag.getBoolean(categorie["type"])
        );
        bntSearchResources.click();
      };

      let tnSearchOn = document.createTextNode(categorie["text"]);

      liSearchOn.appendChild(cbSearchOn);
      liSearchOn.appendChild(tnSearchOn);
      ulBlockLinksList.appendChild(liSearchOn);
    }

    /* Final adding */
    divSortByBox.appendChild(ulBlockLinksList);
    document.getElementById("divSortBox").appendChild(divSortByBox);
  }

  /* showSearchType */

  static showSearchType() {
    let divSortByBox = document.createElement("div");
    divSortByBox.classList.add("SortByBox");

    /* Primary Content Menu Heade */

    let divPrimaryContentMenuHeader = document.createElement("div");
    divPrimaryContentMenuHeader.classList.add("primaryContent");
    divPrimaryContentMenuHeader.classList.add("menuHeader");
    divPrimaryContentMenuHeader.classList.add("PrimaryContentMenuHeader");
    let tnPrimaryContentMenuHeader = document.createTextNode("Search type...");

    divPrimaryContentMenuHeader.appendChild(tnPrimaryContentMenuHeader);
    divSortByBox.appendChild(divPrimaryContentMenuHeader);

    /* Primary Content Menu Heade */

    let ulBlockLinksList = document.createElement("ul");
    ulBlockLinksList.classList.add("blockLinksList");

    /* Search type */

    let types = [
      { type: "SearchTypeContains", text: " Contains" },
      { type: "SearchTypeEquals", text: " Equals" },
    ];

    for (let categorie of types) {
      let liSearchType = document.createElement("li");

      let cbSearchType = document.createElement("input");
      cbSearchType.type = "radio";
      cbSearchType.name = "searchType";
      cbSearchType.id = "Radio_" + categorie["type"];

      cbSearchType.onclick = function () {
        SSELocalStorag.setItem("SearchType", SSEGuiManager.getShowSearchType());
        bntSearchResources.click();
      };

      let tnSearchType = document.createTextNode(categorie["text"]);

      liSearchType.appendChild(cbSearchType);
      liSearchType.appendChild(tnSearchType);
      ulBlockLinksList.appendChild(liSearchType);
    }

    /* Final adding */
    divSortByBox.appendChild(ulBlockLinksList);
    document.getElementById("divSortBox").appendChild(divSortByBox);

    document.getElementById(
      SSEGuiManager.getSearchTypeByID(SSELocalStorag.getItem("SearchType"))
    ).checked = true;
  }

  /* Get Show Search Type */

  static getShowSearchType() {
    if (document.getElementById("Radio_SearchTypeContains").checked) {
      return "0";
    } else if (document.getElementById("Radio_SearchTypeEquals").checked) {
      return "1";
    }
  }

  /* Get Search Type By ID */

  static getSearchTypeByID(sortBy) {
    switch (sortBy) {
      case "0":
        return "Radio_SearchTypeContains";
        break;
      case "1":
        return "Radio_SearchTypeEquals";
        break;
    }
  }

  /* showVersions */

  static showVersions() {
    let divSortByBox = document.createElement("div");
    divSortByBox.classList.add("SortByBox");

    /* Primary Content Menu Heade */

    let divPrimaryContentMenuHeader = document.createElement("div");
    divPrimaryContentMenuHeader.classList.add("primaryContent");
    divPrimaryContentMenuHeader.classList.add("menuHeader");
    divPrimaryContentMenuHeader.classList.add("PrimaryContentMenuHeader");
    let tnPrimaryContentMenuHeader = document.createTextNode("Versions...");

    divPrimaryContentMenuHeader.appendChild(tnPrimaryContentMenuHeader);
    divSortByBox.appendChild(divPrimaryContentMenuHeader);

    /* Primary Content Menu Heade */

    let ulBlockLinksList = document.createElement("ul");
    ulBlockLinksList.classList.add("blockLinksList");

    let types = [
      { type: "Version_Unknown", text: " Unknown" },
      { type: "Version_v1_21", text: " 1.21" },
      { type: "Version_v1_20", text: " 1.20" },
      { type: "Version_v1_19", text: " 1.19" },
      { type: "Version_v1_18", text: " 1.18" },
      { type: "Version_v1_17", text: " 1.17" },
      { type: "Version_v1_16", text: " 1.16" },
      { type: "Version_v1_15", text: " 1.15" },
      { type: "Version_v1_14", text: " 1.14" },
      { type: "Version_v1_13", text: " 1.13" },
      { type: "Version_v1_12", text: " 1.12" },
      { type: "Version_v1_11", text: " 1.11" },
      { type: "Version_v1_10", text: " 1.10" },
      { type: "Version_v1_9", text: " 1.9" },
      { type: "Version_v1_8", text: " 1.8" },
      { type: "Version_v1_7", text: " 1.7" },
    ];

    for (let categorie of types) {
      let liVersion = document.createElement("li");

      let cbVersion = document.createElement("input");
      cbVersion.type = "checkbox";
      cbVersion.checked = SSELocalStorag.getBoolean(categorie["type"]);
      cbVersion.id = "Checkbox_" + categorie["type"];
      cbVersion.classList.add("Disabler");

      cbVersion.onclick = function () {
        SSELocalStorag.setItem(
          categorie["type"],
          !SSELocalStorag.getBoolean(categorie["type"])
        );

        ResourceListener.sortAndDisplay();
      };

      let tnVersion = document.createTextNode(categorie["text"]);

      liVersion.appendChild(cbVersion);
      liVersion.appendChild(tnVersion);
      ulBlockLinksList.appendChild(liVersion);
    }

    /* Final adding */
    divSortByBox.appendChild(ulBlockLinksList);
    document.getElementById("divSortBox").appendChild(divSortByBox);
  }

  /* showSortByBox */

  static showSortByBox() {
    let divSortByBox = document.createElement("div");
    divSortByBox.classList.add("SortByBox");

    /* Primary Content Menu Heade */

    let divPrimaryContentMenuHeader = document.createElement("div");
    divPrimaryContentMenuHeader.classList.add("primaryContent");
    divPrimaryContentMenuHeader.classList.add("menuHeader");
    divPrimaryContentMenuHeader.classList.add("PrimaryContentMenuHeader");
    let tnPrimaryContentMenuHeader = document.createTextNode("Sort by...");

    divPrimaryContentMenuHeader.appendChild(tnPrimaryContentMenuHeader);
    divSortByBox.appendChild(divPrimaryContentMenuHeader);

    /* Primary Content Menu Heade */

    let ulBlockLinksList = document.createElement("ul");
    ulBlockLinksList.classList.add("blockLinksList");

    /* Sort by */

    let types = [
      { type: "SortByPriority", text: "Plugin Priority" },
      //{ type: "SortByUpdate", text: "Last Update" },
      { type: "SortByDownloads", text: "Downloads" },
      { type: "SortByRealeaseDate", text: "Realease Date" },
    ];

    for (let categorie of types) {
      let liSortBy = document.createElement("li");

      let bntSortBy = document.createElement("button");
      bntSortBy.id = "Button_" + categorie["type"];
      bntSortBy.classList.add("SortByBoxButtonLinkStyle");

      bntSortBy.onclick = function () {
        SSELocalStorag.setItem(
          "SortBy",
          SSEGuiManager.getSortByName(categorie["type"])
        );
        SSEGuiManager.setSortByBoxButtonColor();
        ResourceListener.sortAndDisplay();
      };

      let tnSortBy = document.createTextNode(categorie["text"]);

      bntSortBy.appendChild(tnSortBy);
      liSortBy.appendChild(bntSortBy);
      ulBlockLinksList.appendChild(liSortBy);
    }

    /* Final adding */
    divSortByBox.appendChild(ulBlockLinksList);
    document.getElementById("divSortBox").appendChild(divSortByBox);

    SSEGuiManager.setSortByBoxButtonColor();
  }

  /* Get Sort By Name */

  static getSortByName(sortBy) {
    switch (sortBy) {
      case "SortByPriority":
        return 0;
        break;
      /*case "SortByUpdate":
        return 1;
        break;*/
      case "SortByDownloads":
        return 1;
        break;
      case "SortByRealeaseDate":
        return 2;
        break;
    }
  }

  /* Get Sort By Name */

  static getSortByID(sortBy) {
    switch (parseInt(sortBy)) {
      case 0:
        return "SortByPriority";
        break;
      /*case 1:
        return "SortByUpdate";
        break;*/
      case 1:
        return "SortByDownloads";
        break;
      case 2:
        return "SortByRealeaseDate";
        break;
    }
  }

  /* Set Sort By Box Button Color */

  static setSortByBoxButtonColor() {
    let types = [
      { type: "SortByPriority" },
      //{ type: "SortByUpdate" },
      { type: "SortByDownloads" },
      { type: "SortByRealeaseDate" },
    ];

    for (let categorie of types) {
      let bntSortBy = document.getElementById("Button_" + categorie["type"]);

      if (bntSortBy.classList.contains("SortByBoxButtonLinkStyleClicked")) {
        bntSortBy.classList.remove("SortByBoxButtonLinkStyleClicked");
      }

      if (
        SSEGuiManager.getSortByID(SSELocalStorag.getItem("SortBy")) ==
        categorie["type"]
      ) {
        bntSortBy.classList.add("SortByBoxButtonLinkStyleClicked");
      }
    }
  }

  /* showExtras 

  static showExtras() {
    let divSortByBox = document.createElement("div");
    divSortByBox.classList.add("SortByBox");

    // Primary Content Menu Heade

    let divPrimaryContentMenuHeader = document.createElement("div");
    divPrimaryContentMenuHeader.classList.add("primaryContent");
    divPrimaryContentMenuHeader.classList.add("menuHeader");
    divPrimaryContentMenuHeader.classList.add("PrimaryContentMenuHeader");
    let tnPrimaryContentMenuHeader = document.createTextNode("Extras...");

    divPrimaryContentMenuHeader.appendChild(tnPrimaryContentMenuHeader);
    divSortByBox.appendChild(divPrimaryContentMenuHeader);

    // Primary Content Menu Heade

    let ulBlockLinksList = document.createElement("ul");
    ulBlockLinksList.classList.add("blockLinksList");

    let types = [{ type: "Extras_OnlyOpenSource", text: " Only Open Source" }];

    for (let categorie of types) {
      let liExtras = document.createElement("li");

      let cbExtras = document.createElement("input");
      cbExtras.type = "checkbox";
      cbExtras.checked = false;
      cbExtras.id = "Checkbox_" + categorie["type"];
      cbExtras.classList.add("Disabler");

      cbExtras.onclick = function () {
        SSEGuiManager.unsetExtras("Checkbox_" + categorie["type"]);

        ResourceListener.sortAndDisplay();
      };

      let tnExtras = document.createTextNode(categorie["text"]);

      liExtras.appendChild(cbExtras);
      liExtras.appendChild(tnExtras);
      ulBlockLinksList.appendChild(liExtras);
    }

    // Final adding
    divSortByBox.appendChild(ulBlockLinksList);
    document.getElementById("divSortBox").appendChild(divSortByBox);
  }*/

  /* Set Sort By Box Button Color 

  static unsetExtras(exceptFrom) {
    let types = [{ type: "Extras_OnlyOpenSource", text: " Only Open Source" }];

    for (let categorie of types) {
      let cbExtras = document.getElementById("Checkbox_" + categorie["type"]);

      if (exceptFrom != "Checkbox_" + categorie["type"]) {
        cbExtras.checked = false;
      } else {
        if (cbExtras.checked) {
          showExtras = categorie["type"];
        } else {
          showExtras = null;
        }
      }
    }
  }*/

  static isShowExtrasSet(type) {
    if (showExtras == type) {
      return true;
    }
    return false;
  }
}
