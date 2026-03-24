document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "spicefood", price: 50.99 },
    { id: 2, name: "simplefood", price: 20.99 },
    { id: 3, name: "specialfood", price: 70.99 },
  ];

  let saveCart = [];
  const productList = document.getElementById("product-list");
  const cardItems = document.getElementById("cart-items");
  const emptyCard = document.getElementById("empty-cart");
  const cardTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(1)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    saveCart.push(product);
    addranderTask(saveCart);
  }

  function addranderTask() {
    cardItems.innerText = "";
    let totalPriceMsg = 0;

    if (saveCart.length > 0) {
      emptyCard.classList.add("hidden");
      cardTotal.classList.remove("hidden");
      saveCart.forEach((item, index) => {
        totalPriceMsg += item.price;
        const cardItem = document.createElement("div");
        cardItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(1)}
        <button class="remove-btn" data-index=${index}>X</button>
        `;
        cardItems.appendChild(cardItem);
        totalPrice.textContent = `${totalPriceMsg.toFixed(2)}`
      });
    } else {
      emptyCard.classList.remove("hidden");
      totalPrice.textContent = `$0.00`;
    }
    localStorage.setItem('cart',JSON.stringify(saveCart))
  }

  checkOutBtn.addEventListener('click', () =>{
    saveCart.length = 0
    alert('Check out Successfully')
    addranderTask()
  })
});
