/*
  The ResourceListener.js is used to load all Resource Informations, sort them and displaying them
*/

let resources = [];
let resourceSearchText;

let divResourceListItem = document.getElementsByClassName("resourceListItem");
let divResourceListItemParent = divResourceListItem[0].parentNode;

class ResourceListener {
  /*
    loadResources is requesting the Resource informations from my Service, after clicking on the "Search Resources" button
    An detailed information about "https://fof1092.de/Plugins/SSE/resourceSearch.php" will follow (It's on my ToDo list :) )
  */

  static loadResources(inpSearchResourcesText) {
    fetch(
      "https://fof1092.de/Plugins/SSE/resourceSearch.php?SearchText=" +
        inpSearchResourcesText.replace(" ", "%20") +
        ResourceListener.getUserID()
    )
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "[SpigotMCSearchEngine] loadResources - Error, Status Code: " +
              response.status
          );
          return;
        }

        response.json().then(function (data) {
          resources = [];
          resourceSearchText = inpSearchResourcesText;

          for (let resource of data) {
            try {
              resources.push(new Resource(resource));
            } catch (err) {
              console.log(
                "[SpigotMCSearchEngine] loadResources - (Resource: " +
                  resource.id +
                  ") Error: " +
                  err
              );
            }
          }

          ResourceListener.sortAndDisplay();

          setTimeout(function afterTwoSeconds() {
            bntSearchResources.style.backgroundColor = "#3a6581";
            inpSearchResources.style.backgroundColor = "#ffffff";
            inpSearchResources.style.borderColor = "#3a6581";

            bntSearchResources.disabled = false;
            inpSearchResources.readOnly = false;
          }, 1000);
        });
      })
      .catch(function (err) {
        console.log(
          "[SpigotMCSearchEngine] ResourceSearch - Fetching Error: ",
          err
        );
      });
  }

  /* Sorting */

  static sortByPriority() {
    for (let resource of resources) {
      // 1 icon = 50 | 1 download = 1 | 1 star = 10

      let resourcePoints = 0;
      if (
        resource.getIcon() !=
        "//static.spigotmc.org/styles/spigot/xenresource/resource_icon.png"
      ) {
        resourcePoints += 50;
      }

      resourcePoints += resource.getDownload().getDownloads();
      resourcePoints +=
        resource.getRating().getRaters() *
        resource.getRating().getRating() *
        10;

      resource.setPriority(resourcePoints);
    }
  }

  static sortByUpdate() {
    for (let resource of resources) {
      resource.setPriority(resource.getUpdateTime().getDateTime().getTime());
    }
  }

  static sortByDownloads() {
    for (let resource of resources) {
      resource.setPriority(resource.getDownload().getDownloads());
    }
  }

  static sortByRealeaseDate() {
    for (let resource of resources) {
      resource.setPriority(resource.getSubmitTime().getDateTime().getTime());
    }
  }

  static sortAndDisplay() {
    switch (SSEGuiManager.getSortByID(SSELocalStorag.getItem("SortBy"))) {
      case "SortByPriority":
        ResourceListener.sortByPriority();
        break;
      case "SortByUpdate":
        ResourceListener.sortByUpdate();
        break;
      case "SortByDownloads":
        ResourceListener.sortByDownloads();
        break;
      case "SortByRealeaseDate":
        ResourceListener.sortByRealeaseDate();
        break;
    }

    resources.sort(function (a, b) {
      if (a.getPriority() < b.getPriority()) {
        return 1;
      } else if (a.getPriority() > b.getPriority()) {
        return -1;
      }

      return 0;
    });

    /* Removing current displayed results. */
    if (!firstClick) {
      for (let k = divResourceListItem.length - 1; k >= 0; k--) {
        divResourceListItem[k].parentNode.removeChild(divResourceListItem[k]);
      }

      let foundResources = 0;
      for (let resource of resources) {
        //In PluginName / PluginTag
        if (
          (SSELocalStorag.getBoolean("SearchOnPluginName") &&
            ResourceListener.isinResourceName(resource.getName())) ||
          (SSELocalStorag.getBoolean("SearchOnPluginTag") &&
            ResourceListener.isinResourceTag(resource.getTag()))
        ) {
          //Selected Categorie Visible
          if (
            ResourceListener.isCategorieVisible(resource.getCategorie().getID())
          ) {
            //Selected Version visible
            if (
              (resource.hasSupportedMCVersions() &&
                ResourceListener.isVersionVisible(
                  resource.getSupportedMCVersions().getVersions()
                )) ||
              !resource.hasSupportedMCVersions()
            ) {
              //Extras...
              if (
                (SSEGuiManager.isShowExtrasSet("Extras_OnlyOpenSource") &&
                  resource.hasSourceCodeLink()) ||
                !SSEGuiManager.isShowExtrasSet("Extras_OnlyOpenSource")
              ) {
                foundResources++;

                divResourceListItemParent.appendChild(resource.getHTML());
              }
            }
          }
        }
      }

      var countUpOptions = {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "Resources Found: ",
      };

      var countUp = new CountUp(
        document.getElementById("divResourcesFround"),
        0,
        foundResources,
        0,
        foundResources / 100,
        countUpOptions
      );
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    }
  }

  /* isVersionVisible */

  static isVersionVisible(versions) {
    for (let version of versions) {
      switch (version) {
        case "Unknown":
          if (SSELocalStorag.getBoolean("Version_Unknown")) {
            return true;
          }
          break;
        case "1.20":
          if (SSELocalStorag.getBoolean("Version_v1_20")) {
            return true;
          }
          break;
        case "1.19":
          if (SSELocalStorag.getBoolean("Version_v1_19")) {
            return true;
          }
          break;
        case "1.18":
          if (SSELocalStorag.getBoolean("Version_v1_18")) {
            return true;
          }
          break;
        case "1.17":
          if (SSELocalStorag.getBoolean("Version_v1_17")) {
            return true;
          }
          break;
        case "1.16":
          if (SSELocalStorag.getBoolean("Version_v1_16")) {
            return true;
          }
          break;
        case "1.15":
          if (SSELocalStorag.getBoolean("Version_v1_15")) {
            return true;
          }
          break;
        case "1.14":
          if (SSELocalStorag.getBoolean("Version_v1_14")) {
            return true;
          }
          break;
        case "1.13":
          if (SSELocalStorag.getBoolean("Version_v1_13")) {
            return true;
          }
          break;
        case "1.12":
          if (SSELocalStorag.getBoolean("Version_v1_12")) {
            return true;
          }
          break;
        case "1.11":
          if (SSELocalStorag.getBoolean("Version_v1_11")) {
            return true;
          }
          break;
        case "1.10":
          if (SSELocalStorag.getBoolean("Version_v1_10")) {
            return true;
          }
          break;
        case "1.9":
          if (SSELocalStorag.getBoolean("Version_v1_9")) {
            return true;
          }
          break;
        case "1.8":
          if (SSELocalStorag.getBoolean("Version_v1_8")) {
            return true;
          }
          break;
        case "1.7":
          if (SSELocalStorag.getBoolean("Version_v1_7")) {
            return true;
          }
          break;
        default:
          break;
      }
    }

    return false;
  }

  /* isCategorieVisible */

  static isCategorieVisible(categorieID) {
    switch (categorieID) {
      case 2:
        return SSELocalStorag.getBoolean("CategorieSpigotBungeecord");
      case 5:
        return SSELocalStorag.getBoolean(
          "CategorieSpigotBungeecordTransportation"
        );
      case 6:
        return SSELocalStorag.getBoolean("CategorieSpigotBungeecordChat");
      case 7:
        return SSELocalStorag.getBoolean(
          "CategorieSpigotBungeecordToolsAndUtilities"
        );
      case 8:
        return SSELocalStorag.getBoolean("CategorieSpigotBungeecordMisc");
      case 3:
        return SSELocalStorag.getBoolean("CategorieBungeecord");
      case 9:
        return SSELocalStorag.getBoolean("CategorieBungeecordLibrariesAPIs");
      case 10:
        return SSELocalStorag.getBoolean("CategorieBungeecordTransportation");
      case 11:
        return SSELocalStorag.getBoolean("CategorieBungeecordChat");
      case 12:
        return SSELocalStorag.getBoolean(
          "CategorieBungeecordToolsAndUtilities"
        );
      case 13:
        return SSELocalStorag.getBoolean("CategorieBungeecordMisc");
      case 4:
        return SSELocalStorag.getBoolean("CategorieSpigot");
      case 14:
        return SSELocalStorag.getBoolean("CategorieSpigotChat");
      case 15:
        return SSELocalStorag.getBoolean("CategorieSpigotToolsAndUtilities");
      case 16:
        return SSELocalStorag.getBoolean("CategorieSpigotMisc");
      case 17:
        return SSELocalStorag.getBoolean("CategorieSpigotFun");
      case 18:
        return SSELocalStorag.getBoolean("CategorieSpigotWorldManagement");
      case 22:
        return SSELocalStorag.getBoolean("CategorieSpigotMechanics");
      case 23:
        return SSELocalStorag.getBoolean("CategorieSpigotEconomy");
      case 24:
        return SSELocalStorag.getBoolean("CategorieSpigotGameMode");

      case 26:
        return SSELocalStorag.getBoolean("CategorieSpigotLibrariesAPIs");
      case 25:
        return (
          SSELocalStorag.getBoolean("CategorieSkript") ||
          SSELocalStorag.getBoolean("CategorieSpigotSkript")
        );
      case 19:
        return SSELocalStorag.getBoolean("CategorieStandalone");
      case 20:
        return SSELocalStorag.getBoolean("CategoriePaidPlugin");
      case 21:
        return (
          SSELocalStorag.getBoolean("CategorieSpigot") ||
          SSELocalStorag.getBoolean("CategorieBungeecord") ||
          SSELocalStorag.getBoolean("CategorieSpigotBungeecord")
        );
      case 27:
        return SSELocalStorag.getBoolean("CategorieWeb");
      default:
        return false;
    }
  }

  /* isinResourceName */

  static isinResourceName(resourceName) {
    //SearchType = contains

    //Currently handled by the Server
    return true;

    /*if (SSELocalStorag.getItem("SearchType") == 0) {
      let searchTextWordsNotFound = resourceSearchText.split(' ');

      for (let serachTextWord of resourceSearchText.split(' ')) {
        if (resourceName.toLowerCase().includes(serachTextWord.toLowerCase())) {

          if (searchTextWordsNotFound.includes(serachTextWord)) {
            searchTextWordsNotFound.splice(searchTextWordsNotFound.indexOf(serachTextWord), 1);
          }

          if (searchTextWordsNotFound.length == 0) {
            return true;
          }

        }
      }

    //SearchType = Equals
    } else if (SSELocalStorag.getItem("SearchType") == 1) {
      let searchTextWordsNotFound = resourceSearchText.split(' ');

      for (let serachTextWord of resourceSearchText.split(' ')) {
        for (let resourceNameWord of resourceName.split(' ')) {
          if (serachTextWord.toLowerCase() == resourceNameWord.toLowerCase()) {

            if (searchTextWordsNotFound.includes(serachTextWord)) {
              searchTextWordsNotFound.splice(searchTextWordsNotFound.indexOf(serachTextWord), 1);
            }

            if (searchTextWordsNotFound.length == 0) {
              return true;
            }

          }
        }
      }
    }*/
  }

  /* isinResourceTag */

  static isinResourceTag(resourceTag) {
    //SearchType = contains

    //Currently handled by the Server
    return true;

    /*if (SSELocalStorag.getItem("SearchType") == 0) {
      let searchTextWordsNotFound = resourceSearchText.split(' ');

      for (let serachTextWord of resourceSearchText.split(' ')) {
        if (resourceTag.toLowerCase().includes(serachTextWord.toLowerCase())) {

          if (searchTextWordsNotFound.includes(serachTextWord)) {
            searchTextWordsNotFound.splice(searchTextWordsNotFound.indexOf(serachTextWord), 1);
          }

          if (searchTextWordsNotFound.length == 0) {
            return true;
          }

        }
      }

    //SearchType = Equals
    } else if (SSELocalStorag.getItem("SearchType") == 1) {
      let searchTextWordsNotFound = resourceSearchText.split(' ');

      for (let serachTextWord of resourceSearchText.split(' ')) {
        for (let resourceTagWord of resourceTag.split(' ')) {
          if (serachTextWord.toLowerCase() == resourceTagWord.toLowerCase()) {

            if (searchTextWordsNotFound.includes(serachTextWord)) {
              searchTextWordsNotFound.splice(searchTextWordsNotFound.indexOf(serachTextWord), 1);
            }

            if (searchTextWordsNotFound.length == 0) {
              return true;
            }

          }
        }
      }
    }*/
  }

  /*
    loadRandomResources is displaying 3 of my ResourceS
    Providing the SpigotSearchEngine-Service is time intensive and it costs money...
    Displaying those 3 Resources in return is a fair deal in my eyes...
    Please don't remove it if you are publishing a new Version of the SSE Extension
  */

  static loadRandomResources() {
    fetch("https://fof1092.de/Plugins/SSE/randomPlugin.php")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "[SpigotMCSearchEngine] RandomPlugin - Error, Status Code: " +
              response.status
          );
          return;
        }

        response.json().then(function (data) {
          let featuredResources = "";

          for (let resource of data) {
            featuredResources += ResourceListener.getFeaturedResource(resource);
          }

          let divSection = document.createElement("div");
          divSection.classList.add("section");
          divSection.innerHTML =
            '<h2 class="MyFeaturedResourcesTextHeading">Plugins from <a href="resources/authors/43899/" class="username">F_o_F_1092</a>, the Developer of the SpigotSearchEngine Extension :)</h2><ol class="featuredResourceList">' +
            featuredResources +
            '</ol><div class="MyFeaturedResourcesListPlacholder"></div>';

          divActionFilterRow.parentNode.insertBefore(
            divSection,
            divActionFilterRow.nextSibling
          );
        });
      })
      .catch(function (err) {
        console.log(
          "[SpigotMCSearchEngine] RandomPlugin - Fetching Error: ",
          err
        );
      });

    /* CSP
    
    let divSection = document.createElement("div");
    divSection.classList.add('section');
    divSection.innerHTML = '<h2 class="MyFeaturedResourcesTextHeading"><a href="https://goo.gl/BbtCLe" class="username">ChristmasSurprisePlus - From the Developer of the SpigotSearchEngine Extension! :)</a></h2><a href="https://goo.gl/BbtCLe"><img src="https://i.imgur.com/igh1L7W.png" style="width:100%" alt="ChristmasSurprisePlus"></a><div class="MyFeaturedResourcesListPlacholder"></div>';
    divActionFilterRow.parentNode.insertBefore(divSection, divActionFilterRow.nextSibling);*/

    /* Halloween

    let rndNr = Math.floor((Math.random() * 5) + 1);
    let imgURL = 'https://fof1092.de/Plugins/SSE/mhp_' + rndNr + '.png';

    let divSection = document.createElement("div");
    divSection.classList.add('section');
    divSection.innerHTML = '<h2 class="MyFeaturedResourcesTextHeading"><a href="https://goo.gl/BbtCLe" class="username">MysteriousHalloweenPlus - From the Developer of the SpigotSearchEngine Extension! :)</a></h2><a href="https://www.spigotmc.org/resources/47648/"><img src="' + imgURL + '" style="width:100%" alt="ChristmasSurprisePlus"></a><div class="MyFeaturedResourcesListPlacholder"></div>';
    divActionFilterRow.parentNode.insertBefore(divSection, divActionFilterRow.nextSibling);*/
  }

  static getFeaturedResource(resourceData) {
    let resource = new Resource(resourceData);

    return (
      '<li class="featuredResource MyFeaturedResources"><div class="resourceImage"><a href="resources/' +
      resource.getID() +
      '/" class="resourceIcon"><img src="' +
      resource.getIcon() +
      '" alt=""></a></div><div class="resourceInfo"><h3 class="title"><a href="resources/' +
      resource.getID() +
      '/">' +
      resource.getName() +
      '</a></h3><div class="tagLine muted">' +
      resource.getTag() +
      '</div><div class="details muted"><a href="members/' +
      resource.getAuthor().getID() +
      '/" class="username"><span class="style10">' +
      resource.getAuthor().getName() +
      '</span></a>, <a href="resources/' +
      resource.getID() +
      '/" class="faint"><span class="DateTime">' +
      resource.getUpdateTime().getDateWithFormat() +
      "</span></a></div></div></li>"
    );
  }

  /*
    The getUserID function is an optional part witch is used to block Users who are misusing the Service
    An option to disable this will be implemented if I'll find a better solution for the problem...
  */

  static getUserID() {
    let userID = "&UserID=" + SSELocalStorag.getItem("UserID");

    let links = document.links;
    for (let i = 0; i < links.length; i++) {
      if (links[i].innerHTML == "Your Profile Page") {
        userID +=
          "&SpigotID=" +
          links[i].href
            .replace("https://www.spigotmc.org/members/", "")
            .replace("/", "");
        break;
      }
    }

    return userID;
  }
}
