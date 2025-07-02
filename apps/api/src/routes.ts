import { Router } from 'express';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import ingredientRoutes from './routes/ingredient.routes';
import recipeRoutes from './routes/recipe.routes';
import stepRoutes from './routes/step.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/recipes', recipeRoutes);
router.use('/steps', stepRoutes);

export default router;
