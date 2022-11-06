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

// BookMark 
const bookMarkList = document.querySelector(".bookmark-list");

const localArr = JSON.parse(window.localStorage.getItem("Bookmark"))
const bookmarkArray = localArr || [];

function renderMovies(kino, regex = "") {
    // console.log(kino);
    list.innerHTML = "";
    kino.forEach(movies => {
        // TEMPLATE NING ICHIDAGI BARCHA ELEMENTLARNI CHIQARIB BERADI cloneNode(true)
        const moviesFragmentClone = template.cloneNode(true);

        if (regex.source != "(?:)" && regex) {
            moviesFragmentClone.querySelector(".movies-title").innerHTML = movies.title.replace(regex, `<mark class = "bg-warning mark">${regex.source.toLowerCase()}</mark>`);
        } else {
            moviesFragmentClone.querySelector(".movies-title").textContent = movies.title
        }
        // MOVIESFRAGMENTCLONE GA OLIB BARCHA ELEMENTLARGA TEXTCONTENT BERYAPMIZ
        moviesFragmentClone.querySelector(".movies-img").src = movies.yt_img;
        moviesFragmentClone.querySelector(".movies-img").alt = movies.title;

        moviesFragmentClone.querySelector(".movies-rate").textContent = movies.imdb_rating;
        moviesFragmentClone.querySelector(".movies-year").textContent = movies.movie_year;
        moviesFragmentClone.querySelector(".movies-categories-span").textContent = movies.categories;
        moviesFragmentClone.querySelector(".movies-time").textContent = movies.runtime;
        moviesFragmentClone.querySelector(".movie-btn").dataset.id = movies.imdb_id;
        moviesFragmentClone.querySelector(".bookmark-btn").dataset.id = movies.imdb_id;
        moviesFragment.appendChild(moviesFragmentClone);
    });

    list.appendChild(moviesFragment);
};



// SELECT CATEGORIES
const selectArray = [];

function selectValue(array) {
    let selValue;
    array.forEach(select => {
        selValue = select.categories;
        selValue = selValue.split(", ");
        selValue.forEach(item => {
            if (!selectArray.includes(item)) {
                selectArray.push(item)
            }
        })

    });
};

function selectCreate() {
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

function selectSort(filterArray, selectValue) {
    if (selectValue == "a-z") {
        filterArray.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    } else if (selectValue == "z-a") {
        filterArray.sort((a, b) => b.title.charCodeAt(0) - a.title.charCodeAt(0));
    } else if (selectValue == "0-1year") {
        filterArray.sort((a, b) => a.movie_year - b.movie_year);
    } else if (selectValue == "1-0year") {
        filterArray.sort((a, b) => b.movie_year - a.movie_year);
    } else if (selectValue == "0-1rate") {
        filterArray.sort((a, b) => a.imdb_rating - b.imdb_rating);
    } else if (selectValue == "1-0rate") {
        filterArray.sort((a, b) => b.imdb_rating - a.imdb_rating);
    }
};
// MODAL TEXT CONTENT
function renderModalInfo(topilganKino) {
    modalTitle.textContent = topilganKino.title;
    modalIframe.src = `https://www.youtube-nocookie.com/embed/${topilganKino.yt_id}`;
    modalRating.textContent = topilganKino.imdb_rating;
    modalYear.textContent = topilganKino.movie_year;
    modalRuntime.textContent = topilganKino.runtime;
    modalCategories.textContent = topilganKino.categories;
    modalSummary.textContent = topilganKino.summary;
    modalLink.href = `https://www.imdb.com/title/${topilganKino.imdb_id}`;
}

function renderBookmark() {
    bookMarkList.innerHTML = null;
    bookmarkArray.forEach(element => {
        const item = document.createElement("li");
        const bookmarkImg = document.createElement("img");
        const title = document.createElement("h3");
        const removeBtn = document.createElement("button");

        bookmarkImg.src = `${element.yt_img}`;
        title.textContent = element.title;
        removeBtn.textContent = "Remove";
        removeBtn.dataset.id = element.imdb_id;
        removeBtn.classList.add("remove-btn");
        item.appendChild(bookmarkImg);
        item.appendChild(title);
        item.appendChild(removeBtn);
        bookMarkList.appendChild(item)
    })
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
    if (evt.target.matches(".bookmark-btn")) {
        const bookmarkId = evt.target.dataset.id;
        const findOb = movies.find((item) => {
            return item.imdb_id == bookmarkId;
        });

        if (!bookmarkArray.includes(findOb)) {
            bookmarkArray.push(findOb)
        }

        window.localStorage.setItem("Bookmark", JSON.stringify(bookmarkArray))
        renderBookmark();
    };
});

bookMarkList.addEventListener("click", function (evt) {
    if (evt.target.matches(".remove-btn")) {
        const btnId = evt.target.dataset.id
        const foundBookmarkObj = bookmarkArray.findIndex(item => item.imdb_id === btnId);

        bookmarkArray.splice(foundBookmarkObj, 1);
        renderBookmark()
        window.localStorage.setItem("Bookmark", JSON.stringify(bookmarkArray))

    }
})


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

    if (searchMovie.length > 0) {
        selectSort(searchMovie, elSelectSort.value);
        renderMovies(searchMovie, regexTitle);
    } else {
        list.innerHTML = "Movie not found !!!"
    }

    
});

renderBookmark()
renderMovies(movies.slice(0, 20));