const Table = require('../models/tables');
const User = require('../models/users');


const getTableList = async (req, res) => {
  try {
    const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const tables = await Table.find()
    res.render('../views/admin/list_table', { tables, user });

  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};
const getSeacrhTable = async (req, res) => {
  try {
    const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const searchtable = req.body.searchtable;
    console.log(searchtable);
    if(searchtable != ""){
      const tables = await Table.find({name:searchtable })
      console.log(tables);
      res.render('../views/admin/list_table', { tables, user });
    }
    const tables = await Table.find()
    res.render('../views/admin/list_table', { tables, user });

  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

const geteditTable = async (req, res) => {
  try {
    const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const tableId = req.params.tableId;
    console.log(tableId);
    const table = await Table.findOne({id_table:tableId });
    console.log(table);
    if (!table) {
      console.log(`Không tìm thấy sản phẩm với ID: ${tableId}`);
    } else {
      console.log(table);
      res.render('../views/admin/edit_table', { table, user });
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).send(' Error');
  }
};
const updateTable = async (req, res) => {
  const user = req.user;
    if(!user){

      res.redirect('/login');
    }
  const { tableId, tableimage , tableName, tablePrice, tableDescription } = req.body;
  try { 
    const tables = await Table.findByIdAndUpdate(
      tableId,
      {
        image: tableimage,
        name: tableName,
        price: tablePrice,
        description: tableDescription,
      },
      { new: true } 
    );  
    
    res.redirect('/api/v1/table/list');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

const getAddTable = (req, res) => {
  const user = req.user;
    if(!user){
      res.redirect('/login');
    }
  res.render('../views/admin/add_table',);
};

const addTable = async (req, res) => {
  const userId = req.user && String(req.user.userId);
  //console.log(userId);
  const user = req.user;
    if(!user){
      res.redirect('/login');
    }
    const id_table = generateRandomId();
    //console.log(id_table);
    const id_product1 =  Status = total =  quantity = "0";
    //console.log(id_product1, Status, total, quantity);
  const { image, name, price, description } = req.body;
  const newTable = new Table({ id_table, image, name, price, description ,id_user: userId,id_product1 , Status, total, quantity});

  try {
   
    await newTable.save();
    const tables = await Table.find(); 
    res.render('../views/admin/list_table', { tables,user });
    //res.redirect('/tables');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};


const deleteTable = async (req, res) => {
  
  const user = req.user;
    if(!user){
      res.redirect('/login');
    }
  const tableId = req.params.tableId;
  console.log(tableId);
  try {
    //await Product.findOneAndDelete({id_table: tableId});
    await Table.findOneAndDelete({id_table: tableId});
    const tables = await Table.find(); 
    res.render('../views/admin/list_table',{ tables, user});
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
    getTableList,
    updateTable,
    getAddTable,
    addTable,
    deleteTable,
    geteditTable,
    getSeacrhTable,
    
  };
  
