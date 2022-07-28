import React, { useContext, useEffect, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../CSS/ListRecipes.css';

const maxRecipes = 12;
function Food() {
  const pageTitle = 'Foods';
  const history = useHistory();
  const { data, setApiFilter, category,
    setData, localData } = useContext(RecipesContext);
  const [filterButton, setFilterButton] = useState('');

  useEffect(() => {
    if (data.length === 1 && data[0].idMeal !== '52968') {
      return history.push(`/foods/${data[0].idMeal}`);
    }
  }, [data, history]);

  useEffect(() => {
    if (!data) {
      setApiFilter(pageTitle);
    } else {
      setApiFilter(pageTitle);
    }
  }, [data, setApiFilter]);

  const filterCategory = useCallback(async (categoryName) => {
    if (filterButton === categoryName) {
      setData(localData);
    } else {
      const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
      const { meals } = await fetch(`${url}${categoryName}`)
        .then((response) => response.json());
      setData(meals.slice(0, maxRecipes));
      setFilterButton(categoryName);
    }
  }, [filterButton, localData, setData]);

  const removeFilter = () => {
    setData(localData);
  };

  return (
    <div className="recipesBackground">
      <Header pageTitle={ pageTitle } btnSearch />
      <div className="buttonContainer">
        {!category ? undefined
          : (
            category.map((categoryName, index) => (
              <button
                className="buttonCategory"
                value={ categoryName.strCategory }
                key={ index }
                type="button"
                data-testid={ `${categoryName.strCategory}-category-filter` }
                onClick={ async (event) => filterCategory(event.target.value) }
              >
                { categoryName.strCategory }
              </button>
            ))
          )}
        <button
          className="removeFilter"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => removeFilter() }
        >
          Remove Filter
        </button>
      </div>
      <div className="containerRecipes">
        {!data ? <p>loading</p> : (
          data.map((recipe, index) => (
            <Link
              to={ `foods/${data[index].idMeal}` }
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

export default Food;
