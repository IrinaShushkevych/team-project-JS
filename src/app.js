import './sass/main.scss';

import App from './js/appClass';
import setPagination from './js/pagination.js';

setPagination();
const app = new App();
app.init();
