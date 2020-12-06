import React, {useEffect, useState} from 'react';
import Recipes from './Recipes.js'
import './App.css';


function App() {
  //API autentications
  const APP_ID = "ab7ab7de"
  const APP_KEY="ce08c8cab44018cf7482438930a7e578"

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState("Chicken");

  useEffect(() => {
    getRecipes()
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY} `
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search); 
    setSearch(''); //limpia el input
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" 
        placeholder='Search a recipe...'
        type="text" 
        value={search}
        onChange={updateSearch}
        />
        <button className="search-button" 
        type="submit">
          Search
        </button>
      </form>
      <div className="container">
          {recipes.map(recipe => (
            <Recipes 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients= {recipe.recipe.ingredients}
            />
          ))}
      </div>      
    </div>
  );
}

export default App;
