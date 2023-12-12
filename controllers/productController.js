//const Table = require('../models/tables');
const User = require('../models/users');
const Product = require('../models/product');
const flash = require('express-flash');

const getProductList = async (req, res) => {
  try {
    const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const products = await Product.find()
    res.render('../views/product/list_product', { products, user });

  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};
const getSeacrhProduct = async (req, res) => {
  try {
    const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const getSeacrhProduct = req.body.searchproduct;
    console.log(searchproduct);
    if(searchproduct != ""){
      const products = await Product.find({name:searchproduct })
      console.log(products);
      res.render('../views/product/list_product', { products, user });
    }
    const products = await Product.find()
    res.render('../views/product/list_product', { products, user });

  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

const geteditProduct = async (req, res) => {
  try {
    const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const productId = req.params.productId;
    console.log(productId);
    const product = await Product.findOne({id_product:productId });
    console.log(product);
    if (!product) {
      console.log(`Không tìm thấy sản phẩm với ID: ${productId}`);
    } else {
      console.log(product);
      res.render('../views/product/edit_product', { product, user });
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).send(' Error');
  }
};
const updateProduct = async (req, res) => {
  const user = req.user;
    if(!user){

      res.redirect('/login');
    }
  const { productId, productimage , productName, productPrice, productDescription } = req.body;
  try { 
    const products = await Product.findByIdAndUpdate(
      productId,
      {
        image: productimage,
        name: productName,
        price: productPrice,
        description: productDescription,
      },
      { new: true } 
    );  
    
    res.redirect('/api/v1/product/list');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

const getAddProduct = (req, res) => {
  const user = req.user;
    if(!user){
      res.redirect('/login');
    }
  res.render('../views/product/add_product',);
};

const addProduct = async (req, res) => {

  const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const id_product = generateRandomId();
    console.log(id_product);
  const { image, name, price, description } = req.body;
  const newProduct = new Product({ id_product, image, name, price, description });

  try {
   
    await newProduct.save();
    const products = await Product.find(); 
    res.render('../views/product/list_product', { products,user });
    //res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};


const deleteProduct = async (req, res) => {
  
  const user = req.user;
    if(!user){
      res.redirect('/login');
    }
  const productId = req.params.productId;
  console.log(productId);
  try {
    //await Product.findOneAndDelete({id_product: productId});
    await Product.findOneAndDelete({id_product: productId});
    const products = await Product.find(); 
    res.render('../views/product/list_product',{ products, user});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
const generateRandomId = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomId = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
};

  module.exports = {
    generateRandomId,
    getProductList,
    updateProduct,
    getAddProduct,
    addProduct,
    deleteProduct,
    geteditProduct,
    getSeacrhProduct,
    
  };
  
