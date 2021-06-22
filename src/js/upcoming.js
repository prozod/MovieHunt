const apiKey = "1f4df7f17529b542876a985507f244b0";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const upcomingContainer = document.querySelector(".upcomingContainer");
const similarModal = document.getElementById("similarMoviesModal");
/// POPULAR MOVIES

async function fetchPopularMoviesPage() {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );
  let data = await response.json();

  return data;
}

fetchPopularMoviesPage().then((data) => {
  console.log(data);
  popularMovies(data.results);
});

let movieId = [];
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("backdrop")) return;
  fetch(
    `https://api.themoviedb.org/3/movie/${e.target.dataset.id}/similar?api_key=${apiKey}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => console.log("Similar movies:", data));
  similarModal.classList.add("flex");
  document.body.style.overflow = "hidden";
  document.body.style.pointerEvents = "none";
});

// async function fetchMovieInfo() {
//   if (movieId !== []) {
//     let response = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId[0]}/similar?api_key=${apiKey}&language=en-US&page=1`
//     );
//     let data = await response.json();
//     return data;
//   }
// }

// fetchMovieInfo();

// fetchMovieInfo().then((data) => {
//   console.log(data);
// });

const popularMovies = function (movies) {
  console.log(movies);
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
      <p class="text-white text-1xl font-bold  pb-3">
        ${movie.title} (${movie.release_date.slice(0, -6)})
      </p>
      <p class="text-white text-sm font-bold  pb-3">
        Official release date: ${movie.release_date}
      </p>
        <p class="text-gray-300 text-sm  mb-5 line-clamp-5 ">${
          movie.overview
        }</p>
      </div>
    </div>

    `;
    })
    .join("");

  upcomingContainer.insertAdjacentHTML("beforeend", movie);
};
