const { Cart } = require('../../carts/models/cart');

function buildGetSales({
  simplePaginate,
  getRefSearch,
}) {
  function filterUserSearchQuery(userSearch, sales) {
    function saleContainsUserName(user) {
      if (!userSearch.name) return true;

      const userName = user.name.toLowerCase();
      const searchName = userSearch.name.toLowerCase();

      return userName.indexOf(searchName) > -1;
    }

    function saleContainsUserDocument(user) {
      if (!userSearch.document) return true;

      return userSearch.document === user.document;
    }

    function saleContainsUserPhone(user) {
      if (!userSearch.phone) return true;

      return user.phones.includes(userSearch.phone);
    }

    return sales.filter(sale => {
      const user = sale.user;

      const containsName = saleContainsUserName(user);
      const containsDocument = saleContainsUserDocument(user);
      const containsPhone = saleContainsUserPhone(user);

      return containsName && containsDocument && containsPhone;
    });
  }

  function paginateSales(sales, salesTotal, searchParams) {
    const skip = searchParams.page * searchParams.limit;
    const take = skip + searchParams.limit;

    const paginatedSales = sales.slice(skip, take);

    return simplePaginate(
      paginatedSales,
      salesTotal,
      searchParams,
    );
  }

  return async function getSales(
    marketId,
    searchParams = { page: 0, limit: 10, query: {} },
  ) {
    const [userSearch, queryParams] = getRefSearch('user', searchParams.query);

    const salesQuery = {
      ...queryParams,
      'market': marketId,
      'closed': true,
    };

    let sales = await Cart.find(salesQuery).populate('user');

    if (userSearch) {
      sales = filterUserSearchQuery(userSearch, sales);
    }

    const salesTotal = await Cart.count(salesQuery);

    return paginateSales(sales, salesTotal, searchParams);
  };
}

module.exports = buildGetSales;
