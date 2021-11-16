import refs from '../js/refs';
import DataSaver from './dataSaver.js';

export default
  class Theme{
  constructor() {
    this.refs = refs;
    this.dataSaver = new DataSaver();
  }

  onChangeTheme = (e) => {
    this.refs.toggleIcons.forEach(icon=> icon.classList.toggle('active'))   
    this.refs.body.classList.toggle('dark-theme');
    this.refs.footer.classList.toggle('dark-footer');
    this.refs.modalRef.classList.toggle('dark-modal');
    this.refs.modalCardRef.classList.toggle('dark-modal-text');
    this.refs.body.classList.contains('dark-theme') ? this.dataSaver.setTheme('dark') : this.dataSaver.setTheme('light');
  }

  checkThemeOnLoad() {
    if (this.dataSaver.getTheme() === 'dark') {
      this.setdarkTheme();      
    } return;
  }

  setdarkTheme() {
    this.refs.toggleIcons[0].classList.remove('active');
    this.refs.toggleIcons[1].classList.add('active');
    this.refs.body.classList.add('dark-theme');
    this.refs.footer.classList.add('dark-footer');
    this.refs.modalRef.classList.add('dark-modal');
    this.refs.modalCardRef.classList.add('dark-modal-text');
  }

  

}