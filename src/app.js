import APIService from "./js/DataServise.js";

const dataAPI = new APIService();

const popularFilmsResult = dataAPI.getPopularFilms().then(data => data.results)
console.log(popularFilmsResult);
