import './sass/main.scss';
import './images/film.svg';
import template from './templates/list-card.hbs';

import APIService from './js/DataServise.js';

const dataAPI = new APIService();

async function renderPopularFilms() {
  const popularFilmsResult = await dataAPI.getPopularFilms();
  const dataPopular = popularFilmsResult.results;
  console.log(dataPopular);
  renderMarkup(dataPopular);
}

renderPopularFilms();

function renderMarkup(data) {
  const listUlFilms = document.querySelector('.js-film-list');

  listUlFilms.innerHTML = template(data);
}

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
