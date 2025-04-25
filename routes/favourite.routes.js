const express = require('express');
const router = express.Router();
const { getFavorites, saveFavorite } = require('./../controller/favourite.controller.js');

router.get('/:userId', getFavorites);
router.post('/:userId', saveFavorite);

module.exports = router;