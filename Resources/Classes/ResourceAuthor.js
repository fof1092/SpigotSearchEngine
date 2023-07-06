class ResourceAuthor {

  constructor(authorObj) {
    this.id = authorObj.id;
    this.name = authorObj.name;
    this.icon = authorObj.icon;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getIcon() {
    return this.icon;
  }


  getHTMLIcon() {
    return '<a href="members/' + this.getID() + '/" class="avatar Av43899s creatorMini" data-avatarhtml="true"><img src="' + this.getIcon() + '" width="48" height="48" alt="' + this.getName() + '"></a>';
  }

  getHTMLName() {
    return 'By <a href="members/' + this.getID() + '/" class="username" dir="auto">' + this.getName() + '</a>,';
  }
}
