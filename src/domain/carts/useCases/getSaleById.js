const { Cart } = require('../models/cart');
const { Product } = require('../../products/models/product');

const {
  NotFound: NotFoundException,
} = require('../../../exceptions');

function buildGetSaleById({
  getAddressById,
  deliveryPrice,
  deliveryDistance,
  findCurrentPromotionByProduct,
}) {
  async function populateSaleProducts(saleProducts) {
    function getProductById(productId) {
      return Product
        .findOne({ _id: productId })
        .select(
          '_id name inactive market isDeleted tags images sellPrice size unit');
    }

    const populated = saleProducts.map(async ({ _id, product, quantity }) => {
      return {
        _id,
        quantity,
        product: await getProductById(product),
      };
    });

    return Promise.all(populated);
  }

  async function populatePromtionOnProducts(
    salePopulatedProducts, sale,
  ) {
    const productsWithPromotion = salePopulatedProducts
      .map(async ({ _id, quantity, product }) => {
        const promotion = await findCurrentPromotionByProduct(
          product, product.market, sale.updatedAt);

        return {
          _id,
          quantity,
          product,
          promotion: promotion,
        };
      });

    return Promise.all(productsWithPromotion);
  }

  function calculeTotalPromotions(totalPrice = 0, products = []) {
    if (products.length < 1) return [0, 0];

    const promotions = products.reduce((aggr, { promotion, quantity }) => {
      if (!promotion || Object.keys(promotion).length < 1) {
        return aggr + 0;
      }

      if (promotion.discountInPercent) {
        const discountInPercent = Number(promotion.discountInPercent);
        const percentToValue = Number(totalPrice) * (discountInPercent / 100);

        return aggr + percentToValue;
      }

      if (promotion.discountInPrice) {
        return aggr + (Number(promotion.discountInPrice) * quantity);
      }

      return aggr + 0;
    }, 0);


    const priceAfterPromotions = totalPrice - promotions;

    return [promotions, priceAfterPromotions];
  }

  return async function getSaleById(saleId, marketId) {
    const getSaleByIdQuery = {
      _id: saleId,
      closed: true,
      market: marketId,
    };

    const saleInstance = await Cart
      .findOne(getSaleByIdQuery)
      .populate('user', '-password');

    if (!saleInstance) {
      throw new NotFoundException('Cannot found sale');
    }

    let sale = saleInstance.toObject();

    if (!sale) {
      throw new NotFoundException('Cannot found sale');
    }

    if (sale.delivery && sale.delivery.method === 'delivery') {
      const populatedAddress = await getAddressById(
        sale.delivery.address, sale.user._id);

      const distanceToCustomer = await deliveryDistance(
        sale.delivery.address,
        sale.user._id,
        marketId,
      );

      const distanceToCustomerInKm = distanceToCustomer / 1000;

      const totalPriceOfDelivery = await deliveryPrice(
        distanceToCustomerInKm,
        marketId,
      );

      sale = {
        ...sale,
        delivery: {
          ...sale.delivery,
          address: populatedAddress,
          price: totalPriceOfDelivery,
        },
      };
    }

    const saleProducts = sale.products || [];

    if (saleProducts.length > 0) {
      const salePopulatedProducts = await populateSaleProducts(saleProducts);

      const saleProductsWithPromotion = await populatePromtionOnProducts(
        salePopulatedProducts, sale);

      const productsPrice = await saleInstance.totalPriceOfProducts();
      const [totalPromotions, priceAfterPromotions] = calculeTotalPromotions(
        productsPrice, saleProductsWithPromotion);

      sale = {
        ...sale,
        price: productsPrice,
        promotions: {
          totalPromotions: totalPromotions,
          totalPriceAfterPromotions: priceAfterPromotions,
        },
        products: saleProductsWithPromotion,
      };
    }

    return sale;
  };
}

module.exports = buildGetSaleById;
