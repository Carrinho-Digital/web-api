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
  const filterBy = request.query.filterBy;
  let filter = {};

  if (filterBy) {
    const filterValues = filterBy.split(',');

    if (filterValues.length > 0) {
      filter = filterValues.reduce((current, filterValue) => {
        const [field, value] = filterValue.split(':');
        return {
          ...current,
          [field]: value,
        };
      }, {});
    }
  }

  return {
    page: parseInt(request.query.page) || 0,
    limit: parseInt(request.query.limit) || 10,
    query: filter,
  };
}

module.exports.paginate = paginate;
module.exports.getSearchParams = getSearchParams;
