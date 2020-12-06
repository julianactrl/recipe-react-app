import React, {useEffect, useState} from 'react';
import Recipes from './Recipes.js'
import './App.css';


const APP_ID = process.env.REACT_APP_API_ID

const APP_KEY = process.env.REACT_APP_API_KEY


function App() {
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState("Chicken");

  useEffect(() => {
    getRecipes()
  }, [query]);

  const getRecipes = async () => {
    const url = "https://api.edamam.com/search?q=" + query + "&app_id=" + APP_ID + "&app_key=" + APP_KEY
    console.log(url)
    const response = await fetch(url);
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
            calories={Math.ceil(recipe.recipe.calories)} 
            image={recipe.recipe.image}
            ingredients= {recipe.recipe.ingredients}
            />
          ))}
      </div>      
    </div>
  );
}

export default App;
