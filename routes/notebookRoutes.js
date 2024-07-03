const express = require('express');
const { createNotebook, getNotebooks, getNotebookById, deleteNotebook } = require('../controllers/notebookController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createNotebook);
router.get('/notebooks', authenticate, getNotebooks);
router.get('/notebooks/:id', authenticate, getNotebookById);
router.delete('/notebooks/:id', authenticate, deleteNotebook); 

module.exports = router;
