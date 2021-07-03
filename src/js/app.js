import { showId, movieId } from "./genres.js";

const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".searchbox");
const browsedContainer = document.querySelector(".browsingList");
const trendingContainer = document.getElementById("trending");
const paginationContainer = document.querySelector(".paginationBtn");
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
import {
  getMovieCast,
  getMovieInfo,
  getMovieTrailer,
  fetchMovies,
  fetchPopularShows,
} from "./fetchDetails.js";

// MOVIE MODAL
// MOVIE MODAL
// MOVIE MODAL

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("movieTitle")) return;
  backdropMovieInfo.innerHTML = "";
  getMovieTrailer(e.target.dataset?.movieId)
    .then((res) => {
      if (!res.results || !res.results[0])
        throw new Error(
          "We were unable to get any data for that specific movie. Try again."
        );
      getMovieInfo(res.id).then((data) => {
        getMovieCast(res.id).then((cast) => {
          const castcrew = cast.cast.map((actor) => actor.name);
          buildModal(res.results[0].key, data, castcrew.slice(0, 10));
        });
      });
    })
    .catch((err) => {
      backdropMovieInfo.innerHTML = `<p class="flex justify-center items-center text-white m-auto p-4 font-bold text-xl">${err.message}</p>`;
    });

  modalMovieInfo.classList.contains("hidden")
    ? modalMovieInfo.classList.replace("hidden", "flex")
    : "";
  document.body.style.overflow = "hidden";
});

const buildModal = (video, info, cast) => {
  const html = `
   <div class="bg-gray-900 flex justify-center items-center w-full h-screen md:h-auto md:w-3/4 lg:w-1/3 xl:w-1/3 m-auto rounded-b-md overflow-y-auto">
  <div class="flex justify-center flex-col w-full" >
    <iframe loading="lazy" class="w-full h-80" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0"  allowfullscreen></iframe>

    <div class="my-2 pl-4 flex flex-col md:flex-row pb-5">
    <div class="flex flex-col justify-center w-full md:w-3/4 ">
      <div class="flex items-center mb-5 relative flex-none">
      <div class="absolute w-1 h-full bg-purple-500 mr-2 mt-2"></div>
      <p class="font-bold text-3xl text-white pt-2 ml-4">${info.title}</p>
     
    </div>
    <p class=" text-sm text-white text-opacity-80 w-full line-clamp-6 pr-2">${
      info.overview
    }</p>
    </div>

    <div class="flex flex-col md:px-2 pt-3 w-full md:w-2/4 mr-4 ">
    <p class="text-sm text-white text-opacity-80"><span class="font-bold text-purple-400">Genre: </span>${info.genres
      .map((genre) => genre.name)
      .join(", ")}</p>
    <p class=" text-sm text-white text-opacity-80"><span class="font-bold text-purple-400">Rating: </span> ${
      info.vote_average
    }/10</p>
    <p class=" text-sm text-white mb-5 text-opacity-80"><span class="font-bold text-purple-400">Runtime: </span> ${
      info.runtime
    } minutes</p>
    <p class=" text-sm text-white pt-1 text-opacity-80"><span class="font-bold text-md text-purple-400">Cast:</span> ${cast.join(
      ", "
    )}</p>
  </div>
    
    
  </div>
    
  <button class="backbtn bg-gray-800 py-2 text-white ">GO BACK</button>
  </div>
</div>
  `;
  backdropMovieInfo.insertAdjacentHTML("beforeend", html);
};

// CLOSE MOVIE MODAL ON BTN CLICK

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("backbtn")) return;

  modalMovieInfo.classList.contains("flex")
    ? modalMovieInfo.classList.replace("flex", "hidden")
    : "";

  document.body.style.overflow = "visible";
});

// CLOSE MOVIE MODAL WHEN CLICKING OUTSIDE

document.addEventListener("click", (e) => {
  if (e.target.id !== "backdropMovieInfo") return;
  modalMovieInfo.classList.contains("flex")
    ? modalMovieInfo.classList.replace("flex", "hidden")
    : "";

  document.body.style.overflow = "visible";
});

// MOVIE QUERY + PAGINATION
// MOVIE QUERY + PAGINATION
// MOVIE QUERY + PAGINATION

let state = {
  total_rows: 5,
  total_pages: null,
  current_page: 1,
  movies: [],
  query: "",
  pagination: 5,
};

const createMovieCard = (movies) => {
  const movieCard = ` ${movies
    .map((movie) => {
      if (movie.release_date !== "" && movie.vote_average > 0)
        return `
    <div
    class="
      rounded-md
      mb-3
      w-auto
      max-w-5xl
      h-auto
      bg-purple-400 bg-opacity-20
      z-20
      flex
      items-center
      flex-col
      shadow-sm
      md:flex-row
    " data-movie-id="${movie.id}"
  >
    <img
      src="${
        !movie.poster_path
          ? `https://via.placeholder.com/160x240/C7D2FE/000000?text=No+image+available.`
          : IMAGE_URL + movie.poster_path
      }"
      alt=""
      class="w-40 h-auto rounded-md mt-5 md:mt-0"
    />
    <div class="movie__info flex flex-col h-auto m-5">
      <h2
        class="
        movieTitle
          text-purple-900
          font-black font-inter
          text-xl
          mb-2
          hover:text-purple-700
          cursor-pointer
          
        "
     data-movie-id="${movie.id}"

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
        <span class="bg-purple-400 rounded-md px-3 py-1 text-white text-xs ml-1">${
          movie.vote_average
        }</span>
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

    state.movies = data.results;
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
  e.preventDefault();
  let clickedBtn = e.target.closest("button");

  if (!clickedBtn) return;
  if (clickedBtn) {
    state.current_page = clickedBtn.value;

    fetchMovies(state.query, state.current_page).then((data) => {
      state.movies = data.results;
      state.total_pages = data.total_pages;

      browsedContainer.innerHTML = "";
      paginationContainer.innerHTML = "";

      createMovieCard(state.movies);
      createPagination(state.total_pages);
    });
  }
});

/// POPULAR SHOWS
/// POPULAR SHOWS
/// POPULAR SHOWS

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
