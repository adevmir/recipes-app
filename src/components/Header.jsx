import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profIMG from '../images/profileIcon.svg';
import searchIMG from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';
import '../CSS/Header.css';

function Header({ pageTitle, btnSearch }) {
  const [searchStatus, setSearchStatus] = useState(false);
  const [radioControl, setRadioControl] = useState();
  const [inputValue, setInputValue] = useState();
  const { setSearchFilter, setApiFilter } = useContext(RecipesContext);
  setApiFilter(pageTitle);

  const searchBtn = () => {
    if (radioControl === 'search.php?f=' && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setSearchFilter(radioControl + inputValue);
    }
  };

  return (
    <header>
      <div className="headerContainer">
        <Link
          to="/profile"
        >
          <img
            className="icons"
            data-testid="profile-top-btn"
            src={ profIMG }
            alt="profile-icon"
          />
        </Link>
        <h2 data-testid="page-title">
          {pageTitle}
        </h2>
        {btnSearch ? (
          <button
            className="searchBtn"
            type="button"
            value="search-top-btn"
            onClick={ () => setSearchStatus(!searchStatus) }
          >
            <img
              className="icons"
              data-testid="search-top-btn"
              src={ searchIMG }
              alt="search-icon"
            />
          </button>
        ) : null }
      </div>
      { searchStatus
        ? (
          <div className="searchFilter">
            <input
              className="inputSearch"
              data-testid="search-input"
              placeholder="busca"
              value={ inputValue }
              onChange={ (e) => setInputValue(e.target.value) }
            />

            <div className="radioSearch">
              <label className="container" htmlFor="ingredient">
                <input
                  data-testid="ingredient-search-radio"
                  type="radio"
                  name="filter"
                  id="ingredient"
                  value="filter.php?i="
                  onClick={ (e) => setRadioControl(e.target.value) }
                />
                Ingredient
                <span className="checkmark" />
              </label>

              <label className="container" htmlFor="name">
                <input
                  data-testid="name-search-radio"
                  type="radio"
                  name="filter"
                  id="name"
                  value="search.php?s="
                  onClick={ (e) => setRadioControl(e.target.value) }
                />
                Name
                <span className="checkmark" />
              </label>

              <label className="container" htmlFor="firstLetter">
                <input
                  data-testid="first-letter-search-radio"
                  type="radio"
                  name="filter"
                  id="firstLetter"
                  value="search.php?f="
                  onClick={ (e) => setRadioControl(e.target.value) }
                />
                First Letter
                <span className="right-checkmark" />
              </label>

              <button
                className="searchFilterBtn"
                type="button"
                data-testid="exec-search-btn"
                onClick={ () => searchBtn() }
              >
                Search
              </button>

            </div>
          </div>
        ) : null}

    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string,
}.isRequired;

export default Header;
