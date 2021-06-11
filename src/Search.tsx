import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchDrinksByName } from "./api";
import { TextField, Typography } from "@material-ui/core";
import { Drink } from "./types";


var timeout = 0;

function Search() {
  const [drinks, setDrinks] = useState<Drink[] | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>();

  const handleChange = (event: any) => {
    const term = event.target.value.trim();
    setSearchTerm(term);
  };

  useEffect(() => {
    clearTimeout(timeout);
    timeout = window.setTimeout(function() {
      if (searchTerm) {
        searchDrinksByName(searchTerm).then(results => setDrinks(results.drinks));
      } else {
        setDrinks([]);
      }
    }, 400);
  }, [searchTerm]);

  return (
    <div>
      <Typography variant="h6">Search by drink name</Typography>
      <div>
        <TextField
          value={searchTerm}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <ul className="drinks">{drinks && drinks.map(drink => {
        return (
          <li className="drink" key={drink.idDrink}>
            <Link to={'/drink/' + drink.idDrink} style={{ textDecoration: 'none'}}>
              <Typography variant="h6">{drink.strDrink}</Typography>
              <img src={drink.strDrinkThumb || ''} />
            </Link>
          </li>    
        );
      })}</ul>
    </div>
  );
}

export default Search;
