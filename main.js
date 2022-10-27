// Bring the html element to js
const list = document.querySelector(".movies-list");
const template = document.querySelector(".movies-template").content;
const moviesFragment = document.createDocumentFragment();

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

// FUNCTION GET HOURS AND MINUTES 
function showTime(time) {
    const hour = Math.floor(time / 60) + "hour " + time % 60 + "min";
    return hour;
}

function renderMovies(kino) {
    kino.forEach(movies => {
        // TEMPLATE NING ICHIDAGI BARCHA ELEMENTLARNI CHIQARIB BERADI cloneNode(true)
        const moviesFragmentClone = template.cloneNode(true);

        // MOVIESFRAGMENTCLONE GA OLIB BARCHA ELEMENTLARGA TEXTCONTENT BERYAPMIZ
        moviesFragmentClone.querySelector(".movies-img").src = `https://i3.ytimg.com/vi/${movies.ytid}/mqdefault.jpg`;
        moviesFragmentClone.querySelector(".movies-img").alt = movies.Title;
        moviesFragmentClone.querySelector(".movies-title").textContent = movies.Title;
        moviesFragmentClone.querySelector(".movies-rate").textContent = movies.imdb_rating;
        moviesFragmentClone.querySelector(".movies-year").textContent = movies.movie_year;
        moviesFragmentClone.querySelector(".movies-categories-span").textContent = movies.Categories.split("|").join(", ");
        moviesFragmentClone.querySelector(".movies-time").textContent = showTime(movies.runtime);
        moviesFragmentClone.querySelector(".movie-btn").dataset.id = movies.imdb_id;
        moviesFragment.appendChild(moviesFragmentClone);
    });

    list.appendChild(moviesFragment);
};

// MODAL TEXT CONTENT
function renderModalInfo(topilganKino) {
    modalTitle.textContent = topilganKino.Title;
    modalIframe.src = `https://www.youtube-nocookie.com/embed/${topilganKino.ytid}`;
    modalRating.textContent = topilganKino.imdb_rating;
    modalYear.textContent = topilganKino.movie_year;
    modalRuntime.textContent = showTime((topilganKino.runtime));
    modalCategories.textContent = topilganKino.Categories.split("|").join(", ");
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

renderMovies(movies.slice(0, 10));