const apiKey = "1f4df7f17529b542876a985507f244b0";

export function getMovieTrailer(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);
}

export function getMovieInfo(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}

export function getActorInfo(personId) {
  return fetch(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}

export function getMovieCast(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}

export async function fetchPeople() {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

let filterArg = ["day"];
export async function fetchTrends(filter) {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/trending/all/${filterArg}?api_key=${apiKey}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMovies(searchQuery, page) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${page}`
  );
  let data = await response.json();

  return data;
}

export async function fetchPopularShows() {
  let response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
  );

  let data = await response.json();
  return data;
}

export async function fetchUpcomingMoviesPage() {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );
  let data = await response.json();
  return data;
}
