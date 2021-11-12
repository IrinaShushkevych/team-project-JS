import './sass/main.scss';

import App from './js/appClass';

import setPagination from './js/pagination.js';

import Arrow from './js/arrow.js';

const arrow = new Arrow();
arrow.init();

setPagination();

const app = new App();
app.init();
