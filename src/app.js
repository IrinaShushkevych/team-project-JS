import './sass/main.scss';
import APIService from './js/DataServise.js';

const dataAPI = new APIService();

async function renderPopularFilms() {
  const popularFilmsResult = await dataAPI.getPopularFilms();
  const dataPopular = popularFilmsResult.results;
  console.log(dataPopular);
}

renderPopularFilms();

async function renderFilmsByQuery() {
  const queryFilmsResult = await dataAPI.getFilmsByQuery();
  const dataQuery = queryFilmsResult.results;
  console.log(dataQuery);
}

renderFilmsByQuery();
