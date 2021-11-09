import './sass/main.scss';

import App from './js/appClass';
import setPagination from './js/pagination.js';

import Modal from './js/modal.js';
//team-modal
// import './js/jsKillersModal';

setPagination();
const app = new App();
app.init();
