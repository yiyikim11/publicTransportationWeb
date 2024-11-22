// search function
function filterBuses() {
  const searchInput = document.getElementById('search-bar').value.toLowerCase();
  const busRoutes = document.querySelectorAll('.bus');

  // Temporarily make all bus routes visible
  busRoutes.forEach(route => {
      route.style.display = 'block';
  });

  // Perform the search
  busRoutes.forEach(route => {
      const routeText = route.getAttribute('data-route').toLowerCase();
      if (routeText.includes(searchInput)) {
          route.style.display = 'block';
      } else {
          route.style.display = 'none';
      }
  });



  // Restore original display state based on search results
  busRoutes.forEach(route => {
      const isNoShowBus = route.classList.contains('no-show-bus');
      const matchesSearch = route.style.display === 'block';

      if (isNoShowBus && !matchesSearch) {
          route.style.display = 'none';
      } else if (isNoShowBus && matchesSearch) {
          route.style.display = 'block';
      } else if (!isNoShowBus && !matchesSearch) {
          route.style.display = 'none';
      }
  });
}




// see more button function
function more_bus() {
  const hiddenBuses = document.querySelectorAll('.no-show-bus');
  const moreButton = document.getElementById('see-more');
  
  let anyHidden = false;
  hiddenBuses.forEach(bus => {
      if (bus.style.display === 'none') {
          bus.style.display = 'block';
          anyHidden = true;
      } else {
          bus.style.display = 'none';
      }
  });

  if (anyHidden) {
      moreButton.innerHTML = 'See Less';
      const newMoreButton = document.getElementById('new-see-more');
      newMoreButton.style.display = 'block';

  } else {
      moreButton.innerHTML = 'See More';
      const newMoreButton = document.getElementById('new-see-more');
      newMoreButton.style.display = 'none';
  }
}

function more_more_bus() {
  const hiddenBuses = document.querySelectorAll('.no-show-buss');
  const moreButton = document.getElementById('new-see-more');
  
  let anyHidden = false;
  hiddenBuses.forEach(bus => {
      if (bus.style.display === 'none') {
          bus.style.display = 'block';
          anyHidden = true;
      } else {
          bus.style.display = 'none';
      }
  });

  if (anyHidden) {
      moreButton.innerHTML = 'See Less';
      const oldMoreButton = document.getElementById('see-more');
      oldMoreButton.style.display = 'none';

  } else {
      moreButton.innerHTML = 'See More';
      const oldMoreButton = document.getElementById('see-more');
      oldMoreButton.style.display = 'block';

  }
}



// add to favourite
let favorites = [];  // empty array 

function addToFav(busElement) {
  const button = busElement.querySelector('.favorite-button');
  const favoriteIcon = button.querySelector('.favorite-icon');
  const addedIcon = button.querySelector('.added-icon');
  const favoriteText = button.querySelector('.favorite-text');
  const addedText = button.querySelector('.added-text');
  
  const busInfo = busElement.querySelector('.bus-text').innerHTML;

  // main character
  const busId = busElement.getAttribute('data-route');
  // main character

  // get the style
  const busStyle = window.getComputedStyle(busElement);
  const busTextStyle = window.getComputedStyle(busElement.querySelector('.bus-text'));



  if (favoriteIcon.style.display !== 'none') {

    // Check if bus is already in favorites, make changes in home page
    if (!favorites.some(fav => fav.id === busId)) {
      favoriteIcon.style.display = 'none';
      favoriteText.style.display = 'none';
      addedIcon.style.display = 'inline';
      addedText.style.display = 'inline';
      
      // Add to favorites, push to the empty array
      favorites.push({ 
        id: busId, 
        info: busInfo, 
        style: {
          // access the style through the above style variables
          background: busStyle.backgroundImage,
          backgroundColor: busStyle.backgroundColor,
          textColor: busTextStyle.color,
          textBackgroundColor: busTextStyle.backgroundColor
        }
      });
    }
  } else {

    // from function below
    removeFromFav(busId);
    // make change in homepage
    favoriteIcon.style.display = 'inline';
    favoriteText.style.display = 'inline';
    addedIcon.style.display = 'none';
    addedText.style.display = 'none';
  }
  
  // Save favorites to localStorage, from functioon below
  saveFavorites();
}


// remove from favourite / local storage
function removeFromFav(busId) {
  favorites = favorites.filter(fav => fav.id !== busId);
  saveFavorites();
  
  // Update main page if the removed bus is visible
  const busElement = document.querySelector(`.bus[data-route="${busId}"]`);
  if (busElement) {
    const button = busElement.querySelector('.favorite-button');
    const favoriteIcon = button.querySelector('.favorite-icon');
    const addedIcon = button.querySelector('.added-icon');
    const favoriteText = button.querySelector('.favorite-text');
    const addedText = button.querySelector('.added-text');
    
    favoriteIcon.style.display = 'inline';
    favoriteText.style.display = 'inline';
    addedIcon.style.display = 'none';
    addedText.style.display = 'none';
  }
}

// savefavourite to localstorage
function saveFavorites() {
  localStorage.setItem('busFavorites', JSON.stringify(favorites));
}



// favourite page
function viewFavorites() {

  // Create favorites page
  const favoritesPage = document.createElement('div');
  favoritesPage.id = 'favorites-page';

  // create the title and the cross icon
  favoritesPage.innerHTML = `
    <h2>Favorite Bus Lines</h2>
    <div id="favorites-list"></div>
    <button class="close-favorites" onclick="closeFavorites()">
      <i class="fas fa-times"></i>
    </button>
  `;
  document.body.appendChild(favoritesPage);
  

  // Populate favorites
  const favoritesList = document.getElementById('favorites-list'); // id got from above fav-page creation
  favorites.forEach(fav => {
    const busElement = document.createElement('div');
    busElement.className = 'bus';
    busElement.setAttribute('data-route', fav.id);
    busElement.style.backgroundImage = fav.style.background;
    busElement.style.backgroundColor = fav.style.backgroundColor;
    busElement.style.margin = '58px 0';

    const busTextElement = document.createElement('div');
    busTextElement.className = 'bus-text';
    busTextElement.innerHTML = fav.info;
    busTextElement.style.color = fav.style.textColor;
    busTextElement.style.backgroundColor = fav.style.textBackgroundColor;
    

    // Remove the "Add to Favourite" button
    const favoriteButton = busTextElement.querySelector('.more-bus-text');
    if (favoriteButton) {
      favoriteButton.remove();
    }

    busElement.appendChild(busTextElement);

    
    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove from Favorites';
    removeButton.className = 'remove-favorite';
    removeButton.onclick = () => {
      removeFromFav(fav.id); // remove from fav and update main page
      busElement.remove(); // remove the above div
    };
    busElement.appendChild(removeButton);
    
    favoritesList.appendChild(busElement);
  });
  
  favoritesPage.style.display = 'block';
}


// close favourite page
function closeFavorites() {
  const favoritesPage = document.getElementById('favorites-page');
  favoritesPage.remove();
}



// Load favorites from localStorage on page load
window.addEventListener('load', () => {
  const storedFavorites = localStorage.getItem('busFavorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
    
    // Update main page to reflect favorites
    favorites.forEach(fav => {
      const busElement = document.querySelector(`.bus[data-route="${fav.id}"]`);
      if (busElement) {
        const button = busElement.querySelector('.favorite-button');
        const favoriteIcon = button.querySelector('.favorite-icon');
        const addedIcon = button.querySelector('.added-icon');
        const favoriteText = button.querySelector('.favorite-text');
        const addedText = button.querySelector('.added-text');
        
        favoriteIcon.style.display = 'none';
        favoriteText.style.display = 'none';
        addedIcon.style.display = 'inline';
        addedText.style.display = 'inline';
      }
    });
  }
});