const express = require('express');
const { createNotebook, getNotebooks, getNotebookById } = require('../controllers/notebookController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createNotebook);
router.get('/notebooks', authenticate, getNotebooks);
router.get('/notebooks/:id', authenticate, getNotebookById);

module.exports = router;
