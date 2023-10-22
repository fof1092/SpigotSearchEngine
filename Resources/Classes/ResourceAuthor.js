class ResourceAuthor {

  constructor(authorObj) {
    this.id = authorObj.id;
    this.name = authorObj.name;
    this.url = authorObj.url;
    this.iconUrl = authorObj.iconUrl;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getUrl() {
    return this.url;
  }

  getIconUrl() {
    return this.icon;
  }


  getHTMLIcon() {
    return ''
    //return '<a href="members/' + this.getId() + '/" class="avatar Av43899s creatorMini" data-avatarhtml="true"><img src="' + this.getIconUrl() + '" width="48" height="48" alt="' + this.getName() + '"></a>';
  }

  getHTMLName() {
    //return 'By <a href="members/' + this.getId() + '/" class="username" dir="auto">' + this.getName() + '</a>,';
    return 'By <a href="members/' + this.getId() + '/" class="username" dir="auto">' + this.getName() + '</a>';
  }
}
