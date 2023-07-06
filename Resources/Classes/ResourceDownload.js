class ResourceDownload {

  constructor(downloadObj, downloadsObj) {
    this.sizeType = downloadObj.sizeType;
    this.size = downloadObj.size;
    this.link = downloadObj.link;
    this.type = downloadObj.type;

    this.downloads = downloadsObj;
  }

  getSizeType() {
    return this.sizeType;
  }

  getSize() {
    return this.size;
  }

  getLink() {
    return this.link;
  }

  getType() {
    return this.type;
  }

  getDownloads() {
    return this.downloads;
  }

  getHTML(isPremium) {
    let downloadText = "Downloads:";

    if (isPremium) {
      downloadText = "Buyers:"
    }

    return '<dl class="resourceDownloads"><dt>' + downloadText + '</dt> <dd>' + this.getDownloads().toLocaleString() + '</dd></dl>';
  }

}
