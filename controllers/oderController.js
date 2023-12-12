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
       console.log("met lam roi day ",tableId);
     }
      
      const tables = await Table.findOne({id_table:tableId });
     console.log("::::",tables,"::::");
      const products  = await Product.find();
     
      const tables2 = await TableProduct.findOne({id_table:tableId });
      console.log("::::",tables2,"::::");
      if (tables2 && (tables2.id_product === null || tables2.id_table === null)) {
        console.log("Có giá trị null trong đối tượng tables2.");
    } else {
        console.error("Không có giá trị null trong đối tượng tables2.");
    }

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
      const tableId = req.body.id_table;
      const productId = req.body.id_product;
     // console.log("table : ",tableId, "- productId: ",productId);
      if(productId){
        const nameproduct = await Product.findOne({id_product: productId});
        //console.log("nameproduct.name::",nameproduct.name);
        const nameproduct1 = nameproduct.name;
        //console.log("table : ",tableId, "- productId: ",productId);
  
        //lưu sản phẩm khi thêm và tăng số lượng trên bàn đó nếu có 
        const tableProducts1 = await TableProduct.findOne({id_table: tableId, id_product: productId} );
        if(tableProducts1){
          tableProducts1.quantity += 1;
         
          tableProducts1.nameproduct = nameproduct.name;
            await tableProducts1.save();
            //console.log("da save +1");
        }else{
            const tableProducts1  = new TableProduct({ id_table: tableId, id_product: productId, quantity : 1, Status : "1" , nameproduct: nameproduct1 });
            await tableProducts1 .save();
            //console.log("da save",tableProducts1 );
        }
        //lấy tất cả sp theo bàn
        const tableProducts = await TableProduct.find({ id_table: tableId });
        //console.log("tableProducts::",tableProducts);
       // Tạo một Set để lưu trữ các id sản phẩm duy nhất
       const uniqueProductIds = new Set(tableProducts.map(item => item.id_product));
        
       const products1 = await Product.find({ id_product: { $in: Array.from(uniqueProductIds) } });
         // console.log(tableProducts);
          let totalPrice = 0;
          let quantityvalue = 0;
          let productname = "";
          const productQuantities = {};
          tableProducts.forEach(tableProduct => {
           // console.log("tableProduct.id_product: ::::::",tableProduct.id_product);
            const product = products1.find(product => product.id_product === tableProduct.id_product);
            //console.log("product:", product);
            if (product) {
              const quantity = tableProduct.quantity || 0;
              //console.log("quantity:",quantity);
              const productPrice = product.price || 0;
             // console.log("productPrice:",productPrice);
              totalPrice += productPrice * quantity;
              //console.log("total:",totalPrice);
              // Đếm số lượng mỗi sản phẩm
              productname = product.name;
              productQuantities[product.name] = (productQuantities[product.name] || 0) + quantity;
              //console.log("quantity:",productQuantities);
              quantityvalue =  productQuantities[product.name];
              //console.log("quantity:",quantityvalue);
            }
          });
          const result = {
            totalPrice,
            productQuantities,
            quantityvalue,
          };
          //console.log("san pham",result);
          //console.log("so luong san pham::",quantityvalue);
          
          tables1 = await Table.updateOne(
            { id_table: tableId }, 
            {  $set: {
              total: totalPrice,
              quantity: quantityvalue,
              nameproduct : productname,
            }, } ,
          
          );
          const tables = await Table.find({id_table: tableId});
          //console.log("bàn tables::::",tables);
          const tables2 = await TableProduct.find({id_table: tableId});
          console.log("bàn tables::::",tables2," end tables2");
          tables2 = tables2.filter(
            (record) => record.id_product !== null && record.id_table !== null
          );
          console.log("tại sao");
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