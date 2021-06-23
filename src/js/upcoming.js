import { movieId } from "./genres.js";

const apiKey = "1f4df7f17529b542876a985507f244b0";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const upcomingContainer = document.querySelector(".upcomingContainer");
const similarModal = document.getElementById("similarMoviesModal");
///UPCOMING MOVIES


async function fetchUpcomingMoviesPage() {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );
  let data = await response.json();

  return data;
}

fetchUpcomingMoviesPage().then((data) => {
  console.log(data);
  upcomingMovies(data.results);
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("backdrop")) return;

  fetch(
    `https://api.themoviedb.org/3/movie/${e.target.dataset.id}/similar?api_key=${apiKey}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => similarMovies(data.results.slice(-10)));

  document.querySelector(".similarRecommends").innerHTML = "";

  similarModal.classList.contains("hidden")
    ? similarModal.classList.replace("hidden", "flex")
    : "";
  document.body.style.overflow = "hidden";
  upcomingContainer.style.pointerEvents = "none";

  const similarTo = function () {
    return `
    <div class="similarTitle flex items-center mb-2">
          <div class="w-1 h-8 bg-indigo-600 mr-2 items-center"></div>
          <h3 class="text-xl text-gray-900 font-bold">Movies similar to <span class="text-purple-800"> ${
            e.target.querySelector(".movieTitle").textContent
          }</span></h3>
        </div>
    `;
  };

  document
    .querySelector(".similarTo")
    .insertAdjacentHTML("afterbegin", similarTo());
});

// CLOSE MODAL ON CLICK OUTSIDE

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("modalbackdrop")) return;
  document.querySelector(".similarTitle").remove();
  document.body.style.overflow = "visible";
  upcomingContainer.style.pointerEvents = "auto";
  similarModal.classList.contains("flex")
    ? similarModal.classList.replace("flex", "hidden")
    : "";
});

const similarMovies = function (movies) {
  const movie = movies
    .map((movie) => {
      return `
      <div class="bg-purple-300 bg-opacity-80 h-auto flex rounded-md w-72 ">
      <div>
      <img src="${IMAGE_URL}${movie.poster_path}" class="w-24 max-w-sm h-32" />
      </div>
      <div class="p-2 ml-1">
      <h1 class=" text-indigo-900 font-bold">${movie.title}</h1>
      <h1 class="text-xs text-indigo-900 font-medium"><span class="font-bold">Year:</span> ${movie.release_date.slice(
        0,
        -6
      )}</h1>
      <h1 class="text-xs text-indigo-900 font-medium"><span class="font-bold">Vote average:</span> ${
        movie.vote_average
      }/10</h1>
      </div>
    </div>
    `;
    })
    .join("");

  document
    .querySelector(".similarRecommends")
    .insertAdjacentHTML("beforeend", movie);
};


const upcomingMovies = function (movies) {
 
  const movie = movies
    .map((movie) => {
      if (
        movie.title !== undefined &&
        movie.title !== "" &&
        movie.release_date !== null
      )
        return `
      <div
      class="
        relative
        rounded-md
        flex
        justify-center
        flex-col
        items-center
        shadow-sm
        overflow-hidden
        filter
        hover:drop-shadow-lg
        transform
        hover:scale-105
        hover:z-40
  

        duration-200
      "
      data-id="${movie.id}"
    > 
      <img
        src="${IMAGE_URL}${movie.poster_path}"
        title=""
        class="rounded-md overflow-hidden"
      />

      <div
        class="
          absolute
          opacity-0
          hover:opacity-30
          rounded-md
          bg-gray-800
          duration-300
          z-20
          inset-0
        "
      ></div>

      <div class="
        backdrop
        absolute
        opacity-0
        hover:opacity-100
        duration-300
        z-50
        inset-0
        flex
        flex-col
        justify-end
        transform
        scale-90
        hover:scale-100
        hover:cursor-pointer
      bg-gray-900 bg-opacity-80
        overflow-hidden
        px-3" 
        data-id="${movie.id}">
        
      <p class="movieTitle text-white text-1xl font-bold ">
        ${movie.title} (${movie.release_date.slice(0, -6)})
      </p>

      <p class="text-white text-xs font-bold">
        Official release date: <span class="text-purple-400">${movie.release_date}</span>
      </p>

      <p class="text-white text-xs font-bold  pb-5">
        Genre: <span class="text-purple-400">${movieId(movie.genre_ids)}</span>
      </p>

      <p class="text-gray-300 text-sm  mb-5 line-clamp-5 ">${movie.overview}</p>

      </div>
    </div>

    `;
    })
    .join("");

  upcomingContainer.insertAdjacentHTML("beforeend", movie);
};
