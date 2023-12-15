const mongoose = require('mongoose');
const Product = require('./product');




const tableProductSchema = new mongoose.Schema({
    id_table: { type: String, ref: 'Table' },
    id_product: { type: String, ref: 'Product' },
    nameproduct: String,
    quantity: Number,
    Status: String,
    price: Number,
    total: Number,
    name: String,
});

tableProductSchema.statics.saveTableProduct = async function (tableId, productId) {
    try {
        const nameproduct1 = await Product.findOne({id_product: productId});
        const newTableProduct = await TableProduct.findOne({id_table: tableId, id_product: productId} );
        if(newTableProduct){
          newTableProduct.quantity += 1;
          newTableProduct.nameproduct = nameproduct1.name;
          newTableProduct.price = nameproduct1.price;
          newTableProduct.total = newTableProduct.quantity * newTableProduct.price;
            await newTableProduct.save();
            console.log("save +1 ", newTableProduct);
            return newTableProduct;
        }else{
            const  newTableProduct = new TableProduct({ id_table: tableId, id_product: productId, quantity : 1 , Status : "1" , nameproduct : nameproduct1.name, price: nameproduct1.price, total : nameproduct1.price });
            await newTableProduct.save();
            console.log("save =1", newTableProduct);
            return newTableProduct;
        }
    } catch (error) {
      throw error;
    }
  };


const TableProduct = mongoose.model('tableproduct', tableProductSchema,'tableproducts');

module.exports = TableProduct;