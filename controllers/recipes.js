const Recipe = require('../models/Recipe');

module.exports.getAllRecipes = async function (req, res) {
    try {
      const recipes = await Recipe.find({});
      res.status(200).json(recipes);
    } catch (error) {
      res.status(404).json({
        returnMessage: 'Recipes have not found.'
      });
    }
  }
  
  module.exports.createRecipe = async function (req, res) {
      const recipe = new Recipe({
          name: req.body.name,
          description: req.body.description,
          date_created: new Date()
      });

      try {
        await recipe.save();
        res.status(201).json(recipe);
      }
      catch (error) {
      res.status(500).json({
        returnMessage: 'Error saving a recipe.'
      });
    }
  }

  module.exports.deleteRecipe = async function (req, res) {
      try {
        await Recipe.remove({_id: req.params.id});
        res.status(200).json({
          returnMessage: 'Recipe has been deleted.'
        })
      } catch (error) {
        res.status(500).json({
          returnMessage: 'Error deleting a recipe.'
        });
      }
  }

  module.exports.editRecipe = async function (req, res) {
    try {
      const recipe = await Recipe.findOneAndUpdate({_id: req.params.id },{$set: req.body}, {new: true});
      res.status(200).json({
        data: recipe,
        returnMessage: 'Recipe has been edited.'
      })
    } catch (error) {
      res.status(500).json({
        returnMessage: 'Error editing a recipe.'
      });
    }
  }