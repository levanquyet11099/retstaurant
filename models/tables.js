
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    id_table:  { type: String, unique: true,required: true},
    id_product: { type: String, ref: 'products' },
    id_user: { type: String },
    image: String,
    name: String,
    nameproduct: String,
    price: Number,
    Status: String,
    total: Number,
    quantity: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
 
const Table = mongoose.model('tables', tableSchema);  
module.exports = Table;


