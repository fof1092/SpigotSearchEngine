/*
  The Resource.js is used to Save all requested Resource Informations
  Its also able to create the HTML version of the Resource
*/

class Resource {

  constructor(jsonObj) {
    this.priority = 0;


    this.id = jsonObj.id;

    this.name = jsonObj.name;
    this.tag = jsonObj.tag;
    this.version = jsonObj.version;

    this.categorie = new ResourceCategorie(jsonObj.categorie);

    this.icon = jsonObj.icon;

    this.author = new ResourceAuthor(jsonObj.author);

    if (jsonObj.pluginContributors != null) {
      this.pluginContributors = jsonObj.pluginContributors;
    }

    this.submitTime = new ResourceTime(jsonObj.submitTime);
    this.updateTime = new ResourceTime(jsonObj.updateTime);

    this.rating = new ResourceRating(jsonObj.rating);
    this.download = new ResourceDownload(jsonObj.download, jsonObj.downloads);

    if (jsonObj.premium != null) {
      this.premium = new ResourcePremium(jsonObj.premium);
    }

    this.supportedMCVersions = new ResourceSupportedMCVersions(jsonObj.supportedMCVersions);

    if (jsonObj.pluginLanguages != null) {
      this.languages = new ResourceLanguage(jsonObj.pluginLanguages);
    }

    if (jsonObj.pluginSupportLink != null) {
      this.supportLink = jsonObj.pluginSupportLink;
    }
    if (jsonObj.pluginDiscussLink != null) {
      this.discussLink = jsonObj.pluginDiscussLink;
    }
    if (jsonObj.pluginSourceCode != null) {
      this.sourceCode = jsonObj.pluginSourceCode;
    }
    if (jsonObj.pluginMoreInfosAt != null) {
      this.moreInfosAt = jsonObj.pluginMoreInfosAt;
    }
  }

  getPriority() {
    return this.priority;
  }

  setPriority(priority) {
    this.priority = priority;
  }



  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getTag() {
    return this.tag;
  }

  getVersion() {
    return this.version;
  }


  getCategorie() {
    return this.categorie;
  }


  getIcon() {
    return this.icon;
  }


  getAuthor() {
    return this.author;
  }


  getContributors() {
    return this.pluginContributors;
  }

  hasContributors() {
    return getContributors() != null;
  }


  getPremium() {
    return this.premium;
  }

  isPremium() {
    return this.getPremium() != null;
  }


  getSubmitTime() {
    return this.submitTime;
  }

  getUpdateTime() {
    return this.updateTime;
  }


  getRating() {
    return this.rating;
  }

  getDownload() {
    return this.download;
  }


  getSupportedMCVersions() {
    return this.supportedMCVersions;
  }

  hasSupportedMCVersions() {
    return this.getSupportedMCVersions() != null;
  }

  getLanguages() {
    return this.languages;
  }

  hasLanguages() {
    return this.getLanguages() != null;
  }


  getSupportLink() {
    return this.pluginSupportLink;
  }

  hasSupportLink() {
    return this.getSupportLink() != null;
  }

  getDiscussLink() {
    return this.pluginDiscussLink;
  }

  hasDiscussLink() {
    return this.getDiscussLink() != null;
  }

  getSourceCodeLink() {
    return this.pluginSourceCode;
  }

  hasSourceCodeLink() {
    return this.getSourceCodeLink() != null;
  }

  getMoreInfosAtLink() {
    return this.pluginMoreInfosAt;
  }

  hasMoreInfosAtLink() {
    return this.getMoreInfosAtLink() != null;
  }


  getHTML() {
    var liResourceListItem = document.createElement("li");
    liResourceListItem.classList.add('resourceListItem');

    liResourceListItem.innerHTML = '<div class="listBlock resourceImage"><div class="listBlockInner"><a href="resources/' + this.getID() + '/" class="resourceIcon"><img src="' + this.getIcon() + '" alt=""></a>' + this.getAuthor().getHTMLIcon() + '</div></div>';


    let price = '';
    if (this.isPremium()) {
      price = this.getPremium().getHTML();
    }

    liResourceListItem.innerHTML += '<div class="listBlock main"><div class="listBlockInner">' + price + '<h3 class="title"><a href="resources/' + this.getID() + '">' + this.getName() + ' </a><span class="version">' + this.getVersion() + '</span></h3><div class="resourceDetails muted">' + this.getAuthor().getHTMLName() + '<a href="resources/' + this.getID() + '/" class="faint"><span class="DateTime"> ' + this.getSubmitTime().getDateWithFormat() + '</span></a>' + this.getCategorie().getHTML() + '</div><div class="tagLine">' + this.getTag() + '</div></div></div>';

    liResourceListItem.innerHTML += '<div class="listBlock resourceStats"><div class="listBlockInner">' + this.getRating().getHTML() + '<div class="pairsJustified">' + this.getDownload().getHTML(this.isPremium()) + '<dl class="resourceUpdated"><dt>Updated:</dt> <dd><a href="resources/' + this.getID() + '/updates" class="concealed"><abbr class="DateTime">' + this.getUpdateTime().getDateWithFormat() + '</abbr></a></dd></dl></div></div></div>';

    return liResourceListItem;
  }
}
