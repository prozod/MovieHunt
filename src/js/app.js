import { showId, movieId } from "./genres.js";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".searchbox");
const browsedContainer = document.querySelector(".browsingList");
const trendingContainer = document.getElementById("trending");
const paginationContainer = document.querySelector(".paginationBtn");
const apiKey = "1f4df7f17529b542876a985507f244b0";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";


// pagination
// pagination
// pagination

let state = {
  total_rows: 5,
  total_pages: null,
  current_page: 1,
  movies: [],
  query: "",
  pagination: 5,
};

// movie querying
// movie querying
// movie querying

async function fetchMovies(searchQuery, page) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${page}`
  );
  let data = await response.json();

  return data;
}


const createMovieCard = (movies) => {
  const movieCard = ` ${movies
    .map((movie) => {
      if (
        movie.release_date !== "" &&
        movie.vote_average > 0
      )
        return `
    <div
    class="
      rounded-md
      mb-3
      w-auto
      max-w-5xl
      h-auto
      bg-purple-400 bg-opacity-20
      z-50
      flex
      items-center
      flex-col
      shadow-sm
      md:flex-row
    " data-movie-id="${movie.id}"
  >
    <img
      src="${!movie.poster_path ? `https://via.placeholder.com/160x240/C7D2FE/000000?text=No+image+available.` : IMAGE_URL+movie.poster_path}"
      alt=""
      class="w-40 h-auto rounded-md mt-5 md:mt-0"
    />
    <div class="movie__info flex flex-col h-auto m-5">
      <h2
        class="
          text-purple-900
          font-black font-inter
          text-xl
          mb-2
          hover:text-purple-700
          cursor-pointer
        "
      >
       ${movie.title} (${movie.release_date.slice(0, -6)})
      </h2>
      <p class="font-bold text-purple-900">
        Release date:
        <span class="font-medium text-purple-600">${
          movie.release_date
        } (US)</span>
      </p>
      <p class="font-bold text-purple-900">
        Genre: 
        <span class="font-medium text-purple-600"
          >${movieId(movie.genre_ids)}</span
        >
      </p>
      
      <p class="font-bold text-purple-900 flex items-center">
        Average rating:
        <span class="font-medium text-purple-600">
        <span class="bg-purple-400 rounded-md px-3 py-1 text-white text-xs ml-1">${movie.vote_average}</span>
        </span>
      </p>

      <p class="font-bold text-purple-900">
        Overview:<span class="font-medium text-purple-600 line-clamp-3"
          >${movie.overview}</span
        >
      </p>
    </div>
  </div>`;
    })
    .join("")}
  
  `;

  browsedContainer.insertAdjacentHTML("beforeend", movieCard);
};

const createPagination = (pages) => {
  

  paginationContainer.innerHTML = "";
  let maxLeft = Number(state.current_page) - Math.floor(state.pagination / 2);
  let maxRight = Number(state.current_page) + Math.floor(state.pagination / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = state.pagination;
  }

  if (maxRight > pages) {
    maxLeft = pages - (state.pagination - 1);
    maxRight = pages;

    if (maxLeft < 1) {
      maxLeft = 1;
    }
  }
  for (let page = maxLeft; page <= maxRight; page++) {
    paginationContainer.innerHTML += `<button value=${page} class="mx-2 p-2 px-4 my-2  text-purple-900  bg-indigo-300 rounded-md font-bold active:bg-indigo-200 focus:outline-none"> ${page}</button>`;
  }

  if (state.current_page != 1) {
    paginationContainer.innerHTML =
      `<button value=${1} class="bg-indigo-300 text-purple-900   px-5 py-2 my-2 mx-1 rounded-md font-bold active:bg-indigo-200 focus:outline-none">First</button>` +
      paginationContainer.innerHTML;
  }

  if (state.current_page != pages) {
    paginationContainer.innerHTML =
      paginationContainer.innerHTML +
      `<button value=${pages} class="bg-indigo-300 text-purple-900  px-5 py-2 my-2 mx-1 rounded-md font-bold active:bg-indigo-200 focus:outline-none">Last</button>`;
  }

};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchQuery = searchInput.value;

  if (searchQuery === "") {
    browsedContainer.innerHTML = "";
    paginationContainer.innerHTML = "";
    paginationContainer.innerHTML = `<h1 class="text-purple-900 font-bold text-xl">Search field is empty. Please type a movie name.</h1> 
    `;
    return;
  }

  fetchMovies(searchQuery, 1).then((data) => {
    if (data.results.length === 0) {
      browsedContainer.innerHTML = "";
      paginationContainer.innerHTML = "";
      paginationContainer.innerHTML = `<h1 class="text-purple-900 font-bold text-xl">Could not find any movie called "${searchQuery}".</h1> 
      `;
      return;
    }

    const half = Math.ceil(data.results.length / 2);
    const halfOne = data.results.slice(0, half);
    
    state.movies = halfOne;
    state.total_pages = data.total_pages;
    state.current_page = data.page;
    state.query = searchQuery;

    browsedContainer.innerHTML = "";
    paginationContainer.innerHTML = "";

    createMovieCard(state.movies);
    createPagination(state.total_pages);
  });
});

paginationContainer.addEventListener("click", (e) => {
  e.preventDefault()
  let clickedBtn = e.target.closest("button");

  if (!clickedBtn) return;

  if (clickedBtn) {
    state.current_page = clickedBtn.value;
    
    fetchMovies(state.query, state.current_page).then((data) => {
      const half = Math.ceil(data.results.length / 2);
      const halfOne = data.results.slice(0, half);
      state.movies = halfOne;
      state.total_pages = data.total_pages;

      browsedContainer.innerHTML = "";
      paginationContainer.innerHTML = "";

      createMovieCard(state.movies);
      createPagination(state.total_pages);

      if (clickedBtn.classList.contains("bg-indigo-300")) {
        clickedBtn.classList.replace("bg-indigo-300", "bg-red-500")
      }
    });
  }

  
});

/// POPULAR SHOWS
/// POPULAR SHOWS
/// POPULAR SHOWS

async function fetchPopularShows() {
  let response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
  );

  let data = await response.json();
  return data;
}

fetchPopularShows().then((data) => {
  trendingShows(data.results.slice(0, 7));
});




function trendingShows(shows) {
  const show = `${shows
    .map((show) => {
      return `
    <div class="my-1 bg-indigo-200 flex font-inter rounded-md" data-id="${
      show.id
    }" >
            <img
              src="${IMAGE_URL}${show.poster_path}"
              alt=""
              class="w-16 rounded-l-md"
            />
            <div class="series__info flex w-auto m-auto flex-col mx-5">
              <h2
                class="
                  font-bold
                  text-purple-900
                  justify-center
                  hover:text-purple-700
                  cursor-pointer
                "
              >
                ${show.name} (${show.first_air_date.slice(0, -6)})
              </h2>
              <p class="text-xs font-bold text-purple-900">
                Genre:
                <span class="font-medium text-purple-600">${showId(
                  show.genre_ids
                )}</span>
              </p>
              <p class="text-xs font-bold text-purple-900">
                Rating:
                <span class="font-medium text-purple-600"> ${
                  show.vote_average
                }/10</span>
              </p>
              
            </div>
          </div>
    `;
    })
    .join("")}`;

  trendingContainer.insertAdjacentHTML("beforeend", show);
}
