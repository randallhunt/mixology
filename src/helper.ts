import { Drink } from "./types";

type GetIngredientsResult = {
  item: Array<string | null>;
  amount: Array<string | null>;
};

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}

export function addToCache(drink: Drink): string[] {
  localStorage.setItem(drink.idDrink, JSON.stringify(drink));
  const items: string[] = JSON.parse(localStorage.getItem('items') || '[]');
  items.push(drink.idDrink);
  localStorage.setItem('items', JSON.stringify(items));
  return items;
}

export function fromCache(key: string): any {
  return JSON.parse(localStorage.getItem(key) || 'null');
}

export function loadingList(ids: string[]) {
  const items = JSON.parse(localStorage.getItem('items') || 'null');
  if (!items) {
    return ids;
  }
  return ids.filter((id: string) => {
    return items.indexOf(id) === -1;
  });
}

export function getIngredients(drink: Drink) {
  let result: GetIngredientsResult = {
    item: [],
    amount: []
  };

  for (let i = 1; i <= 15; i++) {
    const ingredient = `strIngredient${i}`;
    const measure = `strMeasure${i}`;
    if (!drink[ingredient as keyof Drink]) break;
    result.item.push(drink[ingredient as keyof Drink]);
    result.amount.push(drink[measure as keyof Drink]);
  }
  return result;
}

export function hasAll(ingredients: string[], filters: string[]) {
  return ingredients.every(item => filters.includes(item));
}

export function getFavorites(): string[] {
  return (localStorage.getItem('favorites') || '').split(',');
}

export function isFavorite(id: string): boolean {
  let faves = getFavorites();
  return faves.indexOf(id) > -1;
}

export function makeFavorite(id: string, isFavorite: boolean = true) {
  let faves = getFavorites();
  if (faves.indexOf(id) > -1) {
    if (isFavorite) return;
    faves = faves.filter((item: string) => item !== id);
  } else {
    if (!isFavorite) return;
    faves.push(id);
  }
  localStorage.setItem('favorites', faves.join(','));
}