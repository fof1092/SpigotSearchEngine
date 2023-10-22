class ResourceTestedMinecraftVersions {

  constructor(testedMinecraftVersionsObj) {
    if (testedMinecraftVersionsObj == null) {
      this.versions = [];
      this.versions.push("Unknown");
    } else {
      this.versions = testedMinecraftVersionsObj;
    }
  }

  getVersions() {
    return this.versions;
  }

  supportsVersion(version) {
    return this.versions.includes(version);
  }
}
