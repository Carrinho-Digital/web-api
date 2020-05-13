const User = require('../models/user');

async function getValidLocations(request, response) {
  return response.json(User.getAuthorizedLocations());
}

module.exports = getValidLocations;
