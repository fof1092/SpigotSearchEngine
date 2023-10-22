class ResourceDownload {

  constructor(downloadObj) {
    this.count = downloadObj.count;
  }

  getCount() {
    return this.count;
  }

  getHTML(hasPrice) {
    let downloadText = "Downloads:";

    if (hasPrice) {
      downloadText = "Buyers:"
    }

    return '<dl class="resourceDownloads"><dt>' + downloadText + '</dt> <dd>' + this.getCount().toLocaleString() + '</dd></dl>';
  }

}
