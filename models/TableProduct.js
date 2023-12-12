const mongoose = require('mongoose');

const tableProductSchema = new mongoose.Schema({
    id_table: { type: String, ref: 'Table' },
    id_product: { type: String, ref: 'Product' },
    quantity: Number,
    Status: String,
    price: Number,
    total: Number,
    name: String,
    nameproduct: String,
    
   
});

tableProductSchema.statics.saveTableProduct = async function (id_table, id_product) {
    try {
        const exists = await TableProduct.findOne({id_table, id_product} );
        if(exists){
            exists.quantity += 1;
            await exists.save();
        }else{
            const newRecord  = new this({ id_table, id_product, quantity : 1  });
            await newRecord .save();
        }
      return newTableProduct;
    } catch (error) {
      throw error;
    }
  };

const TableProduct = mongoose.model('tableproduct', tableProductSchema);

module.exports = TableProduct;