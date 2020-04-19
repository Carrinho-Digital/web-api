class PromotionsNotAvailable extends Error {
  constructor(message, promotions, status) {
    super(message);
    this.status = status;
    this.promotions = promotions;
  }
}

module.exports = PromotionsNotAvailable;
