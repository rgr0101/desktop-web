const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/', authenticateJWT, createTask);
router.get('/', authenticateJWT, getTasks);
router.get('/:id', authenticateJWT, getTaskById);
router.put('/:id', authenticateJWT, updateTask);
router.delete('/:id', authenticateJWT, deleteTask);

module.exports = router;
