import React, { useCallback, useEffect, useState } from 'react';
import '../CSS/Recommended.css';
import { Link } from 'react-router-dom';

function Recommended() {
  const historyUrl = window.location.href;
  const foodRecipe = historyUrl.includes('foods');
  const drinkRecipe = historyUrl.includes('drinks');

  const [recomendation, setRecomendation] = useState([]);
  const maxRecommendation = 6;

  const recommendedFoodAPI = useCallback(async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const { meals } = await fetch(url)
      .then((response) => response.json());
    setRecomendation(meals.slice(0, maxRecommendation));
  }, []);

  const recommendedDrinkAPI = useCallback(async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const { drinks } = await fetch(url)
      .then((response) => response.json());
    setRecomendation(drinks.slice(0, maxRecommendation));
  }, []);

  useEffect(() => {
    if (drinkRecipe) {
      recommendedFoodAPI();
    } else if (foodRecipe) {
      recommendedDrinkAPI();
    }
  }, [foodRecipe, recommendedDrinkAPI, recommendedFoodAPI, drinkRecipe]);
  return (
    <div>
      <h2> Recommended </h2>
      <div className="recomendation">
        {drinkRecipe ? (
          recomendation.map((element, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ `${element.idMeal}` }
            >
              <Link
                to={ `/foods/${element.idMeal}` }
              >
                <p data-testid={ `${index}-recomendation-title` }>{ element.strMeal }</p>
                <img src={ element.strMealThumb } alt="" />
              </Link>
            </div>
          ))) : (
          recomendation.map((element, index) => (
            <div data-testid={ `${index}-recomendation-card` } key={ index }>
              <Link
                to={ `/drinks/${element.idDrink}` }
              >
                <p data-testid={ `${index}-recomendation-title` }>{ element.strDrink }</p>
                <img
                  className="imgRecomendation"
                  src={ element.strDrinkThumb }
                  alt=""
                />
              </Link>
            </div>
          )))}
      </div>
    </div>
  );
}

export default Recommended;
