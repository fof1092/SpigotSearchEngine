class ResourcePremium {

  constructor(premiumObj) {
    this.price = premiumObj.price;
    this.currency = premiumObj.currency;
  }

  getPrice() {
    return this.price;
  }

  getCurrency() {
    return this.currency;
  }

  getHTML() {
    return '<span class="cost">' + (Math.round(this.getPrice() * 2) / 2).toFixed(2) + ' ' + this.getCurrency() + '</span>';
  }
}
