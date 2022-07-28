import React, { useCallback, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Recommended from '../components/Recommended';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../CSS/FoodsDetails.css';

const max = 20;

function FoodDetails() {
  const [detail, setDetail] = useState('');
  const idReceita = useParams();
  const historyUrl = window.location.href;
  const foodRecipe = historyUrl.includes('foods');
  const drinkRecipe = historyUrl.includes('drinks');

  const foodDetail = useCallback(async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
    const { meals } = await fetch(`${url}${idReceita.idReceita}`)
      .then((response) => response.json());
    setDetail(meals[0]);
  }, [idReceita]);

  const drinkDetail = useCallback(async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const { drinks } = await fetch(`${url}${idReceita.idReceita}`)
      .then((response) => response.json());
    setDetail(drinks[0]);
  }, [idReceita]);

  useEffect(() => {
    if (foodRecipe) {
      foodDetail();
    } else if (drinkRecipe) {
      drinkDetail();
    }
  }, [foodRecipe, foodDetail, drinkDetail, drinkRecipe]);

  const ingredients = [];
  for (let index = 1; index <= max && detail; index += 1) {
    if (detail[`strIngredient${index}`]) {
      ingredients.push(
        `- ${detail[`strIngredient${index}`]} - ${detail[`strMeasure${index}`]}`,
      );
    }
  }

  return (
    <>
      { detail && (
        <div className="detailsContainer">
          <header>
            <div className="imgDetail">
              <img
                src={ foodRecipe ? (detail.strMealThumb) : detail.strDrinkThumb }
                alt="food-icon"
                data-testid="recipe-photo"
                className="photoRecipe"
              />
            </div>
          </header>
          <main>
            <div>
              <h1 data-testid="recipe-title">
                {foodRecipe
                  ? (
                    detail.strMeal
                  ) : detail.strDrink }
              </h1>
              <button
                type="button"
                className="btnRecipes"
              >
                <img
                  data-testid="share-btn"
                  src={ shareIcon }
                  alt="share-icon"
                />
              </button>
              <button
                type="button"
                className="btnRecipes"
              >
                <img
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  alt="share-icon"
                />
              </button>
              <p data-testid="recipe-category">
                {foodRecipe
                  ? (
                    detail.strCategory
                  ) : detail.strAlcoholic }
              </p>
            </div>
            <h2> Ingredientes </h2>
            {ingredients.map((ingredient) => (
              <div
                data-testid={
                  `${ingredients.indexOf(ingredient)}-ingredient-name-and-measure`
                }
                key={ ingredients.indexOf(ingredient) }
              >
                <p>
                  { ingredient }
                </p>
              </div>))}
            <h2> Instructions </h2>
            <div data-testid="instructions">
              { detail.strInstructions }
            </div>
            { foodRecipe
              ? (
                <>
                  <h2> Video </h2>
                  <iframe
                    src={ detail.strYoutube?.replace('watch?v=', 'embed/') }
                    data-testid="video"
                    title="tutorial"
                  />
                </>
              ) : null}
            <Recommended />
          </main>
          <Link
            to={ foodRecipe ? `/foods/${idReceita.idReceita}/in-progress`
              : `/Drinks/${idReceita.idReceita}/in-progress` }
          >
            <div className="btnStartContainer">
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btnStartRecipe"
              >
                Start Recipe
              </button>
            </div>
          </Link>
        </div>
      ) }
      {' '}

    </>
  );
}

export default FoodDetails;
