const express = require('express');
const { createNotebook, getNotebooks } = require('../controllers/notebookController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createNotebook);
router.get('/notebooks', authenticate, getNotebooks);

module.exports = router;
