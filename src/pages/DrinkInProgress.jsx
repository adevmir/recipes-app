import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import inProgressStorage, { favIcon, favorite } from '../helpers/LocalStorage';

const max = 15;

function DrinkInProgress() {
  const [detail, setDetail] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const idReceita = useParams();
  const [favStatus, setFavStatus] = useState(favIcon([idReceita.idReceita]));

  inProgressStorage(false, [idReceita.idReceita]);

  const localObject = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [finishButton, setFinishButton] = useState(Object.values(localObject.cocktails[
    idReceita.idReceita]).includes(''));

  const drinkDetail = useCallback(async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const { drinks } = await fetch(`${url}${idReceita.idReceita}`)
      .then((response) => response.json());
    setDetail(drinks[0]);
  }, [idReceita]);

  const ingredients = [];

  for (let index = 1; index <= max && detail; index += 1) {
    if (detail[`strIngredient${index}`]) {
      ingredients.push(
        `${detail[`strIngredient${index}`]} - ${detail[`strMeasure${index}`]}`,
      );
    }
  }

  const FinishDisable = () => {
    setFinishButton(Object.values(localObject.cocktails[
      idReceita.idReceita]).includes(''));
  };

  const attFav = async () => {
    favorite('Drink', detail);
    setFavStatus(favIcon([idReceita.idReceita]));
  };

  const check = () => {
    for (let index = 0;
      index < ingredients.length && detail; index += 1) {
      const box = document.getElementById(ingredients[index]);
      if (box.checked) {
        localObject.cocktails[idReceita.idReceita][index] = ingredients[index];
        localStorage.setItem('inProgressRecipes', JSON.stringify(localObject));
      } else {
        localObject.cocktails[idReceita.idReceita][index] = '';
        localStorage.setItem('inProgressRecipes', JSON.stringify(localObject));
      }
    }
    FinishDisable();
  };

  const ShareDrinks = () => {
    const text = `http://localhost:3000/drinks/${idReceita.idReceita}`;
    copy(text);
    setShareMessage(true);
  };

  useEffect(() => {
    drinkDetail();
  }, [drinkDetail, idReceita]);

  return (
    <>
      { detail && (
        <>
          <header>
            <img
              src={ detail.strDrinkThumb }
              alt="food-icon"
              data-testid="recipe-photo"
            />
          </header>
          <main>
            <div>
              <h1 data-testid="recipe-title">
                { detail.strDrink }
              </h1>
              <button
                type="button"
                onClick={ () => ShareDrinks() }
              >
                <img
                  src={ shareIcon }
                  alt="share-icon"
                  data-testid="share-btn"
                />
              </button>
              <button
                type="button"
                onClick={ () => attFav() }
              >
                <img
                  src={ favStatus ? BlackHeartIcon : WhiteHeartIcon }
                  data-testid="favorite-btn"
                  alt="favorite-icon"
                />
              </button>
              { shareMessage && (
                <h1>Link copied!</h1>
              )}
              <p data-testid="recipe-category">
                { detail.strAlcoholic }
              </p>
            </div>
            <h2> Ingredientes </h2>
            {ingredients.map((ingredient, index) => (
              <div
                data-testid={
                  `${ingredients.indexOf(ingredient)}-ingredient-step`
                }
                key={ ingredients.indexOf(ingredient) }
              >
                <input
                  type="checkbox"
                  id={ ingredient }
                  onChange={ () => check() }
                  defaultChecked={
                    localObject.cocktails[idReceita.idReceita][index] === ingredient
                  }
                />
                <label htmlFor={ ingredient }>
                  -
                  { ingredient }
                </label>
              </div>))}
            <h2> Instructions </h2>
            <div data-testid="instructions">
              { detail.strInstructions }
            </div>
            <Link to="/done-recipes">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ finishButton }
              >
                Finish Recipe
              </button>
            </Link>
          </main>
        </>
      )}
      {''}
    </>
  );
}

export default DrinkInProgress;
