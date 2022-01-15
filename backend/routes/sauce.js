const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');
const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce);
// Update a sauce
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
// Delete a sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Get specific sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Get all sauces
router.get('/', auth, sauceCtrl.getAllSauce);
// Likes or dislike sauce
router.post('/:id/like', auth, sauceCtrl.likesASauce);



module.exports = router;

