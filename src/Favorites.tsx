import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lookupDrinkById } from "./api";
import { getFavorites, loadingList, addToCache, fromCache } from "./helper";
import { Typography } from "@material-ui/core";
import { Drink } from "./types";


function Favorites() {
  const [drinks, setDrinks] = useState<any[] | undefined | null>();
  const favorites = getFavorites();

  useEffect(() => {
    const ids: string[] = getFavorites();
    if (ids.length) {
      setDrinks(ids.map(id => {
        return {
          strDrink: '',
          idDrink: id,
          strDrinkThumb: ''
        }
      }));
      loadingList(ids).map((id: string) => {
        console.log('looking up ', id);
        lookupDrinkById(id).then(result => {
          addToCache(result.drinks[0]);
        });
      });
    } else {
      setDrinks(null);
    }
  }, []);

  return (
    <div>
      <Typography variant="h6" className="favoriteLink">Favorite Drinks</Typography>
      {drinks && (
        <ul className="drinks">
        {drinks.map(drink => {
          const items = JSON.parse(localStorage.getItem('items') || '');
          if (items && items.indexOf(drink.idDrink) > -1) {
            return (
              <li>{drink.strDrink}</li>
            )
          } else return null;
        })}
        </ul>
      )}
        {/*favorites.map(id => {
          const item = fromCache(id);
          return (
            <li className="drink" key={id}>
              <Link to={'/drink/' + id} style={{ textDecoration: 'none'}}>
                <Typography variant="h6">{item.strDrink}</Typography>
                <img src={item.strDrinkThumb} />
              </Link>
            </li>    
          );
        })*/}

    </div>
  );
}

export default Favorites;
