import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngredients from './pages/ExploreIngredients';
import FoodsNationalities from './pages/FoodsNationalities';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Explore from './pages/Explore';
import Details from './pages/FoodsDetails';
import NotFound from './pages/NotFound';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route exact path="/foods/:idReceita" component={ Details } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/drinks/:idReceita" component={ Details } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreIngredients }
      />
      <Route exact path="/explore/foods/nationalities" component={ FoodsNationalities } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/foods/:idReceita/in-progress" component={ FoodInProgress } />
      <Route exact path="/drinks/:idReceita/in-progress" component={ DrinkInProgress } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
