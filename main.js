// Bring the html element to js
const list = document.querySelector(".movies-list");
const template = document.querySelector(".movies-template").content;
const moviesFragment = document.createDocumentFragment();

for(let i = 0; i < 100; i++){
    // TEMPLATE NING ICHIDAGI BARCHA ELEMENTLARNI CHIQARIB BERADI cloneNode(true)
    const moviesFragmentClone = template.cloneNode(true);

    // MOVIESFRAGMENTCLONE GA OLIB BARCHA ELEMENTLARGA TEXTCONTENT BERYAPMIZ
    moviesFragmentClone.querySelector(".movies-title").textContent = movies[i].Title;
    moviesFragmentClone.querySelector(".movies-year-span").textContent = movies[i].movie_year;
    moviesFragmentClone.querySelector(".movies-categories-span").textContent = movies[i].Categories.split("|").join(" | ");
    moviesFragmentClone.querySelector(".movies-time-span").textContent = `${Math.floor(movies[i].runtime / 60)} Hour ${movies[i].runtime % 60} minutes`;

    moviesFragment.appendChild(moviesFragmentClone);
}
list.appendChild(moviesFragment);
