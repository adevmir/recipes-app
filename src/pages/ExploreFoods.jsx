// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RANDOM_FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

function ExploreFoods() {
  // const [randomMealId, setRandomMealId] = useState('');
  const history = useHistory();

  const goToRandomMeal = async () => {
    const response = await fetch(RANDOM_FOOD_URL);
    const { meals } = await response.json();
    // setRandomMealId(meals[0].idMeal);
    if (meals[0].idMeal) history.push(`/foods/${meals[0].idMeal}`);
  };

  // useEffect(() => {
  //   if (randomMealId) history.push(`/foods/${randomMealId}`);
  // }, [randomMealId, history]);

  return (
    <div className="detailsContainer">
      <Header pageTitle="Explore Foods" />
      <div className="buttonContainer">
        <Link to="/explore/foods/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="buttonCategory"
          >
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
            className="buttonCategory"
          >
            By Nationality
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ goToRandomMeal }
          className="buttonCategory"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
