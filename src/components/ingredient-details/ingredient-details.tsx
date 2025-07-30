import { FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';
import { selectIngredients } from '../../services/user/slices/ingredientSlice';
import styles from './ingredient-details-page.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find((i) => i._id === id);

  const isModal = location.state && location.state.background;

  if (!ingredientData) return <Preloader />;

  const content = <IngredientDetailsUI ingredientData={ingredientData} />;

  return isModal ? (
    content
  ) : (
    <div className={styles.pageWrapper}>{content}</div>
  );
};
