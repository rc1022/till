const express = require('express');
const router = express.Router();
const tillController = require('../controllers/tillController');

router.get('/', tillController.getAllTodos);
router.get('/:id',tillController.getTodo);

router.post('/', tillController.createTodo);

router.delete('/:id',tillController.removeTodo);

router.put('/:id',tillController.updateTodo);

module.exports = router;