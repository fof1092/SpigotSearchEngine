class ResourceLanguage {

  constructor(languageObj) {
    if (languageObj.includes(', ')) {
      this.languages = languageObj.split(', ');
    } else {
      this.languages = [];
      this.languages.push(languageObj);
    }
  }

  getLanguages() {
    return this.languages;
  }

  supportsLanguage(version) {
    return this.languages.includes(version);
  }
}
