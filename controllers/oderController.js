const User = require('../models/users');
const Product = require('../models/product');
const Table = require('../models/tables');
const TableProduct =require('../models/TableProduct');
const { set } = require('mongoose');


module.exports.getOderList = async (req, res) => {
  try {
    const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const tables = await Table.find()
    res.render('../views/index', { tables, user });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};
module.exports.getTableproductlistt = async (req, res) => {
    try {
      const user = req.user;
      if(!user){
        res.redirect('/login');
      }
      const tableId = req.params.id_table;
     if(!tableId){
       tableId = req.body.id_table;
     }
      const tables = await Table.findOne({id_table:tableId });
      
      const products  = await Product.find();
     
      const tables2 = await TableProduct.findOne({id_table:tableId });
      
      res.render('../views/oder/odertable', { tables, user, products,tables2 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error' });
    }
  };

  
  module.exports.postTableproductlistt2 = async (req, res) => {
    try{
      const user = req.user;
      if(!user){
        res.redirect('/login');
      }
      const  id_table = req.body.id_table;
      const id_product =req.body.id_product;
      const tableId = id_table
      const productId = id_product;
     
      if(productId){
        const newTableProduct = await TableProduct.saveTableProduct(tableId,  productId);   
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
          const tables = await Table.find({id_table: tableId});
         
          let tables2 = await TableProduct.find({id_table: tableId});
          tables2 = tables2.filter(
            (record) => record.id_product !== null && record.id_table !== null
          );
          const products = await Product.find();
          res.render('../views/oder/odertable', {tables, user, products,tables2 });
      }else{
        const tables = await Table.find({id_table: tableId});
          const products = await Product.find();
          res.render('../views/oder/odertable', {tables, user, products});
      }
    }catch(error){
      console.log(error);
      res.status(500).json({ error: 'Error' });
    }
  };