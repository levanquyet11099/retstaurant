const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middleware/authtoken');
const oderController1 = require('../controllers/oderController');
//const tableController = require('../controllers/tablecontroller');

router.use('/', authenticateToken);

router.get('/index', oderController1.getOderList);
///api/v1/table/add_table_product
router.get('/api/v1/table/add_table_product/:id_table',oderController1.getTableproductlistt);
//router.post('/api/v1/table/add_table_product', oderController1.postTableproductlistt);
router.post('/api/v1/table/add_table_product/add', oderController1.postTableproductlistt2);

// router.get('/register', authController.getregister);  
//api/v1/table/add_table_product/
// router.post('/login', authController.login);
// router.post('/register', authController.register);

// router.get('/logout', authController.logout);

module.exports = router;