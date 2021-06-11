import React, { useEffect, useState } from "react";
import { Link, BrowserRouter } from 'react-router-dom';
import { getPopularDrinks } from "./api";
import { Typography } from "@material-ui/core";
import { Drink } from "./types";


function Home() {
  const [drinks, setDrinks] = useState<Drink[] | undefined>();

  useEffect(() => {
    getPopularDrinks().then(popularDrinks => setDrinks(popularDrinks.drinks));
  }, []);

  return (
    <div>
      <Typography variant="h3">Welcome to Mixology!</Typography>
      <Typography variant="h4">Here is a list of the most popular drinks:</Typography>
      <ul className="drinks">
          {drinks && drinks.map(drink => {
            return (
              <li className="drink"><Link to={'/drink/' + drink.idDrink} style={{ textDecoration: 'none' }}>
                <Typography variant="h6">{drink.strDrink}</Typography>
                <img src={drink.strDrinkThumb || ''} />
              </Link></li>);
          })}
      </ul>
    </div>
  );
}

export default Home;
