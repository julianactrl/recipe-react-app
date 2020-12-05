import React from 'react';
import style from './recipe.module.css';


const Recipe = ({title, calories, image, ingredients}) => {
    return(
        <div className={style.recipe} >
           <img className={style.image} src={image} alt="imagen no encontrada" />
           <h1 className={style.title}>{title}</h1>
           <ol className={style.orderList}>
               {ingredients.map(ingredient =>(
                   <li>{ingredient.text}</li>
               ))}
           </ol>
           <p><b>Calories:</b> {calories}</p>
        </div>  
    );
}

export default Recipe;