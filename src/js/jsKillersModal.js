import jsKillerTemplate from '../templates/jsKillerCard.hbs';
import jsKillerTeam from '../json/jsKillers.json';
import images from '../images/*.jpg';

import {
  modalWindowOpener,
  backdrop,
  modalCleaner,
  modalContainer,
  buttonRemover,
  memberPhoto,
} from './refs';

modalWindowOpener.addEventListener('click', openModalWindow);
memberPhoto.addEventListener('click', photoChanging);

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

function photoChanging(e) {
  console.log(e.target);
  // if (e.type === 'mouseover') e.target = '';
  // else if (e.type === 'mouseout') e.target= '';
}
