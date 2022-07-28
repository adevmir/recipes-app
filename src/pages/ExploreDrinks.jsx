import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../CSS/Explore.css';

const RANDOM_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function ExploreDrinks() {
  const history = useHistory();

  const goToRandomDrink = async () => {
    const response = await fetch(RANDOM_DRINK_URL);
    const { drinks } = await response.json();
    if (drinks[0].idDrink) history.push(`/drinks/${drinks[0].idDrink}`);
  };

  return (
    <div className="detailsContainer">
      <Header pageTitle="Explore Drinks" />
      <div className="buttonContainer">
        <Link to="/explore/drinks/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="buttonCategory"
          >
            By Ingredient
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ goToRandomDrink }
          className="buttonCategory"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
