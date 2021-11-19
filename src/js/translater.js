import langData from '../json/lang.json';
import DataMarkup from './dataMarkup.js';
import DataSaver from './dataSaver.js';
import refs from './refs.js';
import filterListGenres from '../templates/filterListGenre.hbs';
import APIService from './DataServise.js';

export default class Translater {
  constructor() {
    this.save = new DataSaver();
    this.dataMarkup = new DataMarkup();
    this.api = new APIService();
    this.data = langData;
    this.langBtn = refs.btnLangRef;
    this.langList = refs.listLangRef;
  }

  checkLang = lang => {
    if (!lang) {
      lang = this.save.getLanguage();
    }
    if (lang === null) {
      lang = 'en';
      this.save.setLanguage('en');
    }
    this.lang = lang;
    this.langBtn.classList.remove('lang-en');
    this.langBtn.classList.remove('lang-ru');
    this.langBtn.classList.remove('lang-ua');
    switch (this.lang) {
      case 'en':
        this.langBtn.dataset.lang = 'en';
        this.langBtn.classList.add('lang-en');
        break;
      case 'uk':
        this.langBtn.dataset.lang = 'uk';
        this.langBtn.classList.add('lang-ua');
        break;
      case 'ru':
        this.langBtn.dataset.lang = 'ru';
        this.langBtn.classList.add('lang-ru');
        break;
    }
  };

  selectData = () => {
    return this.data[this.lang];
  };

  translate = async root => {
    this.checkLang();
    const data = this.selectData();
    const arrEl = root.querySelectorAll('.lang');
    const arrInputEl = root.querySelectorAll('.lang-input');
    arrEl.forEach(el => {
      el.innerHTML = data[el.dataset.key];
    });
    arrInputEl.forEach(el => {
      el.placeholder = data[el.dataset.key];
    });
    const arrChangeEl = document.querySelectorAll('.button-container');
    arrChangeEl.forEach(el => {
      if (this.lang === 'en') {
        el.classList.remove('lang-change');
      } else {
        el.classList.add('lang-change');
      }
    });
    const rootpage = document.querySelector('html');
    rootpage.setAttribute('lang', this.lang);
    const docTitle = document.querySelector('title');
    switch (this.lang) {
      case 'en':
        docTitle.textContent = 'Filmoteka';
        break;
      case 'uk':
        docTitle.textContent = 'Фільмотека';
        break;
      case 'ru':
        docTitle.textContent = 'Фильмотека';
        break;
    }
    localStorage.removeItem('genres');
    await this.api.fetchFilmsGenres();
    console.log('update page');
    this.dataMarkup.updatePage('lang');
    this.changeFilterListGenre();
  };

  onSelectLang = e => {
    refs.inputRef.value = '';
    this.save.setLanguage(e.target.dataset.lang);
    console.log('check lang');
    this.checkLang(e.target.dataset.lang);
    console.log('translate');
    this.translate(document);
    this.langList.classList.add('hidden');
  };

  onClickLangBtn = e => {
    this.langList.classList.toggle('hidden');
    this.langList.addEventListener('click', this.onSelectLang);
    window.addEventListener('click', this.onCloseList);
  };

  onCloseList = e => {
    if (!e.target.closest('.block-lang')) {
      this.langList.classList.add('hidden');
      window.removeEventListener('click', this.onCloseList);
    }
  };

  changeFilterListGenre = () => {
    const data = this.save.getFilmsGenres();
    refs.sortGenreList.innerHTML = filterListGenres(data);
  };
}
