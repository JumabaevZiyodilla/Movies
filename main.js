// Bring the html element to js
const list = document.querySelector(".movies-list");
const template = document.querySelector(".movies-template").content;
const moviesFragment = document.createDocumentFragment();

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
// MODAL
const elModal = document.querySelector(".modal");
const modalTitle = elModal.querySelector(".modal-title");
const modalIframe = elModal.querySelector(".modal-iframe");
const modalRating = elModal.querySelector(".modal-rating");
const modalYear = elModal.querySelector(".modal-year");
const modalRuntime = elModal.querySelector(".modal-runtime");
const modalCategories = elModal.querySelector(".modal-categories");
const modalSummary = elModal.querySelector(".modal-summary");
const modalLink = elModal.querySelector(".modal-imdb-link");

const formSelect = document.querySelector(".select-categories");
const elSelectSort = document.querySelector(".select-sort");

const selectFragment = document.createDocumentFragment();

// MIN MAX YEAR INPUT CREATE
const elMinYear = document.querySelector(".min-year-search");
const elMaxYear = document.querySelector(".max-year-search");

function renderMovies(kino) {
// console.log(kino);
    list.innerHTML = "";
    kino.forEach(movies => {
        // console.log(movies.yt_img);
        // TEMPLATE NING ICHIDAGI BARCHA ELEMENTLARNI CHIQARIB BERADI cloneNode(true)
        const moviesFragmentClone = template.cloneNode(true);
        
        // MOVIESFRAGMENTCLONE GA OLIB BARCHA ELEMENTLARGA TEXTCONTENT BERYAPMIZ
        moviesFragmentClone.querySelector(".movies-img").src = movies.yt_img;
        moviesFragmentClone.querySelector(".movies-img").alt = movies.title;
        moviesFragmentClone.querySelector(".movies-title").textContent = movies.title;
        moviesFragmentClone.querySelector(".movies-rate").textContent = movies.imdb_rating;
        moviesFragmentClone.querySelector(".movies-year").textContent = movies.movie_year;
        moviesFragmentClone.querySelector(".movies-categories-span").textContent = movies.categories;
        moviesFragmentClone.querySelector(".movies-time").textContent = movies.runtime;
        moviesFragmentClone.querySelector(".movie-btn").dataset.id = movies.imdb_id;
        moviesFragment.appendChild(moviesFragmentClone);
    });
    
    list.appendChild(moviesFragment);
};



// SELECT CATEGORIES
const selectArray = [];

function selectValue(array){
    let selectValue;
    array.forEach(select => {
        selectValue = select.categories;
        
        if (!selectArray.includes(selectValue)) {
            selectArray.push(selectValue)
        }

    });
};
console.log(selectArray);
function selectCreate(){
    selectArray.forEach(element => {
        let optionValue = document.createElement("option");
        optionValue.textContent = element;
        optionValue.value = element;
        selectFragment.appendChild(optionValue);
    })
    formSelect.appendChild(selectFragment);
}
selectValue(movies)
selectCreate();

function selectSort(filterArray,selectValue){
    if(selectValue == "a-z"){
        filterArray.sort((a,b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    }else if(selectValue == "z-a"){
        filterArray.sort((a,b) => b.title.charCodeAt(0) - a.title.charCodeAt(0));
    }else if(selectValue == "0-1year"){
        filterArray.sort((a,b) => a.movie_year - b.movie_year);
    }else if(selectValue == "1-0year"){
        filterArray.sort((a,b) => b.movie_year - a.movie_year);
    }else if(selectValue == "0-1rate"){
        filterArray.sort((a,b) => a.imdb_rating - b.imdb_rating);
    }else if(selectValue == "1-0rate"){
        filterArray.sort((a,b) => b.imdb_rating - a.imdb_rating);
    }
}
// MODAL TEXT CONTENT
function renderModalInfo(topilganKino) {
    modalTitle.textContent = topilganKino.Title;
    modalIframe.src = `https://www.youtube-nocookie.com/embed/${topilganKino.ytid}`;
    modalRating.textContent = topilganKino.imdb_rating;
    modalYear.textContent = topilganKino.movie_year;
    modalRuntime.textContent = showTime((topilganKino.runtime));
    modalCategories.textContent = topilganKino.Categories;
    modalSummary.textContent = topilganKino.summary;
    modalLink.href = `https://www.imdb.com/title/${topilganKino.imdb_id}`;
}

//   EVENT DELEGATION
list.addEventListener("click", (evt) => {
    const targetElement = evt.target;
    if (targetElement.matches(".movie-btn")) {
        // buttonning id attributining qiymatini olib, o'sha qiymatga ega bo'lgan kinoni topish
        const btnId = targetElement.dataset.id;
        const foundMovie = movies.find(movie => movie.imdb_id == btnId);
        renderModalInfo(foundMovie);
    }
});

elModal.addEventListener("hide.bs.modal", function () {
    modalIframe.src = "";
})

searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const searchInputValue = searchInput.value.trim();

    const regexTitle = new RegExp(searchInputValue, "gi");

    let searchMovie = movies.filter(item => {
       return item.title.match(regexTitle) && (formSelect.value == "All" || item.categories.includes(formSelect.value)) && (elMinYear.value <= item.movie_year || elMinYear.value == "") && (elMaxYear.value >= item.movie_year || elMaxYear.value == "");
    })

    if(searchMovie.length > 0){
        selectSort(searchMovie, elSelectSort.value);
        renderMovies(searchMovie);
    }else{
        list.innerHTML = "Movie not found !!!"
    }
});

renderMovies(movies.slice(0, 100));

// const fullMovies = movies.map(movie => {
//         return {
//             title: String(movie.Title),
//             full_title: String(movie.fulltitle),
//             movie_year: movie.movie_year,
//             categories: movie.Categories.split("|").join(", "),
//             summary: movie.summary,
//             imdb_id: movie.imdb_id,
//             imdb_rating: movie.imdb_rating,
//             runtime: showTime(movie.runtime),
//             language: movie.language,
//             yt_id: movie.ytid,
//             yt_img: `https://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`,
//         }
//     });