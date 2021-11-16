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
      page: this.dataSaver.getCurrentPage(),
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
    // console.log(totalpages);
    this.pagination = new Pagination(refs.paginationCase, paginationOptions);
    // const totalpages = ;
    // console.log(totalpages);
    if (this.dataSaver.getTotalPages() <= 1) {
      refs.paginationCase.classList.add('isHidden');
    } else {
      refs.paginationCase.classList.remove('isHidden');
    }
    this.pagination.on('afterMove', async event => {
      this.dataSaver.setCurrentPage(event.page);
      this.dataMarkup.updatePage();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  };
}
