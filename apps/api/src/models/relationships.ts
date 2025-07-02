import Category from './category.model';
import Recipe from './recipe.model';
import User from './user.model';
import Ingredient from './ingredient.model';
import Step from './step.model';

export const defineRelationships = () => {
  //* Category relationships
  Category.hasMany(Recipe, { foreignKey: 'categoryId', as: 'recipes' });

  //* Ingredient relationships
  Ingredient.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

  //* Recipe relationships
  Recipe.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Recipe.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Recipe.hasMany(Ingredient, { foreignKey: 'recipeId', as: 'ingredients' });
  Recipe.hasMany(Step, { foreignKey: 'recipeId', as: 'steps' });

  //* Step relationships
  Step.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

  //* User relationships
  User.hasMany(Recipe, { foreignKey: 'userId', as: 'recipes' });
};
