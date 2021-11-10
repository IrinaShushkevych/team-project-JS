let imagesLoaded = require('imagesloaded');

export default class LoadSpinner {
  // создание разметки
  // показать
  // спрятать

  constructor() {
    this.mask = document.querySelector('.mask');    
  }
  
  hideSpinner = () => {
    const imgLoad = new imagesLoaded(document.querySelectorAll('img'))
    imgLoad.on('done', (instance) => {
      this.mask.classList.add('visually-hidden');
    })             
  }   

  showSpinner = () => {
    this.mask.classList.remove('visually-hidden');     
  }  

}
