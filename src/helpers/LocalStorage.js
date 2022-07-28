export default function inProgressStorage(food, id) {
  const storage = {
    cocktails: {},
    meals: {},
  };
  const localObject = JSON.parse(localStorage.getItem('inProgressRecipes')) || storage;
  if (food === false && localObject.cocktails[id] === undefined) {
    localObject.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(localObject));
  } else if (food && localObject.meals[id] === undefined) {
    localObject.meals[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(localObject));
  }
}

export const favIcon = ([id]) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const favStatus = favoriteRecipes.find(
    (recipe) => recipe.id === id,
  );
  if (favStatus === undefined) {
    return false;
  }
  return true;
};

export const favorite = (mealOrDrink, recipe) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const typeValue = mealOrDrink === 'Drink';
  const recipeObject = {
    id: recipe[`id${mealOrDrink}`],
    type: typeValue ? 'drink' : 'food',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe[`str${mealOrDrink}`],
    image: recipe[`str${mealOrDrink}Thumb`],
  };
  const favoriteIndex = favoriteRecipes.findIndex((el) => el.id === recipeObject.id);
  if (favoriteIndex < 0) {
    favoriteRecipes.push(recipeObject);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  } else {
    favoriteRecipes.splice(favoriteIndex, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
};

export const unfavoriteFromLocalStorage = (id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favoriteRecipes) {
    const newFavoriteRecipes = favoriteRecipes
      .filter((favRecipes) => favRecipes.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    return JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  }
};
