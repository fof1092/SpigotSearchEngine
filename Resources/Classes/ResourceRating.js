class ResourceRating {

  constructor(ratingObj) {
    this.raters = ratingObj.raters;
    this.rating = ratingObj.rating;
  }

  getRaters() {
    return this.raters;
  }

  getRating() {
    return this.rating;
  }

  getHTML() {
    let rating = this.getRating();
    let ratingText = '';

    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        ratingText += '<span class="star Full"></span>';
        rating -= 1;

      } else if (rating >= 0.5) {
        ratingText += '<span class="star Half"></span>'
        rating = 0;
      } else {
        ratingText += '<span class="star"></span>'
      }
    }


    return '<div class="rating"><dl><dt class="prompt muted"></dt><dd><span class="ratings" title="' + this.getRating() + '">' + ratingText + '</span><span class="RatingValue"><span class="Number" itemprop="average">5</span>/<span itemprop="best">5</span>,</span><span class="Hint">' + this.getRaters() + ' ratings</span></dd></dl></div>';
  }
}
