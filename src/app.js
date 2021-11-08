import './sass/main.scss';
import './js/pagination.js'

import App from './js/appClass';

import template from './templates/list-card.hbs';

import APIService from './js/DataServise.js';

import Modal from './js/modal.js';

const app = new App();
app.init();

const dataAPI = new APIService();

async function renderPopularFilms() {
  const dataPopular = await dataAPI.getPopularFilms();
  renderMarkup(dataPopular);
}

renderPopularFilms();

function renderMarkup(data) {
  const listUlFilms = document.querySelector('.js-film-list');

  listUlFilms.innerHTML = template(data);
}
