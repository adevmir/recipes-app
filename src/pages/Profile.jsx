import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../CSS/ListRecipes.css';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header pageTitle="Profile" />
      <div className="detailsContainer">
        <h1 data-testid="profile-email" className="emailProfile">
          {email
            ? (
              email.email
            ) : 'email@email' }
        </h1>

        <div className="buttonContainer">

          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="profile-done-btn"
              className="buttonCategory"
            >
              Done Recipes
            </button>
          </Link>

          <Link to="/favorite-recipes">
            <button
              type="button"
              data-testid="profile-favorite-btn"
              className="buttonCategory"
            >
              Favorite Recipes
            </button>
          </Link>

          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
            className="buttonCategory"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />

    </>
  );
}

export default Profile;
