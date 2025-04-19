const express = require('express');
const router = express.Router();
const tillController = require('../controllers/tillController');

router.get('/', tillController.getAllTodos);
router.post('/', tillController.createTodo);

module.exports = router;