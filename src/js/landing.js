const trendingContainer = document.querySelector(".trendingNow");
const popularPeople = document.querySelector(".popularPeople");
const trailerContainer = document.querySelector(".trailers");
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const trendFilter = document.getElementById("trendFilter");
const modalMovieInfo = document.getElementById("modalMovieInfo");
const backdropMovieInfo = document.getElementById("backdropMovieInfo");

import {
	getMovieCast,
	getMovieInfo,
	getMovieTrailer,
	fetchPeople,
	fetchTrends,
	getActorInfo
} from "./fetchDetails.js";

// CAROUSEL SETTINGS + CLASSES

const swiper1 = new Swiper(".swiper1", {
	// Optional parameters
	colors: {
		white: "#ffffff",
		black: "#000000"
	},
	freeModeSticky: true,
	allowSlideNext: true,
	allowSlidePrev: true,

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},

	// Breakpoints
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 2,
			spaceBetween: 10
		},
		// when window width is >= 480px
		480: {
			slidesPerView: 3,
			spaceBetween: 10
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 4,
			spaceBetween: 10
		},
		768: {
			slidesPerView: 5,
			spaceBetween: 10
		},
		1200: {
			slidesPerView: 6,
			spaceBetween: 10
		}
	},

	a11y: {
		prevSlideMessage: "Previous slide",
		nextSlideMessage: "Next slide"
	}
});
const swiper2 = new Swiper(".swiper2", {
	// Optional parameters
	freeModeSticky: true,
	allowSlideNext: true,
	allowSlidePrev: true,

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},

	// Breakpoints
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 2,
			spaceBetween: 10
		},
		// when window width is >= 480px
		480: {
			slidesPerView: 3,
			spaceBetween: 10
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 4,
			spaceBetween: 10
		},
		768: {
			slidesPerView: 5,
			spaceBetween: 10
		},
		1200: {
			slidesPerView: 6,
			spaceBetween: 10
		}
	},

	a11y: {
		prevSlideMessage: "Previous slide",
		nextSlideMessage: "Next slide"
	}
});
const swiper3 = new Swiper(".swiper3", {
	// Optional parameters
	freeModeSticky: true,

	allowSlideNext: true,
	allowSlidePrev: true,

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},

	// Breakpoints
	breakpoints: {
		// when window width is >= 480px
		480: {
			slidesPerView: 2,
			spaceBetween: 10
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 3,
			spaceBetween: 10
		},
		768: {
			slidesPerView: 4,
			spaceBetween: 10
		}
	},

	a11y: {
		prevSlideMessage: "Previous slide",
		nextSlideMessage: "Next slide"
	}
});

// FETCH MOVIE DETAILS WHEN MOVIE POSTER/THUMBNAIL IS CLICKED

document.addEventListener("click", e => {
	if (e.target.id !== "movietrending" && e.target.id !== "clickedmovie") return;
	backdropMovieInfo.innerHTML = "";
	getMovieTrailer(e.target.dataset?.id)
		.then(res => {
			if (!res.results || !res.results[0])
				throw new Error(
					"We were unable to get any data for that specific movie. Try again."
				);
			getMovieInfo(res.id).then(data => {
				getMovieCast(res.id).then(cast => {
					const castcrew = cast.cast.map(actor => actor.name);
					window.onerror = e => console.log(e);
					buildModal(res.results[0].key, data, castcrew.slice(0, 10));
				});
			});
		})
		.catch(err => {
			backdropMovieInfo.innerHTML = `<p class="flex justify-center items-center text-white m-auto p-4 font-bold text-xl">${err.message}</p>`;
		});

	modalMovieInfo.classList.contains("hidden")
		? modalMovieInfo.classList.replace("hidden", "flex")
		: "";
	document.body.style.overflow = "hidden";
});

const buildModal = (video, info, cast) => {
	const html = `
   <div class="bg-gray-900 flex justify-center items-center w-full h-screen md:h-auto md:w-3/4 lg:w-1/3 xl:w-1/3 m-auto rounded-b-md">
  <div class="flex justify-center flex-col w-60" >
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
			.map(genre => genre.name)
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

document.addEventListener("click", e => {
	if (!e.target.classList.contains("backbtn")) return;

	modalMovieInfo.classList.contains("flex")
		? modalMovieInfo.classList.replace("flex", "hidden")
		: "";

	document.body.style.overflow = "visible";
});

// CLOSE MOVIE MODAL WHEN CLICKING OUTSIDE

document.addEventListener("click", e => {
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
/////////

// TRENDING MOVIES CAROUSEL (DAILY+WEEKLY)

trendFilter.addEventListener("click", e => {
	if (!e.target.dataset.trend) return;
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
		.then(data => data.json())
		.then(result => {
			carouselOne(result.results);
		});
});

fetchTrends().then(data => {
	carouselOne(data.results);
	displayVids(data.results);
});

function carouselOne(movies) {
	trendingContainer.innerHTML = "";
	const html = movies
		.map(movie => {
			return `
      <div class="swiper-slide" >
        
      <img loading="lazy" max-width:250px max-height:350px src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}" data-id="${movie.id}" id="movietrending" class="bg-stretch object-cover hover:cursor-pointer hover:shadow-lg  w-50 h-auto">
      </img>

      </div>
        `;
		})
		.join("");
	trendingContainer.insertAdjacentHTML("beforeend", html);
	swiper1.update();
}

// POPULAR PEOPLE CAROUSEL

fetchPeople().then(data => {
	carouselTwo(data.results);
});

function carouselTwo(actors) {
	const html = actors
		.map(actor => {
			return `
        <div class="swiper-slide" ">
        <img loading="lazy"  src="${IMAGE_URL}${actor.profile_path}" alt="${actor.name}" class=" hover:cursor-pointer hover:shadow-lg w-50 h-auto" data-actor-id="${actor.id}" />
        <p class="relative text-white overflow-hidden bg-purple-500 bg-opacity-90 uppercase text-xs font-bold text-center py-2 px-1 truncate">${actor.name}</p>
        </div>
        `;
		})
		.join("");
	popularPeople.insertAdjacentHTML("beforeend", html);
	swiper2.update();
}

// FUTURE: TO-DO A NEW PAGE/ROUTE TO DISPLAY DETAILED INFO ABOUT AN ACTOR

// document.addEventListener("click", (e) => {
//   const personId = e.target.dataset.actorId;
//   if (!personId) return;

//   getActorInfo(personId).then((info) => {});
// });

// LATEST TRAILERS CAROUSEL

function displayVids(movies) {
	const html = movies
		.map(video => {
			return `
    <div class="swiper-slide hover:scale-90  drop-shadow-md filter duration-200 ">
      <div class="group relative">
        <img loading="lazy" src="${IMAGE_URL}${video.backdrop_path}" alt="${
				video.title
			}" class="group-hover:grayscale z-10 hover:cursor-pointer hover:shadow-lg border-2 border-purple-500" data-id=${
				video.id
			} id="clickedmovie">
        </img>
        <i class="fas fa-play text-white text-3xl absolute pb-5 z-30 bottom-2/4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 group-hover:text-purple-400 group-hover:scale-150 duration-200"></i>
        </div>
        <p class="flex font-bold text-white text-md pb-5 h-full">${
					video.title || video.name
				}</p>
      </div>

    `;
		})
		.join("");

	trailerContainer.insertAdjacentHTML("beforeend", html);
	swiper3.update();
}
