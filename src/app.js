import './sass/main.scss';
import './images/film.svg';
import template from './templates/list-card.hbs';

import APIService from './js/DataServise.js';

const dataAPI = new APIService();

async function renderPopularFilms() {
  const popularFilmsResult = await dataAPI.getPopularFilms();
  const dataPopular = popularFilmsResult.results;
  renderMarkup(dataPopular);
}

renderPopularFilms();

function renderMarkup(data) {
  const listUlFilms = document.querySelector('.js-film-list');

  listUlFilms.innerHTML = template(data);
}
