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

    fetch('https://fof1092.de/Plugins/SSE/resourceSearch.php?SearchText=' + inpSearchResourcesText.replace(" ", "%20") + ResourceListener.getUserID())
     .then(
       function(response) {
         if (response.status !== 200) {
           console.log('[SpigotMCSearchEngine] ResourceSearch - Error, Status Code: ' + response.status);
           return;
         }

         response.json().then(function(data) {
           resources = [];
           resourceSearchText = inpSearchResourcesText;

           for (let resource of data) {
             resources.push(new Resource(resource));
           }

           ResourceListener.sortAndDisplay();
         });
       }
     )
     .catch(function(err) {
       console.log('[SpigotMCSearchEngine] ResourceSearch - Fetching Error: ', err);
     });
  }



  /* Sorting */

  static sortByPriority() {
    for (let resource of resources) {
      // 1 icon = 50 | 1 download = 1 | 1 star = 10

      let resourcePoints = 0;
      if (resource.getIcon() != '//static.spigotmc.org/styles/spigot/xenresource/resource_icon.png') {
        resourcePoints += 50;
      }

      resourcePoints += resource.getDownload().getDownloads();
      resourcePoints += resource.getRating().getRaters() * resource.getRating().getRating() * 10;

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


  static sortAndDisplay() {

    switch(SSEGuiManager.getSortByID(SSELocalStorag.getItem('SortBy'))) {
      case "SortByPriority":
        ResourceListener.sortByPriority();
        break;
      case "SortByUpdate":
        ResourceListener.sortByUpdate();
        break;
      case "SortByDownloads":
        ResourceListener.sortByDownloads();
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


      for (let resource of resources) {

        //In PluginName / PluginTag
        if (SSELocalStorag.getBoolean("SearchOnPluginName") && ResourceListener.isinResourceName(resource.getName()) || SSELocalStorag.getBoolean("SearchOnPluginTag") && ResourceListener.isinResourceTag(resource.getTag())) {

          //Selected Categorie Visible
          if (ResourceListener.isCategorieVisible(resource.getCategorie().getID())) {

            //Selected Version visible
            if (resource.hasSupportedMCVersions() && ResourceListener.isVersionVisible(resource.getSupportedMCVersions().getVersions()) || !resource.hasSupportedMCVersions()) {

              divResourceListItemParent.appendChild(resource.getHTML());
            }
          }
        }
      }
    }
  }



  /* isVersionVisible */

  static isVersionVisible(versions) {
    for (let version of versions) {

      switch(version) {
        case "Unknown":
          if (SSELocalStorag.getBoolean("Version_Unknown")) {
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
    switch(categorieID) {
      case 2:
      case 5:
      case 6:
      case 7:
      case 8:
        return SSELocalStorag.getBoolean("CategorieSpigotBungeecord");
        break;
      case 3:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
        return SSELocalStorag.getBoolean("CategorieBungeecord");
        break;
      case 4:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 22:
      case 23:
      case 24:
      case 26:
        return SSELocalStorag.getBoolean("CategorieSpigot");
        break;
      case 25:
        return SSELocalStorag.getBoolean("CategorieSkript");
        break;
      case 19:
        return SSELocalStorag.getBoolean("CategorieStandalone");
        break;
      case 20:
        return SSELocalStorag.getBoolean("CategoriePaidPlugin");
        break;
      case 21:
        return SSELocalStorag.getBoolean("CategorieSpigot") || SSELocalStorag.getBoolean("CategorieBungeecord") || SSELocalStorag.getBoolean("CategorieSpigotBungeecord");
        break;
      case 27:
        return SSELocalStorag.getBoolean("CategorieWeb");
        break;
      default:
        return false;
        break;
    }
  }


  /* isinResourceName */

  static isinResourceName(resourceName) {
    //SearchType = contains
    if (SSELocalStorag.getItem("SearchType") == 0) {
      for (let serachTextWord of resourceSearchText.split(' ')) {

        if (resourceName.toLowerCase().includes(serachTextWord.toLowerCase())) {
          return true;
        }
      }

    //SearchType = Equals
    } else if (SSELocalStorag.getItem("SearchType") == 1) {
      for (let serachTextWord of resourceSearchText.split(' ')) {
        for (let resourceNameWord of resourceName.split(' ')) {

          if (serachTextWord.toLowerCase() == resourceNameWord.toLowerCase()) {
            return true;
          }
        }
      }
    }
  }


  /* isinResourceTag */

  static isinResourceTag(resourceTag) {
    //SearchType = contains
    if (SSELocalStorag.getItem("SearchType") == 0) {
      for (let serachTextWord of resourceSearchText.split(' ')) {

        if (resourceTag.toLowerCase().includes(serachTextWord.toLowerCase())) {
          return true;
        }
      }

    //SearchType = Equals
    } else if (SSELocalStorag.getItem("SearchType") == 1) {
      for (let serachTextWord of resourceSearchText.split(' ')) {
        for (let resourceTagWord of resourceTag.split(' ')) {

          if (resourceTagWord.toLowerCase() == resourceTagWord.toLowerCase()) {
            return true;
          }
        }
      }
    }
  }


  /*
    loadRandomResources is displaying 3 of my ResourceS
    Providing the SpigotSearchEngine-Service is time intensive and it costs money...
    Displaying those 3 Resources in return is a fair deal in my eyes...
    Please don't remove it if you are publishing a new Version of the SSE Extension
  */

  static loadRandomResources() {

    fetch('https://fof1092.de/Plugins/SSE/randomPlugin.php')
     .then(
       function(response) {
         if (response.status !== 200) {
           console.log('[SpigotMCSearchEngine] RandomPlugin - Error, Status Code: ' + response.status);
           return;
         }

         response.json().then(function(data) {

           let divSection = document.createElement("div");
           divSection.classList.add('section');
           divSection.innerHTML = '<h2 class="MyFeaturedResourcesTextHeading">Plugins from <a href="resources/authors/43899/" class="username">F_o_F_1092</a>, the Developer of the SpigotSearchEngine Extension :)</h2><ol class="featuredResourceList">' + ResourceListener.getFeaturedResource(data[0]) + ResourceListener.getFeaturedResource(data[1]) + '</ol><div class="MyFeaturedResourcesListPlacholder"></div>';

           divActionFilterRow.parentNode.insertBefore(divSection, divActionFilterRow.nextSibling);
         });
       }
     )
     .catch(function(err) {
       console.log('[SpigotMCSearchEngine] RandomPlugin - Fetching Error: ', err);
     });
  }


  static getFeaturedResource(resourceData) {
    let resource = new Resource(resourceData);

    return '<li class="featuredResource MyFeaturedResources"><div class="resourceImage"><a href="resources/' + resource.getID() + '/" class="resourceIcon"><img src="' + resource.getIcon() + '" alt=""></a></div><div class="resourceInfo"><h3 class="title"><a href="resources/' + resource.getID() + '/">' + resource.getName() + '</a></h3><div class="tagLine muted">' + resource.getTag() + '</div><div class="details muted"><a href="members/' + resource.getAuthor().getID() + '/" class="username"><span class="style10">' + resource.getAuthor().getName() + '</span></a>, <a href="resources/' + resource.getID() + '/" class="faint"><span class="DateTime">' + resource.getUpdateTime().getDateWithFormat() + '</span></a></div></div></li>';
  }


  /*
    The getUserID function is an optional part witch is used to block Users who are misusing the Service
    An option to disable this will be implemented if I'll find a better solution for the problem...
  */

  static getUserID() {
    let userID = "&UserID=" + SSELocalStorag.getItem("UserID");

    let links = document.links;
    for(let i = 0; i < links.length; i++) {
      if (links[i].innerHTML == "Your Profile Page") {
        userID += "&SpigotID=" + links[i].href.replace("https://www.spigotmc.org/members/", "").replace("/", "");
        break;
      }
    }

    return userID;
  }
}
