import './sass/main.scss';
import './images/film.svg';

import APIService from './js/DataServise.js';

const dataAPI = new APIService();

async function renderPopularFilms() {
  const popularFilmsResult = await dataAPI.getPopularFilms();
  const dataPopular = popularFilmsResult.results;
  // console.log(dataPopular);
}

renderPopularFilms();

async function renderFilmsByQuery(query) {
  const queryFilmsResult = await dataAPI.getFilmsByQuery(query);
  const dataQuery = queryFilmsResult.results;
  // console.log(dataQuery);
}

renderFilmsByQuery('sun') //замість sun буде приходити значення з інпута

async function decodeGenres() {
  const genresResult = await dataAPI.getFilmsGenres();
  const dataGenres = genresResult.genres;
  // console.log(dataGenres);
}

decodeGenres()


