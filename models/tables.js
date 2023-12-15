
const mongoose = require('mongoose');
const TableProduct = require('./TableProduct');
const { set } = require('mongoose');

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

 //tao phuong thuc tinh de tinh tong tien ban
  tableSchema.statics.totalPriceForTable = async function(tableId){
    try{
      const tableProducts = await TableProduct.find({ id_table: tableId });

        let totalPriceForTable = 0;
        let quantityTable =0;
        tableProducts.forEach((tableProduct) => {
            // Cộng giá trị total của từng tableProduct vào tổng giá trị của bàn
            totalPriceForTable += tableProduct.total;
            quantityTable += tableProduct.quantity;
        });
          tables1 = await Table.updateOne(
            { id_table: tableId }, 
            {  $set: {
              total: totalPriceForTable,
              quantity: quantityTable,
            }, } ,
          );
          const tables2 = await Table.findOne({id_table : tableId});
          tableProducts = await TableProduct.updateMany(
            { id_table: tableId }, 
            {  $set: {
              name : tables2.name
            }, } ,
          );
          
          console.log("da save total table: ", tables1 );
          return tables1;
    }
    catch(error){
      console.log(error);
      throw error;

    }
  };


const Table = mongoose.model('tables', tableSchema);  
module.exports = Table;


