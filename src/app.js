import './sass/main.scss';
import './js/pagination.js'

import template from './templates/list-card.hbs';

import APIService from './js/DataServise.js';

const dataAPI = new APIService();

async function saveGenres() {
  const genresResult = await dataAPI.getFilmsGenres();
  const dataGenres = genresResult.genres;
  dataGenres.map(obj => obj.name === 'Science Fiction' ? obj.name = 'Sci-Fi' : obj.name);
  localStorage.setItem('genres', JSON.stringify(dataGenres))
}
saveGenres()


async function renderPopularFilms() {
  const popularFilmsResult = await dataAPI.getPopularFilms();
  const dataPopular = popularFilmsResult.results;

  const genreIds = dataPopular.map(film => film.genre_ids);
  decodeGenres(genreIds);
  dataPopular.map(film => film.genre_ids = film.genre_ids.slice(0,3));
    
  renderMarkup(dataPopular);
}

renderPopularFilms();

function decodeGenres(genreIds) {
  const genres = getSavedGenres();
  const genreNames = genreIds.map(array => {
    for (let i = 0; i < array.length; i += 1){
      genres.map(obj =>
        array[i] === obj.id ? array[i] = obj.name : array[i]
      );
    }
    if (array.length > 3) {
      const cutArr = array.splice(2, 0, 'other');
      return array;      
    }
    return array;
  });
  return genreNames;
}

function getSavedGenres() {
  const savedGenres = localStorage.getItem('genres');
  const genres = JSON.parse(savedGenres);
  return genres;
}


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

