function addToCart(ID_cart) {
/**
 * Adds a game to the cart and updates the cart count.
 * @param {string} ID_cart - The ID of the cart element to add the game to.
 * @returns {void}
 */
  // Get the game title from the specified game ID
  const gameTitle = document.querySelector('#' + ID_cart.replace("_cart", "") + ' h3').innerHTML;

  // Check if the game title already exists in the cart contents array
  let cartContents = JSON.parse(localStorage.getItem('Kart'));
  if (!Array.isArray(cartContents)) {
    cartContents = [];
  }
  if (cartContents.includes(gameTitle)) {
    // If the game title already exists, show a toast message to inform the user
    var toastElList = document.querySelectorAll('.toast');
    var toastEl = toastElList[0];
    var toast = new bootstrap.Toast(toastEl, { autohide: true });
    toast.show();
    return;
  }

  // Create a new list item element and set its data-title attribute to the game title
  var listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  listItem.classList.add('list-group-item-action');
  listItem.dataset.title = gameTitle;

  // Create a remove button element and append it to the list item
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn');
  removeButton.classList.add('btn-sm');
  removeButton.classList.add('btn-danger');
  removeButton.classList.add('float-end');
  removeButton.innerHTML = '<i class="bi bi-trash3"></i>';
  listItem.onclick = () => removeFromCart(gameTitle);
  listItem.appendChild(removeButton);

  // Add the game title to the list item
  listItem.innerHTML += gameTitle;

  // Select the cart contents element and append the new list item to it
  const cartContentsElement = document.querySelector('#cartContents');
  if (cartContentsElement !== null) {
    cartContentsElement.appendChild(listItem);

    // Show a toast notification
    var toastElList = document.querySelectorAll('.toast');
    var toastEl = toastElList[0];
    var toast = new bootstrap.Toast(toastEl, { autohide: true });
    toast.show();

    // Update the cart contents array and save it to local storage
    cartContents.push(gameTitle);
    localStorage.setItem('Kart', JSON.stringify(cartContents));
    console.log('Kart: ' + localStorage.getItem('Kart'));
  } else {
    console.log('cartContents is null');
  }

  // Update the cart count element
  const itemCount = document.querySelector('#itemCount');
  itemCount.innerHTML = cartContents.length;
}

function initializeCartList() {
/**
 * Initializes the cart list by populating it with items from local storage.
 * @returns {void}
 */
 const cart = document.querySelector('#cartContents');
 const itemCount = document.querySelector('#itemCount');
 let  cartContents = JSON.parse(localStorage.getItem('Kart')) ?? [];
  cartContents.forEach((item) => {
    var listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.classList.add('list-group-item-action');
    listItem.innerHTML = item;
    cart.appendChild(listItem);
  });
  itemCount.innerHTML = cartContents.length;
}

function trashCart() {
/**
 * Empties the cart and removes all items from local storage.
 * @returns {void}
 */
  const itemCount = document.querySelector('#itemCount');
  const cart = document.querySelector('#cartContents');
  cart.innerHTML = '';
  localStorage.removeItem('Kart');
  itemCount.innerHTML = 0;
}

function removeFromCart(gameTitle) {
/**
 * Removes a specific game from the cart and updates the cart count.
 * @param {string} gameTitle - The title of the game to remove.
 * @returns {void}
 */
  const itemCount = document.querySelector('#itemCount');
  console.log('Removing ' + gameTitle + ' from cart')
  const cart = document.querySelector('#cartContents');
  const itemToRemove = Array.from(cart.children).find(item => item.dataset.title === gameTitle);
  if (itemToRemove) {
    const removeButton = itemToRemove.querySelector('button');
    cart.removeChild(itemToRemove);
    removeButton.remove();
    let kartContents = JSON.parse(localStorage.getItem('Kart'));
    kartContents = kartContents.filter((item) => item !== gameTitle);
    localStorage.setItem('Kart', JSON.stringify(kartContents));
  }
  itemCount.innerHTML = cart.children.length;
}

initializeCartList();