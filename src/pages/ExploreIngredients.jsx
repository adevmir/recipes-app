import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import RecipesContext from '../context/RecipesContext';

const MEALS_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINKS_INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const TWELVE = 12;

function ExploreIngredients() {
  const [ingredients, setIngredients] = useState();
  const { location: { pathname } } = useHistory();
  const { setSearchFilter, setApiFilter } = useContext(RecipesContext);

  const getMealIngredients = async () => {
    const response = await fetch(MEALS_INGREDIENTS_URL);
    const { meals } = await response.json();
    setIngredients(meals.filter((_, index) => index < TWELVE));
  };

  const getDrinksIngredients = async () => {
    const response = await fetch(DRINKS_INGREDIENTS_URL);
    const { drinks } = await response.json();
    setIngredients(drinks.filter((_, index) => index < TWELVE));
  };

  useEffect(() => {
    if (pathname.includes('foods')) {
      getMealIngredients();
    }
    if (pathname.includes('drinks')) {
      getDrinksIngredients();
    }
  }, [pathname]);

  const handleClick = (ingredient) => {
    if (pathname.includes('foods')) {
      setApiFilter('Foods');
      setSearchFilter(`filter.php?i=${ingredient.strIngredient}`);
    }
    if (pathname.includes('drinks')) {
      setApiFilter('Drinks');
      setSearchFilter(`filter.php?i=${ingredient.strIngredient1}`);
    }
  };

  return (
    <div className="detailsContainer">
      <Header pageTitle="Explore Ingredients" />
      {!ingredients ? <p>loading</p> : (
        <div className="containerRecipes">
          {
            ingredients.map((ingredient, index) => (
              <Link
                to={ pathname.includes('foods') ? '/foods' : '/drinks' }
                key={ index }
                onClick={ () => handleClick(ingredient) }
              >
                <IngredientCard
                  infoIngredient={ ingredient }
                  index={ index }
                />
              </Link>
            ))
          }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ExploreIngredients;
