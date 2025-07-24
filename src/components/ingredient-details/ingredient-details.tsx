import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';
import { selectIngredients } from '../../services/user/slices/ingredientSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) return <Preloader />;
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
