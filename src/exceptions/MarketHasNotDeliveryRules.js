class MarketHasNotAddress extends Error {
  constructor(message = 'Market has not delivery rules') {
    super(message);
    this.status = 422;
  }
}

module.exports = MarketHasNotAddress;
