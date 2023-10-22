class ResourcePrice {

  constructor(priceObj) {
    this.amount = priceObj.amount;
    this.currency = priceObj.currency;
  }

  getAmount() {
    return this.amount;
  }

  getCurrency() {
    return this.currency;
  }

  getHTML() {
    return '<span class="cost">' + (Math.round(this.getAmount() * 2) / 2).toFixed(2) + ' ' + this.getCurrency().toUpperCase() + '</span>';
  }
}
