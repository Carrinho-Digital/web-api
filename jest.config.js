process.env.SALT=8;
process.env.SECRET='TESTSECRET';
process.env.ISSUER='BLA';
process.env.AUDIENCE='BLABLA';
process.env.EXPIRE_IN_MINUTES=240;

process.env.GOOGLE_APPLICATION_CREDENTIALS='a.json';
process.env.BUCKET_NAME='carrinho_digital_stg';

process.env.FACEBOOK_APP_ID=2;
process.env.FACEBOOK_APP_SECRET=3;

module.exports = {
  testEnvironment: 'node',
};
