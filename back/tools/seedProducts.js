const axios = require('axios');
const Chance = require('chance');
const slugify = require('slugify');
const db = require('../db');

const chance = new Chance();

const getImages = () => axios.get('http://www.splashbase.co/api/v1/images/search?query=laptop')
  .then(res => res.data)
  .then(data => {
    const { images } = data;
    return images.map(image => image.url);
  });

const pick = (arr) => {
  const index = Math.floor(arr.length * Math.random());
  return arr[index];
}

const getBrand = () => {
  const brands = ['Dell', 'Acer', 'Asus', 'IBM', 'Apple'];
  return pick(brands);
}

const getProductName = () => {
  const products = [
    '14" ultra-thin laptop',
    '15" gamer laptop',
    '13" random laptop'
  ];
  return pick(products);
}

const randomizeProduct = () => {
  const brand = getBrand();
  const name = getProductName();
  const slug = slugify(`${brand}-${name}`, {
    lower: true, remove: /[*+~.()'"!:@]/g
  });
  const reference = chance.integer({ min: 2000, max: 999999 })
    .toString()
    .padStart(6, '0');
  const description = chance.sentence({ words: 5 });
  const price = chance.integer({ min: 299, max: 1199 });
  const stock = chance.integer({ min: 5, max: 100 });
  return {
    brand,
    name,
    slug,
    reference,
    description,
    price,
    stock
  };
};

const insertProduct = product => db.queryAsync(
  'INSERT INTO product SET ?', product
);

getImages()
  .then(images => {
    return images.map(picture => {
      const product = randomizeProduct();
      return { ...product, picture };
    })
  })
  .then(products => {
    const promises = products.map(
      product => insertProduct(product)
    );
    return Promise.all(promises);
  })
  .then(() => process.exit());