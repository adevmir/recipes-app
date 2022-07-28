import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import Footer from '../components/Footer';

const maxRecipes = 12;
function Drinks() {
  const pageTitle = 'Drinks';
  const history = useHistory();
  const { data, setApiFilter, category, setData, localData } = useContext(RecipesContext);
  const [filterButton, setFilterButton] = useState('');

  useEffect(() => {
    if (data.length === 1) {
      return history.push(`/drinks/${data[0].idDrink}`);
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
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
      const { drinks } = await fetch(`${url}${categoryName}`)
        .then((response) => response.json());
      setData(drinks.slice(0, maxRecipes));
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
        {!category ? undefined : (
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
              to={ `drinks/${data[index].idDrink}` }
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

export default Drinks;
