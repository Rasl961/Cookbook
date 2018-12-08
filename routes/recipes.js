const express = require('express');
const controller = require('../controllers/recipes');
const passport = require('passport');
const router = express.Router();

router.get('/', controller.getAllRecipes);
router.post('/create', controller.createRecipe);
router.delete('/delete/:id', controller.deleteRecipe);
router.patch('/edit/:id', controller.editRecipe)

module.exports = router;
