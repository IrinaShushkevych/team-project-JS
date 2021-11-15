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
    this.refs.body.classList.contains('dark-theme') ? this.dataSaver.setTheme('dark') : this.dataSaver.setTheme('light');
  }

  checkThemeOnLoad() {
    
  }


}