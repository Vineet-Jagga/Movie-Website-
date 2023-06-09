const collapsedClass = "sidebar--collapsed";
const lsKey = "sidebarcollapsed";
const API_KEY = "api_key=56f6e28247ce8b75fe049535300b004d";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movie_cards = document.querySelector(".movie_cards");

sidebarDrawer();
getMovies(API_URL);

function sidebarDrawer(){

    const sidebar = document.querySelector(".sidebar");
    
    const nav = document.querySelector(".nav");
    const logo = document.querySelector(".logo");
    
    if(localStorage.getItem(lsKey) === "true"){
        sidebar.classList.add(collapsedClass);
    };
    
    logo.addEventListener("click", () => {
        sidebar.classList.toggle(collapsedClass);
        localStorage.setItem(lsKey, sidebar.classList.contains(collapsedClass));
    });
}

function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showMovies(data.results);
    });
}

function showMovies(data){
    movie_cards.innerHTML = "";

    data.forEach(movie =>{
        const {poster_path
, genre_ids,title,vote_average
} = movie;
        const movieEl = document.createElement("div");

        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <img src = "${IMG_URL+poster_path}", alt = ${title} width="300">
                    
                    <div class="movie-info">
                        <div class ="genre"> <span>${genre_ids[0]}</span></div>
                        <div class = "stars"> Stars</div>
                        <div class = "title">${title}</div>
                        
                    </div>
                </div>`
        movie_cards.appendChild(movieEl);
    })
}



