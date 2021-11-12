import APIService from './DataServise.js';
import template from '../templates/list-card.hbs';
import jsKillerTemplate from '../templates/jsKillerCard.hbs';
import jsKillerTeam from '../json/jsKillers.json';
import filmTpl from '../templates/modalFilmCard.hbs';
import refs from '../js/refs';

import listCardTpl from '../templates/list-card.hbs';
import DataSaver from './dataSaver.js';
import Message from './message.js';
import LoadSpinner from './loadSpinner';
import DataMarkup from './dataMarkup.js';

export default class FilterBtn {
    constructor(){
        this.dataMarkup = new DataMarkup();
        this.messsage = new Message();
        this.dataSaver = new DataSaver();
        this.dataAPI = new APIService();
        this.spinner = new LoadSpinner();
        this.listRef = refs.listUlFilms;
        this.itemFilterBtn = refs.filterItem;
        this.iconFilterBtn = refs.iconSvg;
        this.filmTpl = filmTpl;
        this.listCardTpl = listCardTpl;

    }
    filterItemBtn = ()=>{
        this.itemFilterBtn.classList.remove('.hidden')
    }
    addListenerIconSvg = ()=>{
        this.iconFilterBtn.addEventListener('click', this.filterItemBtn)
    }

}

    
    
    
    




