import Pagination from 'tui-pagination';
import refs from './refs.js';
import DataSaver from './dataSaver.js';
import DataMarkup from './dataMarkup';

export default class CustomPagination {
  constructor() {
    this.refs = refs;
    this.dataSaver = new DataSaver();
    this.dataMarkup = new DataMarkup();
  }

  initPagination = () => {
    const paginationOptions = {
      totalItems: this.dataSaver.getTotalPages(),
      itemsPerPage: 1,
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

    this.pagination = new Pagination(refs.paginationCase, paginationOptions);

    this.pagination.on('afterMove', async event => {
      this.dataSaver.setCurrentPage(event.page);
      const activePage = this.dataSaver.getActivePage();
      switch (activePage) {
        case 'home':
          if (refs.inputFormRef.value) {
            this.dataMarkup.renderSearchingFilms();
          } else {
            console.log('popular');
            this.dataMarkup.renderPopularFilms();
          }
          break;
        case 'watched':
          this.dataMarkup.getCurrentFilmsWatched();
          break;
        case 'queue':
          this.dataMarkup.getCurrentFilmsQueue();
          break;
      }
    });
  };
}
