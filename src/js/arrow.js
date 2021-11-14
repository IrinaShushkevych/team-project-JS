import refs from './refs.js';
import arrowTpl from '../templates/upDownButton.hbs';
import svgDown from '../images/svg/icons.svg';

export default class Arrow {
  constructor(root = refs.main, header = refs.header, footer = refs.footer) {
    this.root = root;
    this.header = header;
    this.footer = footer;
  }

  init = () => {
    this.render();
    const option = {
      rootMargin: '0px',
      threshold: 0.2,
    };
    this.observer_header = new IntersectionObserver(this.isScrolling, option);
    this.observer_footer = new IntersectionObserver(this.isScrolling, option);
    this.observer_header.observe(this.header);
    this.observer_footer.observe(this.footer);
  };

  render = () => {
    const icon = { up: `${svgDown}#up`, down: `${svgDown}#down` };
    this.root.insertAdjacentHTML('beforeend', arrowTpl(icon));
    this.up = document.querySelector('.js-button-up');
    this.down = document.querySelector('.js-button-down');
  };

  classToggle = elem => {
    elem.classList.toggle('visually-hidden');
  };

  checkButton = () => {
    if (
      this.up.classList.contains('visually-hidden') ||
      this.down.classList.contains('visually-hidden')
    ) {
      this.down.classList.remove('button-back--once-down');
      this.up.classList.remove('button-back--once-up');
    } else {
      this.down.classList.add('button-back--once-down');
      this.up.classList.add('button-back--once-up');
    }
  };

  isScrolling = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('header')) {
          this.classToggle(this.up);
        }
        if (entry.target.classList.contains('footer')) {
          this.classToggle(this.down);
        }
      } else {
        if (entry.target.classList.contains('header')) {
          this.classToggle(this.up);
        }
        if (entry.target.classList.contains('footer')) {
          this.classToggle(this.down);
        }
      }
      this.checkButton();
    });
  };
}
