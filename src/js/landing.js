const trendingContainer = document.querySelector(".trendingNow");
const popularPeople = document.querySelector(".popularPeople");
const trailerContainer = document.querySelector(".trailers");
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const trendFilter = document.getElementById("trendFilter");
const modalMovieInfo = document.getElementById("modalMovieInfo");
const backdropMovieInfo = document.getElementById("backdropMovieInfo");
import { movieId } from "./genres.js";

function getMovieTrailer(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1f4df7f17529b542876a985507f244b0&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);
}

function getMovieInfo(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=1f4df7f17529b542876a985507f244b0&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}

document.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id !== "movietrending" && e.target.id !== "clickedmovie") return;
  backdropMovieInfo.innerHTML = "";
  getMovieTrailer(e.target.dataset?.id)
    .then((res) => {
      if (!res.results || !res.results[0])
        throw new Error(
          "We were unable to get any data for that specific movie. Try again."
        );
      getMovieInfo(res.id).then((data) => buildModal(res.results[0].key, data));
    })
    .catch((err) => {
      backdropMovieInfo.innerHTML = `<p class="flex justify-center items-center text-white m-auto p-4 font-bold text-xl">${err.message}</p>`;
    });

  modalMovieInfo.classList.contains("hidden")
    ? modalMovieInfo.classList.replace("hidden", "flex")
    : "";
  document.body.style.overflow = "hidden";
});

const buildModal = (video, info) => {
  const html = `
   <div class="bg-gray-900 flex justify-center items-center w-full md:w-3/4 lg:w-1/3 xl:w-1/3 m-auto rounded-b-md">
  <div class="flex justify-center flex-col w-full" >
    <iframe loading="lazy" class="w-full h-96" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0"  allowfullscreen></iframe>

    <div class="my-2 pl-4 flex pb-5">
    <div class="flex flex-col justify-center">
      <div class="flex items-center mb-5">
      <div class="w-1 h-12 lg:h-10 bg-purple-500 mr-2 mt-2"></div>
      <p class="font-bold text-3xl text-white pt-2">${info.title}</p>
     
    </div>
    <p class=" text-sm text-white text-opacity-70 w-3/4 ">${info.overview}</p>
    </div>

    <div class="flex flex-col pl-1">
    <p class="text-sm text-white"><span class="font-bold text-purple-400">Genre: </span>${info.genres[0].name}</p>
    <p class="font-bold text-sm text-purple-400 mb-5">${info.popularity}% popularity</p>
    <p class=" text-sm text-white text-opacity-70"><span class="font-bold text-md text-purple-400">Cast:</span> Tom Ellis, Lauren German, Kevin Alejandro, D.B. Woodside, Lesley-Ann Brandt, Rachael Harris, more</p>
  </div>
    
    
  </div>
    
  </div>
</div>
  `;
  backdropMovieInfo.insertAdjacentHTML("beforeend", html);
};

document.addEventListener("click", (e) => {
  if (e.target.id !== "backdropMovieInfo") return;
  modalMovieInfo.classList.contains("flex")
    ? modalMovieInfo.classList.replace("flex", "hidden")
    : "";

  document.body.style.overflow = "visible";
});

/////////
/////////
/////////
/////////

let gliderOptions = {
  slidesToScroll: 1,
  slidesToShow: 6,
  draggable: true,
  resizeLock: true,
  scrollLock: true,
  rebuildPaging: true,
  duration: 2,
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
};

let gliderOptionsVideosBackdrop = {
  slidesToScroll: 1,
  slidesToShow: 4,
  draggable: true,
  resizeLock: true,
  scrollLock: true,
  duration: 2,
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
};

// TRENDING CAROUSEL
let filterArg = ["day"];

trendFilter.addEventListener("click", (e) => {
  if (!e.target.dataset.trend) return;
  console.log(e.target);
  const buttons = e.target.dataset.trend;
  switch (buttons) {
    default:
      document.getElementById("day").classList.add("bg-purple-500");
      document.getElementById("day").classList.add("text-white");

      document.getElementById("week").classList.remove("text-white");
      document.getElementById("week").classList.remove("bg-purple-500");

      break;
    case "week":
      document.getElementById("week").classList.add("bg-purple-500");
      document.getElementById("week").classList.add("text-white");

      document.getElementById("day").classList.remove("text-white");
      document.getElementById("day").classList.remove("bg-purple-500");

      break;
  }
  const movies = fetch(
    `https://api.themoviedb.org/3/trending/all/${e.target.dataset.trend}?api_key=1f4df7f17529b542876a985507f244b0`
  )
    .then((data) => data.json())
    .then((result) => {
      carouselOne(result.results);
    });
});

async function fetchTrends(filter) {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/${filterArg}?api_key=1f4df7f17529b542876a985507f244b0`
  );
  let data = await response.json();
  return data;
}

fetchTrends().then((data) => {
  carouselOne(data.results);
  displayVids(data.results);
});

function carouselOne(movies) {
  trendingContainer.innerHTML = "";
  const html = movies
    .map((movie) => {
      return `
        <div class="mr-2" data-id="${movie.id}" id="movietrending">
        <img loading="lazy"   src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}" class=" bg-stretch object-cover hover:cursor-pointer hover:shadow-lg">
      
      </img>

      

        </div>
        `;
    })
    .join("");
  trendingContainer.insertAdjacentHTML("beforeend", html);
  new Glider(document.querySelector(".trendingNow"), gliderOptions);
}

// PEOPLE CAROUSEL

async function fetchPeople() {
  let response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=1f4df7f17529b542876a985507f244b0&language=en-US&page=1`
  );
  let data = await response.json();
  return data;
}

fetchPeople().then((data) => {
  carouselTwo(data.results);
});

function carouselTwo(actors) {
  const html = actors
    .map((actor) => {
      return `
        <div class="mr-2">
        <img loading="lazy"  src="${IMAGE_URL}${actor.profile_path}" alt="${actor.name}" class=" hover:cursor-pointer hover:shadow-lg" />
        <p class="relative text-white overflow-hidden bg-purple-500 bg-opacity-90 uppercase text-xs font-bold text-center py-2 px-1 truncate">${actor.name}</p>
        </div>
        `;
    })
    .join("");
  popularPeople.insertAdjacentHTML("beforeend", html);
  new Glider(document.querySelector(".popularPeople"), gliderOptions);
}

//TRAILER
//TRAILER
//TRAILER

// function fetchTrailers(movieData) {
//   movieData.forEach((movie) => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=1f4df7f17529b542876a985507f244b0&language=en-US`
//     )
//       .then((response) => response.json())
//       .then((data) => displayVids(data.results));
//   });
// }

// document.addEventListener("click", (e) => {
//   if (e.target.id !== "clickedmovie") return;

//   getMovieTrailer(e.target.dataset?.id)
//     .then((res) => {
//       if (!res.results || !res.results[0])
//         throw new Error(
//           "We were unable to get any data for that specific movie. Try again."
//         );
//       getMovieInfo(res.id).then((data) => buildModal(res.results[0].key, data));
//     })
//     .catch((err) => {
//       backdropMovieInfo.innerHTML = `<p class="flex justify-center items-center text-white m-auto p-4 font-bold text-xl">${err.message}</p>`;
//     });
// });

function displayVids(vidId, trailer) {
  console.log(vidId, trailer);
  const html = vidId
    .map((video) => {
      return `
      <div class="mr-2 h-full hover:scale-90 drop-shadow-md filter duration-200">
      <div class="relative group" data-id=${video.id} id="clickedmovie">
        <img loading="lazy" src="${IMAGE_URL}${video.backdrop_path}" alt="${
        video.title
      }" class="group-hover:grayscale z-10 hover:cursor-pointer hover:shadow-lg border-2 border-purple-500">
        </img>
        <i class="fas fa-play text-white text-3xl absolute pb-5 z-30 bottom-2/4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 group-hover:text-purple-400 group-hover:scale-150 duration-200"></i>
        </div>
        <p class="font-bold text-white text-xl">${video.title || video.name}</p>
      </div>

    `;
    })
    .join("");

  trailerContainer.insertAdjacentHTML("beforeend", html);
  new Glider(document.querySelector(".trailers"), gliderOptionsVideosBackdrop);
}
