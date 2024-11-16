// Retrieve Favorite Movies from LocalStorage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteMoviesDiv = document.getElementById('favorite-movies');
    favoriteMoviesDiv.innerHTML = '';
  
    favorites.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'text-center');
      
      movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-72 object-cover rounded-lg">
        <h3 class="font-bold mt-4">${movie.title}</h3>
        <p>${movie.release_date}</p>
        <textarea class="w-full mt-4 p-2 border rounded-lg" rows="4" placeholder="Add your notes...">${movie.notes || ''}</textarea>
        <button class="bg-blue-500 text-white p-2 rounded-lg mt-4" data-id="${movie.id}">Save Notes</button>
      `;
  
      // Save Notes Button
      movieCard.querySelector('button').addEventListener('click', () => saveNotes(movie));
  
      favoriteMoviesDiv.appendChild(movieCard);
    });
  }
  
  // Save Notes to LocalStorage
  function saveNotes(movie) {
    const notesTextarea = event.target.previousElementSibling;
    movie.notes = notesTextarea.value;
  
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movieIndex = favorites.findIndex(fav => fav.id === movie.id);
    if (movieIndex >= 0) {
      favorites[movieIndex] = movie;
    }
  
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Notes saved!');
  }
  
  // Load favorite movies on page load
  window.onload = loadFavorites;
  