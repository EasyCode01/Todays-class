const BASE_URL = `https://fakestoreapi.com/products`;

export const fetchFromApi = (url) => {
  return fetch(`${BASE_URL}/${url}`);
};
