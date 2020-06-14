function getRefSearch(referenceName, query) {
  const queryKeys = Object.keys(query);

  if (queryKeys.length < 1) return [null, query];

  const refSearchKeys = queryKeys.filter(
    key => key.includes(`${referenceName}.`));

  if (refSearchKeys < 1) return [null, query];

  const searchWithoutRefKeys = queryKeys.filter(
    key => !key.includes(`${referenceName}.`));

  const withoutRef = searchWithoutRefKeys.reduce((prev, key) => {
    const valueOnQuery = query[key];
    return {...prev, [key]: valueOnQuery};
  }, {});

  const refSearch = refSearchKeys.reduce((prev, refKey) => {
    const valueOnQuery = query[refKey];
    const [, field] = refKey.split('.');

    return {...prev, [field]: valueOnQuery};
  }, {});

  return [refSearch, withoutRef];
}

async function paginate(
  items = [], searchParams = { limit: 10, page: 0, query: {} }, Model) {
  const count = await Model.count(searchParams.query);

  return {
    data: items,
    itemsPerPage: items.length,
    currentPage: searchParams.page,
    totalPages: Math.ceil(count / searchParams.limit),
  };
}

function simplePaginate(items, count, searchParams = { limit: 10, page: 0 }) {
  return {
    data: items,
    itemsPerPage: items.length,
    currentPage: searchParams.page,
    totalPages: Math.ceil(count / searchParams.limit),
  };
}

const specialChars = {
  GT: '>',
  LT: '<',
  EQ: '=',
  ARRAY: '|',
};

function getSearchParams(request) {
  function hasSpecialChar(value, char) {
    return value.indexOf(char) > -1;
  }

  function isOrEqual(value, comparator) {
    const indexOfEqual = value.indexOf(specialChars.EQ);
    if (indexOfEqual < 0) return false;

    const indexOfComparator = value.indexOf(comparator);

    return (indexOfEqual - 1) === indexOfComparator;
  }

  const filterBy = request.query.filterBy;
  let filter = {};

  if (filterBy) {
    const filterValues = filterBy.split(';');

    if (filterValues.length > 0) {
      filter = filterValues.reduce((current, filterValue) => {
        const [field, value] = filterValue.split(',');

        const isValueArray = hasSpecialChar(value, specialChars.ARRAY);
        const isGtValue = hasSpecialChar(value, specialChars.GT);
        const isLtValue = hasSpecialChar(value, specialChars.LT);

        const filterField = {
          [field]: value,
        };

        if (isValueArray) {
          filterField[field] = {
            $in: value.split(specialChars.ARRAY),
          };
        }

        if (isGtValue) {
          if (isOrEqual(value, specialChars.GT)) {
            const [, valueToCompare] = value.split(specialChars.EQ);
            filterField[field] = {
              $gte: valueToCompare,
            };
          } else {
            const [, valueToCompare] = value.split(specialChars.GT);
            filterField[field] = {
              $gt: valueToCompare,
            };
          }
        }

        if (isLtValue) {
          if (isOrEqual(value, specialChars.LT)) {
            const [, valueToCompare] = value.split(specialChars.EQ);
            filterField[field] = {
              $lte: valueToCompare,
            };
          } else {
            const [, valueToCompare] = value.split(specialChars.LT);
            filterField[field] = {
              $lt: valueToCompare,
            };
          }
        }

        return {
          ...current,
          ...filterField,
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

module.exports.getRefSearch = getRefSearch;
module.exports.simplePaginate = simplePaginate;
module.exports.paginate = paginate;
module.exports.getSearchParams = getSearchParams;
