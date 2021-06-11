import React, { useEffect, useState } from "react";
import { Link, BrowserRouter, useParams } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";
import { makeFavorite, isFavorite, getIngredients } from "./helper";
import { lookupDrinkById } from "./api";
import { Drink, SearchDrinksResult } from "./types";


function Recipe() {
  const {id} = useParams();

  const [drink, setDrink] = useState<Drink | undefined>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<any>({item:[], amount: []});
  const [favorite, setFavorite] = useState<boolean>(isFavorite(id))

  useEffect(() => {
    lookupDrinkById(id).then((result: SearchDrinksResult) => {
      if (result && result.drinks && result.drinks.length > 0) {
        setDrink(result.drinks[0]);
        setIngredients(getIngredients(result.drinks[0]));
      } else {
        setNotFound(true);
      }
    });
  }, []);

  const toggleFavorite = () => {
    makeFavorite(id, !favorite);
    setFavorite(!favorite);
  }

  return (
    <div>
      {drink ? (
        <div className="recipe">
          {favorite ? (
            <a className="unfavorite" onClick={toggleFavorite}>Favorite <Star style={{ fill: '#f5d442' }} /></a>
          ) : (
            <a className="favorite" onClick={toggleFavorite}>Favorite <StarBorder style={{ fill: '#f5d442' }}/></a>
          )}
          
          <Typography variant="h4"><span style={{whiteSpace:'nowrap'}}>{drink.strDrink}</span></Typography>
          <div className="photo">
            <img src={drink.strDrinkThumb || ''} />
          </div>
          <div>
            <Typography variant="h6">Ingredients</Typography>
            <ul className="ingredientList">{
              ingredients.amount.map((val: string, idx: number) => {
                return (
                  <li>{val} {ingredients.item[idx]}</li>
                )
              })
            }
            </ul>
            <Typography variant="h6">Instructions</Typography>
            <Typography variant="body1">{drink.strInstructions}</Typography>
          </div>
        </div>
      ) : notFound ? (
        <div>
          <Typography>Sorry, that item was not found.</Typography>
          <BrowserRouter>
            <p>Perhaps you would like to try a <Link to="/search">search</Link>, or take a look at
            a list of <Link to="/">popular drinks</Link>?</p>
          </BrowserRouter>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Recipe;
