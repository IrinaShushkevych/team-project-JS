import langData from '../json/lang.json';
import DataSaver from './dataSaver.js';

export default class Translater {
  static translate = root => {
    const save = new DataSaver();
    let lang = save.getLanguage();
    if (lang === null) {
      lang = 'en';
      save.setLanguage('en');
    }
    const data = langData[lang];
    const arrEl = root.querySelectorAll('.lang');
    console.log(arrEl);
    console.log(data);
    const arrInputEl = root.querySelectorAll('.lang-input');
    arrEl.forEach(el => {
      console.log(el);
      el.innerHTML = data[el.dataset.key];
    });
    arrInputEl.forEach(el => {
      el.placeholder = data[el.dataset.key];
    });
  };

  static translateInput = root => {};
}
