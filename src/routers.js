const authRoutes = require('./domain/auth/controllers');
const userRoutes = require('./domain/users/controllers');
const productRoutes = require('./domain/products/controllers');
const marketRoutes = require('./domain/markets/controllers');
const cartRoutes = require('./domain/carts/controllers');
const promotionRoutes = require('./domain/promotions/controllers');

module.exports = router => {
  router.use('/v1/markets', marketRoutes);

  router.use('/v1/users', userRoutes);

  router.use('/v1/auth', authRoutes);

  router.use('/v1/products', productRoutes);

  router.use('/v1/carts', cartRoutes);

  router.use('/v1/promotions', promotionRoutes);

  return router;
};
