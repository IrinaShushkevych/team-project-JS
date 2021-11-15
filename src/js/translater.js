import langData from '../json/lang.json';
import DataMarkup from './dataMarkup';
import DataSaver from './dataSaver.js';
import refs from './refs.js';

export default class {
  constructor() {
    this.save = new DataSaver();
    this.data = langData;
    this.langBtn = refs.btnLangRef;
    this.langList = refs.listLangRef;
    this.dataMarkup = new DataMarkup();
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

  translate = root => {
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
    this.save.clearLocalstoredge();
    this.dataMarkup.updatePage('lang');
  };

  onSelectLang = e => {
    this.save.setLanguage(e.target.dataset.lang);
    this.checkLang(e.target.dataset.lang);
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
}
