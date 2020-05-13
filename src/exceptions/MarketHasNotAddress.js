class MarketHasNotAddress extends Error {
  constructor(message = 'Market has not address') {
    super(message);
    this.status = 422;
  }
}

module.exports = MarketHasNotAddress;
