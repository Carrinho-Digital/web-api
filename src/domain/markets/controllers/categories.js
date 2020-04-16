const {
  categories: categoriesUseCase,
} = require('../useCases');

async function categories(request, response) {
  return response.status(200).json({
    categories: categoriesUseCase(),
  });
}

module.exports = categories;
