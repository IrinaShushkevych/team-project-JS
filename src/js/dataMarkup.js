import APIService from './DataServise.js';
import template from '../templates/list-card.hbs';
import refs from './refs';

export default class DataMarkup {
  constructor() {
    this.dataAPI = new APIService();
    this.listRef = refs.listUlFilms;
  }

  // Рисование списка карточек
  renderMarkup = data => {
    this.listRef.innerHTML = template(data);
  };

  // Отрисовка популярных
  renderPopularFilms = async () => {
    const dataPopular = await this.dataAPI.getPopularFilms();
    this.renderMarkup(dataPopular);
  };

  // Отрисовка по запросу
  // Отрисовка очереди
  // Отрисовка просмотренных
  // Отрисовка карточки фильма для модалки
  // listener на список
}
