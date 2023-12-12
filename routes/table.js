const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tablecontroller');
const authenticateToken = require('../Middleware/authtoken');

router.use('/', authenticateToken);

router.get('/list',tableController.getTableList);
router.post('/searchtable',tableController.getSeacrhTable);

router.get('/update/:tableId', tableController.geteditTable);
router.post('/update', tableController.updateTable);

router.get('/add_table', tableController.getAddTable);
router.post('/add_table', tableController.addTable);

router.post('/Delete/:tableId', tableController.deleteTable);

module.exports = router;
