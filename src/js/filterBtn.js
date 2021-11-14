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

            this.refs.sortGenreList.classList.toggle('is_hidden');
            this.refs.yearList.classList.add('is_hidden');

        })
    }
    addListFilterYears = ()=>{
        this.refs.yearBtn.addEventListener('click', ()=>{
            this.refs.yearBtn.classList.toggle('checked');
            this.refs.genreBtn.classList.remove('checked');

            this.refs.yearList.classList.toggle('is_hidden');
            this.refs.sortGenreList.classList.add('is_hidden');

        })
    }
    
    listFilterGenresRender=()=>{
        this.refs.sortGenreList.addEventListener('click', async el =>{
            // console.log(el)
            // console.log(el.target)
            const id = el.target.dataset.id
            const fechIdGenres = await this.filterFechGenresID(id);
            this.dataMarkup.renderMarkup(fechIdGenres)
            this.dataSaver.setActivePage("filterGenres")           
            
            // this.dataMarkup.renderMarkup();

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
    // renderFilterListItemGenre=()=>{
        // https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
       
        

    // }








   
    
    


    // fechYearGenresFilms= (searchValue = false)=>{
    //     return new Promise((resolve, reject)=>{
    //         let year = '&primary_release_year=' + this.refs.yearBtn.dataset.id;
    //         let genres = '&with_genres=' + refs.genreBtn.dataset.id;

    //         if(!searchValue){
    //             fetch(`${this.DataService.baseUrl}?${this.DataService.keyAPI}&page=${this.dataSaver.getCurrentPage()}${this.DataService.decodeGenres}`)
    //             .then(data=>{
    //                 if(!data.ok){
    //                     reject(new Error(`Ошыбка`))
    //                 }
    //                 return data
                    
    //             })
    //             .then(data=>console.log(data))
    //             .then(json=>{
    //                 if(json.results.length > 0){
    //                     return json
    //                 }
    //                 throw "пустий масив [виконано]"
    //             })
    //             .then(json=>resolve(json))
    //             .catch(data=>console.log('ошибка дальше '))
    //         }
            
    //     })


    // }
    // populary week 
    
      
    // ****


    
}
    
   
    




