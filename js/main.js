// API key for TMDB API
const API_KEY = '6c3d8a34cebc413157a4082449463e55';
const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=en-US&page=1';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=';

// Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieList = document.getElementById('movie-list');

// Fetch Popular Movies
async function fetchPopularMovies() {
  const response = await fetch(API_URL);
  const data = await response.json();
  displayMovies(data.results);
}

// Display Movies on Homepage
function displayMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'text-center');

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-72 object-cover rounded-lg">
      <h3 class="font-bold mt-4">${movie.title}</h3>
      <p>${movie.release_date}</p>
      <button class="bg-blue-500 text-white p-2 rounded-lg mt-4" data-id="${movie.id}">Add to Favorites</button>
    `;
    
    movieCard.querySelector('button').addEventListener('click', () => addToFavorites(movie));
    
    movieList.appendChild(movieCard);
  });
}

// Add Movie to Favorites
function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert(`${movie.title} added to your favorites!`);
}

// Search Movies
searchButton.addEventListener('click', async () => {
  const query = searchInput.value;
  if (query) {
    const response = await fetch(SEARCH_URL + query);
    const data = await response.json();
    displayMovies(data.results);
  }
});

// Initial Fetch on Page Load
fetchPopularMovies();
