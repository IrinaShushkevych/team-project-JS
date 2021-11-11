import './sass/main.scss';
import Save from './js/auth.js';

import App from './js/appClass';
import setPagination from './js/pagination.js';

import Modal from './js/modal.js';

import './images/oleg.jpg';
import './images/oleg-funny.jpg';
// import '../images/oleg.jpg';
// import '../images/oleg-funny.jpg';
// import '../../images/oleg.jpg';
// import '../../images/oleg-funny.jpg';
//team-modal
// import './js/jsKillersModal';

setPagination();
const app = new App();
app.init();
