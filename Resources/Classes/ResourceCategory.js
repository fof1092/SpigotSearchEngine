class ResourceCategory {
  constructor(categoryObj) {
    this.id = categoryObj.id;
    this.name = categoryObj.name;
    this.url = categoryObj.url;
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

  getHTML() {
    return (
      ', <a href="resources/categories/' +
      this.getId() +
      '">' +
      this.getName() +
      "</a>"
    );
  }
}
