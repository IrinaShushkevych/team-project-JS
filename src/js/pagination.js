// export default class Pagination {
//   //     определение кол страниц
//   // определение видимых номеров
//   // отрисовка пагинации (определение тек стр, определение видимых, )
//   // переключение страницы
//   // listener(запуск перерисовки карточек, переключение страницы, перерисовка пагинации)
// }
import Pagination from 'tui-pagination';
import refs from './refs.js';

export default function setPagination(options) {
  const paginationOptions = {
    totalItems: 20000,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}"></span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}"></span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(refs.paginationCase, paginationOptions);
}
