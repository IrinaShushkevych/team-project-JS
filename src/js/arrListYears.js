import DataMarkup from './dataMarkup'
import refs from './refs'

let addListYears = new Date().getFullYear();

for (let i = 1900; i <= addListYears; i++) { 
    refs.yearList.insertAdjacentHTML('afterbegin',`<li class="year-list-item" data-id="${i}">${i}</li>`)
}
