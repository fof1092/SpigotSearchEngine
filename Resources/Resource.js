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

    this.categorie = new ResourceCategory(jsonObj.category);

    this.iconUrl = jsonObj.iconUrl;

    this.author = new ResourceAuthor(jsonObj.author);

    if (jsonObj.pluginContributors != null) {
      this.pluginContributors = jsonObj.pluginContributors;
    }

    //this.submitTime = new ResourceTime(jsonObj.submitTime);
    //this.updateTime = new ResourceTime(jsonObj.updateTime);
    this.submitTime = new ResourceTime(jsonObj.id);
    this.updateTime = new ResourceTime(jsonObj.id);

    this.rating = new ResourceRating(jsonObj.rating);
    this.download = new ResourceDownload(jsonObj.download);

    if (jsonObj.price != null) {
      this.price = new ResourcePrice(jsonObj.price);
    }

    this.testedMinecraftVersions = new ResourceTestedMinecraftVersions(jsonObj.testedMinecraftVersions);

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



  getId() {
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


  getIconUrl() {
    return this.iconUrl;
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


  getPrice() {
    return this.price;
  }

  hasPrice() {
    return this.getPrice() != null;
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


  gettestedMinecraftVersions() {
    return this.testedMinecraftVersions;
  }

  hastestedMinecraftVersions() {
    return this.gettestedMinecraftVersions() != null;
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
    return this.sourceCode;
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

    //liResourceListItem.innerHTML = '<div class="listBlock resourceImage"><div class="listBlockInner"><a href="resources/' + this.getId() + '/" class="resourceIcon"><img src="' + this.getIconUrl() + '" alt=""></a>' + this.getAuthor().getHTMLIcon() + '</div></div>';
    liResourceListItem.innerHTML = '<div class="listBlock resourceImage"><div class="listBlockInner"><a href="resources/' + this.getId() + '/" class="resourceIcon"><img src="' + this.getIconUrl() + '" alt=""></a></div></div>';


    let price = '';
    if (this.hasPrice()) {
      price = this.getPrice().getHTML();
    }

    //liResourceListItem.innerHTML += '<div class="listBlock main"><div class="listBlockInner">' + price + '<h3 class="title"><a href="resources/' + this.getId() + '">' + this.getName() + ' </a><span class="version">' + this.getVersion() + '</span></h3><div class="resourceDetails muted">' + this.getAuthor().getHTMLName() + '<a href="resources/' + this.getId() + '/" class="faint"><span class="DateTime"> ' + this.getSubmitTime().getDateWithFormat() + '</span></a>' + this.getCategorie().getHTML() + '</div><div class="tagLine">' + this.getTag() + '</div></div></div>';
    liResourceListItem.innerHTML += '<div class="listBlock main"><div class="listBlockInner">' + price + '<h3 class="title"><a href="resources/' + this.getId() + '">' + this.getName() + ' </a><span class="version">' + this.getVersion() + '</span></h3><div class="resourceDetails muted">' + this.getAuthor().getHTMLName() + '<a href="resources/' + this.getId() + '/" class="faint"><span class="DateTime"></span></a>' + this.getCategorie().getHTML() + '</div><div class="tagLine">' + this.getTag() + '</div></div></div>';

    //liResourceListItem.innerHTML += '<div class="listBlock resourceStats"><div class="listBlockInner">' + this.getRating().getHTML() + '<div class="pairsJustified">' + this.getDownload().getHTML(this.hasPrice()) + '<dl class="resourceUpdated"><dt>Updated:</dt> <dd><a href="resources/' + this.getId() + '/updates" class="concealed"><abbr class="DateTime">' + this.getUpdateTime().getDateWithFormat() + '</abbr></a></dd></dl></div></div></div>';
    liResourceListItem.innerHTML += '<div class="listBlock resourceStats"><div class="listBlockInner">' + this.getRating().getHTML() + '<div class="pairsJustified">' + this.getDownload().getHTML(this.hasPrice()) + '<dl class="resourceUpdated"><dt>Updates: </dt> <dd><a href="resources/' + this.getId() + '/updates" class="concealed"><abbr class="DateTime"> Link</abbr></a></dd></dl></div></div></div>';

    return liResourceListItem;
  }
}
