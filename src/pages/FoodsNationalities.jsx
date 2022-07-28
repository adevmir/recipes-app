import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import '../CSS/Explore.css';

const AREAS_LIST_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const MEALS_BY_AREAS_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const TWELVE = 12;

function FoodsNationalities() {
  const [areas, setAreas] = useState();
  const { data, setData, fullFoodAPI } = useContext(RecipesContext);

  useEffect(() => {
    const getAreasList = async () => {
      const response = await fetch(AREAS_LIST_URL);
      const meals = await response.json();
      setAreas(meals.meals);
    };
    getAreasList();
    fullFoodAPI();
  }, [fullFoodAPI]);

  const getMealsByArea = async (nationality) => {
    const response = await fetch(`${MEALS_BY_AREAS_URL}${nationality}`);
    const { meals } = await response.json();
    setData(meals.filter((_, index) => index < TWELVE));
  };

  const handleSelectArea = (nationality) => {
    if (nationality === 'All') {
      fullFoodAPI();
    } else {
      getMealsByArea(nationality);
    }
  };

  return (
    <div>
      <Header pageTitle="Explore Nationalities" btnSearch />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ (e) => handleSelectArea(e.target.value) }
      >
        <option data-testid="All-option">All</option>
        {areas
          && areas.map((area) => (
            <option
              key={ area.strArea }
              data-testid={ `${area.strArea}-option` }
            >
              {area.strArea}
            </option>))}
      </select>
      <div className="containerRecipes">
        {data && (
          data.map((recipe, index) => (
            <Link
              to={ `/foods/${data[index].idMeal}` }
              key={ index }
            >
              <Card
                index={ index }
                infoRecipe={ recipe }
              />
            </Link>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default FoodsNationalities;
