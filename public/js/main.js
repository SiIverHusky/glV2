function addToCart(ID_cart) {
  const itemCount = document.querySelector('#itemCount');
  var ID = ID_cart.replace("_cart", "");
  // Select the h3 element with the specified gameID and get its innerHTML
  const gameTitle = document.querySelector('#' + ID + ' h3').innerHTML;

  // Check if the game title already exists in the kartContents array
  let kartContents = JSON.parse(localStorage.getItem('Kart'));
  if (!Array.isArray(kartContents)) {
    kartContents = [];
  }
  if (kartContents.includes(gameTitle)) {
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
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn');
  removeButton.classList.add('btn-sm');
  removeButton.classList.add('btn-danger');
  removeButton.classList.add('float-end');
  removeButton.innerHTML = '<i class="bi bi-trash3"></i>';
  listItem.onclick = () => removeFromCart(gameTitle);
  listItem.appendChild(removeButton); // Append the button to the list item
  listItem.innerHTML += gameTitle; // Add the game title to the list item

  // Select the cart contents element and append the new list item to it
  const cartContents = document.querySelector('#cartContents');
  if (cartContents !== null) {
    cartContents.appendChild(listItem);
    // Show a toast notification
    var toastElList = document.querySelectorAll('.toast');
    var toastEl = toastElList[0];
    var toast = new bootstrap.Toast(toastEl, { autohide: true });
    toast.show();
    kartContents.push(gameTitle);
    localStorage.setItem('Kart', JSON.stringify(kartContents));
    console.log('Kart: ' + localStorage.getItem('Kart'));
  } else {
    console.log('cartContents is null');
  }
  itemCount.innerHTML = kartContents.length;
}

function initializeCartList() {
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
  const itemCount = document.querySelector('#itemCount');
  const cart = document.querySelector('#cartContents');
  cart.innerHTML = '';
  localStorage.removeItem('Kart');
  itemCount.innerHTML = 0;
}

function removeFromCart(gameTitle) {
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