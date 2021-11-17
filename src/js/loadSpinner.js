let imagesLoaded = require('imagesloaded');
import refs from './refs.js'

export default class LoadSpinner {
  // создание разметки
  // показать
  // спрятать

  constructor() {
    this.refs = refs;
  }
  
  hideSpinner = (type) => {
    const imgLoad = new imagesLoaded(document.querySelectorAll('img'))
    imgLoad.on('done', (instance) => {
      type.classList.add('visually-hidden');
    })             
  }   

  showSpinner = (type) => {
    type.classList.remove('visually-hidden');     
  }  

}
