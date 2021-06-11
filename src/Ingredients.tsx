import React, { useEffect, useState, SyntheticEvent } from "react";
import { getFullIngredientsList, searchByIngredientNames, lookupDrinkById } from "./api";
import { addToCache, fromCache, loadingList, getIngredients } from './helper';
import { Drink, SearchDrinksResult, ListIngredientResult } from "./types";
import { TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';


function Ingredients() {
  const [drinks, setDrinks] = useState<Drink[] | null | undefined>();
  const [filters, setFilters] = useState<string[]>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  const updateFilters = (event: any, values: any) => {
    setFilters(values);
  }

  useEffect(() => {
    getFullIngredientsList().then((result: ListIngredientResult) => setIngredients(result.drinks.map(d => d.strIngredient1)));
  }, []);

  useEffect(() => {
    if (filters && filters.length > 0) {
    searchByIngredientNames (filters).then((result: SearchDrinksResult) => {
        const response = result.drinks || [];
        setDrinks(response);
        const ids: string[] = response.map((drink: Drink) => drink.idDrink);
        loadingList(ids).map((id: string) => {
          console.log('looking up ', id);
          lookupDrinkById(id).then(result => {
            const i = addToCache(result.drinks[0]);
            setItems(i);
          });
        });
      });
    } else {
      setDrinks(null);
    }
  }, [filters]);

  return (
    <div>
      <Typography variant="h6">Search by ingredients</Typography>
      <div>
        <Autocomplete
          multiple
          id="ingredient-search"
          options={ingredients}
          onChange={updateFilters}
          style={{ maxWidth: '500px', margin: '0 auto' }}
          renderInput={(params) => <TextField {...params} label="Ingredients" variant="outlined" />}
        />
      </div>
      <div>
        {drinks ? (
          <div>
          <Typography variant="h6">Drinks containing those ingredients</Typography>
          <ul className="filtered-drinks">
            {drinks.map(drink => {
              // const items = JSON.parse(localStorage.getItem('items'));
              if (items && items.indexOf(drink.idDrink) > -1) {
                const item = fromCache(drink.idDrink);
                const list = getIngredients(item);
                return (
                  <li className="filtered-drink">
                    <div className="title"><Typography variant="h4">{item.strDrink}</Typography></div>
                    <div className="image"><img src={item.strDrinkThumb} alt={item.strDrink} /></div>
                    <div className="ingredients">
                      <Typography variant="h5">Ingredients</Typography>
                      <ul>{list.item.map(ingredient => (
                        <li>{ingredient}</li>
                      ))}</ul>
                    </div>
                  </li>
                )
              } else {
                return (
                  <li className="drink">{drink.strDrink}</li>
                )
              }
            })}
          </ul>
          </div>
        ) : filters ? (
          <Typography variant="h6">No drinks found matching all of your selected ingredients.</Typography>
        ) : (
            <Typography variant="h6">Add a few ingredients to find possible drinks.</Typography>
        )}
      </div>
    </div>
  );
}

export default Ingredients;
