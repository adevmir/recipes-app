import React, { useState, useContext } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('All');
  const { favoriteRecipes } = useContext(RecipesContext);

  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('Food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('Drinks') }
      >
        Drinks
      </button>
      {favoriteRecipes
        && favoriteRecipes
          .filter((favRecipe) => {
            if (filter === 'Food') {
              return favRecipe.type === 'food';
            }
            if (filter === 'Drinks') {
              return favRecipe.type === 'drink';
            }
            return favRecipe;
          })
          .map((favRecipe, index) => (
            <FavoriteCard
              key={ favRecipe.id }
              infoRecipe={ favRecipe }
              index={ index }
            />
          ))}
    </div>
  );
}

export default FavoriteRecipes;
