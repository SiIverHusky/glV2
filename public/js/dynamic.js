function generateGameCards(gamesData) {
  /**
   * Generates game cards and modals based on the provided games data.
   * @param {Object} gamesData - An object containing game data.
   * @returns {void}
   **/
    const gamesContainer = document.getElementById('games-container');
    const modalsContainer = document.getElementById('modals-container');
  
    Object.values(gamesData).forEach(game => {
      // Create the game card element
      const gameCard = document.createElement('div');
      gameCard.classList.add('col');
      gameCard.innerHTML = `
        <div id="game_${game.id}" class="card m-2">
            <img class="card-img-top" src="${game.image}" alt="${game.name}">
            <div class="card-body">
                <h3 class="card-title fw-bold text-uppercase">${game.name}</h3>
                <p class="card-text">${game.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <button type="button" id="game_${game.id}" class="btn btn-sm btn-outline-secondary flex-grow-1" data-bs-toggle="modal" data-bs-target="#game_${game.id}_details_window"><i class="bi bi-info-circle"></i> View Details</button>
                    <button type="button" id="game_${game.id}_cart" class="btn btn-sm btn-outline-success flex-grow-1" onclick="addToCart(this.id)"><i class="bi bi-bag-plus"></i> Add to cart</button>
                </div>
            </div>
        </div>
      `;
      gamesContainer.appendChild(gameCard);
  
      // Create the game modal element
      const gameModal = document.createElement('div');
      gameModal.classList.add('modal', 'fade');
      gameModal.id = `game_${game.id}_details_window`;
      gameModal.innerHTML = `
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h1 class="modal-title fs-5 fw-bold text-uppercase" id="game_${game.id}_details_window_label">${game.name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="ratio ratio-16x9">
                <iframe loading="lazy" width="560" height="315" src="${game.video}" title="${game.name} Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>
                </div>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre</strong>: ${game.genres}</li>
                    <li class="list-group-item"><strong>Developer</strong>: ${game.developer}</li>
                    <li class="list-group-item"><strong>Publisher</strong>: ${game.publisher}</li>
                    <li class="list-group-item"><strong>Release Date</strong> ${game.release_date}</li>
                    <li class="list-group-item"><strong>Metacritic Rating</strong>: ${game.rating}</li>
                    <li class="list-group-item text-capitalize"><strong>Platform</strong>: ${game.platforms}</li>
                    <li class="list-group-item"><strong>Language</strong>: ${game.language}</li>
                </ul>
            </div>
          </div>
        </div>
      `;
      modalsContainer.appendChild(gameModal);
    });
  }
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../js/steam.json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      const gamesData = JSON.parse(xhr.responseText);
      // Call a function to generate the game cards and modals using the data
      generateGameCards(gamesData);
    } else {
      console.log('Error loading games data');
    }
  };
  xhr.send();