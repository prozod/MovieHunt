const glideContainer = document.querySelector(".glide__slides");
const popularPeople = document.querySelector(".popularPeople");
const trailerContainer = document.querySelector(".trailerContainer");

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchTrends() {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=1f4df7f17529b542876a985507f244b0`
  );
  let data = await response.json();
  return data;
}

async function fetchPeople() {
  let response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=1f4df7f17529b542876a985507f244b0&language=en-US&page=1`
  );
  let data = await response.json();
  return data;
}

var glide = new Glide(".glide", {
  startAt: 0,
  perView: 8,
  type: "carousel",
  perTouch: 3,
  breakpoints: {
    600: {
      perView: 3,
    },
    820: {
      perView: 4,
    },
    1200: {
      perView: 5,
    },
    1420: {
      perView: 7,
    },
  },
});

fetchTrends().then((data) => {
  carouselOne(data.results);
  fetchTrailers(data.results);
  // console.log(data.results.forEach((result) => console.log(result.id)));
});

function carouselOne(movies) {
  const html = movies
    .map((movie) => {
      return `
        <div class="glide__slide">
        <div class="w-50 h-50 object-fit">
        <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}" class="object-fit bg-contain  hover:cursor-pointer hover:shadow-lg" />
        </div>
        </div>   
        `;
    })
    .join("");
  glideContainer.insertAdjacentHTML("beforeend", html);
  glide.mount();
}

var glide2 = new Glide(".actors", {
  startAt: 0,
  perView: 8,
  type: "carousel",
  perTouch: 3,
  breakpoints: {
    600: {
      perView: 3,
    },
    820: {
      perView: 4,
    },
    1200: {
      perView: 5,
    },
    1420: {
      perView: 7,
    },
  },
});

fetchPeople().then((data) => {
  carouselTwo(data.results);
});

function carouselTwo(actors) {
  const html = actors
    .map((actor) => {
      return `
        <div class="glide__slide">
        <div class="w-50 h-50 object-fit">
        <img src="${IMAGE_URL}${actor.profile_path}" alt="${actor.name}"  class="object-fit bg-contain  hover:cursor-pointer hover:shadow-lg flex"> 
        <p class="relative text-white overflow-hidden bg-purple-500 bg-opacity-90 uppercase text-xs font-bold text-center py-2 px-1 truncate">${actor.name}</p>

      

        </img>

      

       </div>
        </div>
        `;
    })
    .join("");
  popularPeople.insertAdjacentHTML("beforeend", html);
  glide2.mount();
}

//TRAILER
//TRAILER
//TRAILER

function fetchTrailers(movieData) {
  console.log(movieData);
  movieData.forEach((movie) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=1f4df7f17529b542876a985507f244b0&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => displayVids(data.results));
  });
}

function displayVids(vidId) {
  const html = `
  <div class="glide__slide">
   <p>paaa</p>
</div>
      `;

  trailerContainer.insertAdjacentHTML("beforeend", html);
}

/* <iframe
        width="440"
        height="230"
        src="https://www.youtube.com/embed/${id.key}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> */

// const html = vidId
//     .map((id) => {
//       // console.log(id);
//       return `
//        <p>${vidId[0].key}</p>
//       `;
//     })
//     .join("");
