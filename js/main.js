function addToCart(ID_cart) {
  var ID = ID_cart.replace("_cart", "");
  // Select the h3 element with the specified gameID and get its innerHTML
  const gameTitle = document.querySelector('#' + ID + ' h3').innerHTML;

  // Create a new list item element and set its innerHTML to the game title
  var listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  listItem.classList.add('list-group-item-action');
  listItem.innerHTML = gameTitle;

  // Select the cart contents element and append the new list item to it
  const cartContents = document.querySelector('#cartContents');
  let kartContents = JSON.parse(localStorage.getItem('Kart'));
  if (!Array.isArray(kartContents)) {
    kartContents = [];
  }
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
}

function initializeCartList() {
 const cart = document.querySelector('#cartContents');
 let  cartContents = JSON.parse(localStorage.getItem('Kart')) ?? [];
  cartContents.forEach((item) => {
    var listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.classList.add('list-group-item-action');
    listItem.innerHTML = item;
    cart.appendChild(listItem);
  });
}

initializeCartList();