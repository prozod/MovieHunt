const glideContainer = document.querySelector(".glide__slides");
const popularPeople = document.querySelector(".popularPeople");

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
  perView: 11,
  gap: 10,
  breakpoints: {
    768: {
      perView: 3,
    },
    1080: {
      perView: 5,
    },
    1150: {
      perView: 6,
    },
    1250: {
      perView: 6,
    },
    1600: {
      perView: 8,
    },
  },
});

fetchTrends().then((data) => {
  carouselOne(data.results);
});

function carouselOne(movies) {
  const html = movies
    .map((movie) => {
      return `
        <div class="glide__slide"><img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}" class="h-60  hover:cursor-pointer hover:shadow-lg transform duration-150" /></div>   
        `;
    })
    .join("");
  glideContainer.insertAdjacentHTML("beforeend", html);
  glide.mount();
}

var glide2 = new Glide(".actors", {
  startAt: 0,
  perView: 11,
  gap: 20,
  breakpoints: {
    768: {
      perView: 3,
    },
    1080: {
      perView: 5,
    },
    1150: {
      perView: 6,
    },
    1250: {
      perView: 6,
    },
    1600: {
      perView: 8,
    },
  },
});

fetchPeople().then((data) => {
  carouselTwo(data.results);
});

function carouselTwo(actors) {
  const html = actors
    .map((actor) => {
      console.log(actor);
      return `
        <div class="glide__slide flex justify-center overflow-hidden flex-col">
        
        <img src="${IMAGE_URL}${actor.profile_path}" alt="${actor.name}" class="h-60   hover:cursor-pointer hover:shadow-lg transform duration-150" />
        <p class="text-white overflow-hidden bg-purple-400 bg-opacity-90 uppercase flex text-xs items-center justify-center">${actor.name}</p>
        </div>
        `;
    })
    .join("");
  popularPeople.insertAdjacentHTML("beforeend", html);
  glide2.mount();
}
