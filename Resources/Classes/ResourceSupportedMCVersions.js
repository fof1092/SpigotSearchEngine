class ResourceSupportedMCVersions {

  constructor(supportedMCVersionsObj) {
    if (supportedMCVersionsObj == null) {
      this.versions = [];
      this.versions.push("Unknown");
    } else {
      this.versions = supportedMCVersionsObj;
    }
  }

  getVersions() {
    return this.versions;
  }

  supportsVersion(version) {
    return this.versions.includes(version);
  }
}
