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
import DataService from './DataServise';
import { getIdTokenResult } from '@firebase/auth';

export default class FilterBtn {
    constructor(){
        this.DataService = new DataService();
        this.dataMarkup = new DataMarkup();
        this.messsage = new Message();
        this.dataSaver = new DataSaver();
        this.dataAPI = new APIService();
        this.spinner = new LoadSpinner();
        this.listRef = refs.listUlFilms;
        this.refs = refs;
        this.itemFilterBtn = refs.filterItem;
        this.iconFilterBtn = refs.iconSvg;
        this.filmTpl = filmTpl;
        this.listCardTpl = listCardTpl;

    }
    
    addListFilterGenre = ()=>{
        this.refs.genreBtn.addEventListener('click', (e)=>{
            
            this.refs.genreBtn.classList.toggle('checked');
            this.refs.yearBtn.classList.remove('checked');

            this.refs.sortGenreList.classList.toggle('visually-hidden');
            this.refs.yearList.classList.add('visually-hidden');

        })
    }
    addListFilterYears = ()=>{
        this.refs.yearBtn.addEventListener('click', ()=>{
            this.refs.yearBtn.classList.toggle('checked');
            this.refs.genreBtn.classList.remove('checked');

            this.refs.yearList.classList.toggle('visually-hidden');
            this.refs.sortGenreList.classList.add('visually-hidden');

        })
    }
    listFilterYearsRender=()=>{
        this.refs.yearList.addEventListener('click', async (el)=>{
            const id = el.target.dataset.id
            const fechIdYears = await this.filterFechYearsId(id);
            this.dataMarkup.renderMarkup(fechIdYears )
            this.dataSaver.setActivePage("filterYears")
            this.refs.yearList.classList.add('visually-hidden')

        } )
    }
    
    listFilterGenresRender=()=>{
        this.refs.sortGenreList.addEventListener('click', async el =>{
            // console.log(el)
            // console.log(el.target)
            const id = el.target.dataset.id
            const fechIdGenres = await this.filterFechGenresID(id);
            this.dataMarkup.renderMarkup(fechIdGenres)
            this.dataSaver.setActivePage("filterGenres")
            this.refs.sortGenreList.classList.add('visually-hidden')           
            

        })

    }
    listFilterTopRatingRender=()=>{
        this.refs.topRating.addEventListener('click', async el  =>{
            const id = el.target.dataset.id
            const fechIdTopRating = await this.fechIdRating(id);
            this.dataMarkup.renderMarkup(fechIdTopRating )
            this.dataSaver.setActivePage("filterTopRating")
            
                       
        })

    }
    listFilterPopularyWeek =()=>{
        this.refs.sortWrapper.addEventListener('click', async el =>{
            const id = el.target.dataset.id
            const fechIdPopularyWeek = await this.fechPopularyWeek(id);
            this.dataMarkup.renderMarkup(fechIdPopularyWeek)
            this.dataSaver.setActivePage("filterPopularyWeek")
            
        })
    }
    filterFechGenresID= async(id)=>{
        if(id){
            this.idGenres = id 

        }
    //     
    let popularFilms = 'discover/movie?';
    this.url =
      this.DataService.baseUrl + popularFilms + this.DataService.keyAPI + `&with_genres=${this.idGenres}&page=${this.dataSaver.getCurrentPage()}`;
    const result = await this.DataService.fetchData(this.url);
    await this.DataService.fixFetchObject(result.results);

    const genresResults = result.results
   
    return  genresResults;
    }
    filterFechYearsId= async(id)=>{
        if(id){
            this.idYears = id
        }
        let popularFilms = 'discover/movie?';
        this.url =
        this.DataService.baseUrl + popularFilms + this.DataService.keyAPI + `&year=${this.idYears}&page=${this.dataSaver.getCurrentPage()}`;
        const result = await this.DataService.fetchData(this.url);
        await this.DataService.fixFetchObject(result.results);

        const yearsResults = result.results
    
        return  yearsResults;
    }
    
    fechIdRating = async() =>{
        
        let popularFilms = 'movie/top_rated?';
        this.url =
        this.DataService.baseUrl + popularFilms + this.DataService.keyAPI + `&page=${this.dataSaver.getCurrentPage()}`;
        const result = await this.DataService.fetchData(this.url);
        await this.DataService.fixFetchObject(result.results);

        const ratingTopResults = result.results
    
        return  ratingTopResults;


    }
    fechPopularyWeek =async()=>{
        let popularFilms = 'trending/movie/day?';
        this.url =
        this.DataService.baseUrl + popularFilms + this.DataService.keyAPI + `&page=${this.dataSaver.getCurrentPage()}`;
        const result = await this.DataService.fetchData(this.url);
        await this.DataService.fixFetchObject(result.results);

        const popuylaryWeekResults = result.results
    
        return popuylaryWeekResults;
    }
    // поява конопок по кліку на свг 
    addListenersSvgBtn=()=>{
        this.refs.svgIconBtn.addEventListener('click', ()=>{
            this.refs.sortWrapper.classList.toggle('hidden')
            this.refs.genreWrapper.classList.toggle('hidden') 
            this.refs.yearsWrapper.classList.toggle('hidden')  
            this.refs.topRating.classList.toggle('hidden')    
        
        })

    }



    // ****
}