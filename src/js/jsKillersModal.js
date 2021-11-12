import jsKillerTemplate from '../templates/jsKillerCard.hbs';
import jsKillerTeam from '../json/jsKillers.json';
// import images from '../images/*.jpg';

const modalWindowOpener = document.querySelector('.js-modal-team');
const backdrop = document.querySelector('.backdrop');
const modalCleaner = document.querySelector('.card__container--modal');
const modalContainer = document.querySelector('.card__js-killer-container--modal');
const buttonRemover = document.querySelector('.button__container-modal');

modalWindowOpener.addEventListener('click', openModalWindow);

function openModalWindow(e) {
  e.preventDefault();

  try {
    renderKillerInfo(jsKillerTeam);
  } catch (error) {
    console.error('Yes, babe, the error has been appeared here. Check your code. 🤷‍♂️');
  }
}

function renderKillerInfo() {
  backdrop.classList.remove('visually-hidden');
  modalCleaner.classList.add('visually-hidden');
  buttonRemover.classList.add('visually-hidden');
  const markup = jsKillerTemplate(jsKillerTeam);
  modalContainer.innerHTML = markup;
}
