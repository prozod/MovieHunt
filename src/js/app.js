const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".searchbox");
const movieTitle = document.querySelector(".movie__info");
const browsedContainer = document.querySelector(".browsingList");

const apiKey = "1f4df7f17529b542876a985507f244b0";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let movieQuery = searchInput.value;
  let page = 1;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieQuery}&page=${page}`
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    const movies = data.results;
    browsedContainer.innerHTML = "";
    movieContainer(movies);
  } catch (error) {
    console.error(error.message);
  }
});

async function getGenre() {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    let data = await response.json();
    return data.genres;
  } catch (error) {
    console.log(error);
  }
}

function movieContainer(movies) {
  const html = `
  ${movies
    .map((movie) => {
      if (
        movie.poster_path !== null &&
        movie.genre_ids.length !== 0 &&
        movie.overview !== ""
      ) {
        return `
    <div
    class="
      rounded-md
      m-2
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
      md:w-11/12
      xl:w-screen
    ">
   <img
  src="${IMAGE_URL}${movie.poster_path}"
  alt="MOVIE POSTER MISSING"
  class="w-48 h-auto rounded-md mt-5 md:mt-0"
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
          >${"dummytext"}</span
        >
      </p>
      <p class="font-bold text-purple-900 flex flex-row ">
        Popularity:
        <span class="font-medium w-max text-xs flex justify-center items-center leading-relaxed bg-purple-300 text-purple-600 px-2 ml-2 py-0 rounded-sm">${
          movie.popularity
        } ★</span>
      </p>
      <p class="font-bold text-purple-900">
        Overview:
        <span class="font-medium text-purple-600"
          >${movie.overview}</span
        >
      </p>
    </div>
  </div>
  `;
      }
    })
    .join("")}`;

  browsedContainer.insertAdjacentHTML("beforeend", html);
  searchInput.value.textContent = "";
}

async function getShows() {
  let response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  let data = await response.json();
  console.log(data.results);
  return data.results;
}

getShows();

// https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US
