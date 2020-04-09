async function paginate(
  items = [], searchParams = { limit: 5, page: 0, query: {} }, Model) {
  const count = await Model.count(searchParams.query);

  return {
    data: items,
    itemsPerPage: items.length,
    currentPage: searchParams.page,
    totalPages: Math.ceil(count / searchParams.limit),
  };
}

function getSearchParams(request) {
  return {
    page: parseInt(request.query.page) || 0,
    limit: parseInt(request.query.limit) || 10,
  };
}

module.exports.paginate = paginate;
module.exports.getSearchParams = getSearchParams;
