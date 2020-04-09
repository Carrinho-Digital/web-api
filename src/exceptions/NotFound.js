class NotFound extends Error {
  constructor(message = 'Cannot be found', status = 404) {
    super(message);
    this.status = status;
  }
}

module.exports = NotFound;
