class ResourceTime {

  constructor(timeObj) {
    this.time = timeObj;
  }

  getTime() {
    return this.time;
  }

  getDateTime() {
    return new Date(this.time);
  }

  getDateWithFormat() {
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return monthNames[this.getDateTime().getMonth()] + " " + this.getDateTime().getDate() + ', ' + this.getDateTime().getFullYear();
  }
}
