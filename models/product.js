const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id_product:  { type: String , required: true ,unique: true} ,
    id_user: String,
    id_table:{ type: String, ref: 'tables' },
    name: String,
    image: String,
    price: Number,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
 
const Product = mongoose.model('products', productSchema);  
module.exports = Product;