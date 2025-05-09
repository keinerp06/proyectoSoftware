<template>
  <div class="container">
    <div class="search-bar">Search</div>

    <div class="categories">
      <div class="category" v-for="cat in categories" :key="cat">{{ cat }}</div>
    </div>

    <div class="main-content">
      <div class="products-section">
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product">
            <div class="product-image"><div>X</div></div>
            <div class="product-info">
              <div class="product-details">
                <div class="product-name">{{ product.name }}</div>
                <div class="product-description">{{ product.description }}</div>
                <div class="product-price">${{ product.price }}</div>
              </div>
              <button class="buy-button" @click="addToCart(product)">
                COMPRAR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart">
        <div class="cart-items">
          <div
            v-for="item in Object.values(cart.items)"
            :key="item.id"
            class="cart-item"
          >
            <div class="cart-image">X</div>
            <div class="cart-details">
              <div>{{ item.name }}</div>
              <div>$ {{ item.price }}</div>
            </div>
            <div class="quantity-control">
              <div
                class="quantity-button"
                @click="changeQuantity(item.id, 'decrease')"
              >
                -
              </div>
              <div class="quantity">{{ item.quantity }}</div>
              <div
                class="quantity-button"
                @click="changeQuantity(item.id, 'increase')"
              >
                +
              </div>
            </div>
          </div>
        </div>

        <div class="totals">
          <div class="subtotal">
            <div>SUB TOTAL</div>
            <div>{{ cart.subtotal }}</div>
          </div>
          <div class="total">
            <div>TOTAL</div>
            <div>{{ cart.total }}</div>
          </div>
        </div>

        <div class="checkout-button" @click="checkout">PAGAR</div>
      </div>
    </div>

    <div class="notification" v-show="notificationVisible">
      {{ notification }}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const categories = ["Whisky", "Ron", "Tequila", "Cerveza", "Aguardiente"];

const products = [
  { id: 1, name: "Whisky Premium", price: 120, description: "12 años" },
  { id: 2, name: "Ron Añejo", price: 95, description: "7 años" },
  { id: 3, name: "Tequila Reposado", price: 85, description: "100% Agave" },
];

const cart = reactive({
  items: {},
  subtotal: 0,
  total: 0,
});

const notification = ref("");
const notificationVisible = ref(false);

function showNotification(msg) {
  notification.value = msg;
  notificationVisible.value = true;
  setTimeout(() => (notificationVisible.value = false), 2000);
}

function addToCart(product) {
  if (cart.items[product.id]) {
    cart.items[product.id].quantity++;
  } else {
    cart.items[product.id] = {
      ...product,
      quantity: 1,
    };
  }
  calculateTotals();
  showNotification(`${product.name} añadido al carrito`);
}

function changeQuantity(productId, action) {
  const item = cart.items[productId];
  if (action === "increase") {
    item.quantity++;
  } else if (action === "decrease") {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      delete cart.items[productId];
    }
  }
  calculateTotals();
}

function calculateTotals() {
  let subtotal = 0;
  for (const item of Object.values(cart.items)) {
    subtotal += item.price * item.quantity;
  }
  cart.subtotal = subtotal;
  cart.total = subtotal; // Aquí puedes sumar impuestos u otros cargos
}

function checkout() {
  if (Object.keys(cart.items).length > 0) {
    alert(`Procesando pago por un total de ${cart.total}`);
    cart.items = {};
    calculateTotals();
  } else {
    alert("El carrito está vacío");
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f0f0f0;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #e6e6e6;
  padding: 20px;
}

.search-bar {
  background-color: #999;
  padding: 10px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
}

.categories {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
}

.category {
  padding: 5px 10px;
  cursor: pointer;
}

.category:hover {
  text-decoration: underline;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.product {
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 200px;
}

.product-image {
  height: 70%;
  background-color: #ddd;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
}

.product-info {
  display: flex;
  justify-content: space-between;
}

.product-details {
  display: flex;
  flex-direction: column;
}

.buy-button {
  background-color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;
  padding: 5px 0;
}

.empty-product {
  background-color: white;
  height: 200px;
}

.cart {
  background-color: white;
  padding: 20px;
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.cart-image {
  width: 50px;
  height: 50px;
  background-color: #ddd;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-details {
  flex-grow: 1;
}

.quantity-control {
  display: flex;
  gap: 10px;
  align-items: center;
}

.quantity-button {
  width: 20px;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
}

.quantity {
  display: inline-block;
  min-width: 20px;
  text-align: center;
}

.totals {
  margin-top: 20px;
}

.subtotal,
.total {
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 5px 10px;
  margin-bottom: 10px;
}

.checkout-button {
  display: block;
  background-color: #ddd;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  width: 50%;
  margin: 0 auto;
}

.main-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  display: none;
  z-index: 1000;
}
</style>