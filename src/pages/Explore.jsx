import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../CSS/Explore.css';

function Explore() {
  return (
    <div className="detailsContainer">
      <div>
        <Header pageTitle="Explore" />
      </div>
      <div className="buttonContainer">

        <Link to="/explore/foods">
          <button
            type="button"
            data-testid="explore-foods"
            className="buttonCategory"
          >
            Explore Foods
          </button>
        </Link>

        <Link to="/explore/drinks">
          <button
            type="button"
            data-testid="explore-drinks"
            className="buttonCategory"
          >
            Explore Drinks
          </button>
        </Link>

      </div>
      <Footer />

    </div>

  );
}

export default Explore;
