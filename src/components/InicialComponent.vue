<template>
  <div class="container">
    <div class="search-bar">Search</div>

    <div class="categories">
      <div class="category">Whisky</div>
      <div class="category">Ron</div>
      <div class="category">Tequila</div>
      <div class="category">Cerveza</div>
      <div class="category">Aguardiente</div>
    </div>

    <div class="main-content">
      <div class="products-section">
        <div class="products-grid">
          <div class="product">
            <div class="product-image">
              <div>X</div>
            </div>
            <div class="product-info">
              <div class="product-details">
                <div>nombre</div>
                <div>info</div>
                <div>valor</div>
              </div>
              <button class="buy-button">COMPRAR</button>
            </div>
          </div>

          <div class="product">
            <div class="product-image">
              <div>X</div>
            </div>
            <div class="product-info">
              <div class="product-details">
                <div>nombre</div>
                <div>info</div>
                <div>valor</div>
              </div>
              <button class="buy-button">COMPRAR</button>
            </div>
          </div>

          <div class="product">
            <div class="product-image">
              <div>X</div>
            </div>
            <div class="product-info">
              <div class="product-details">
                <div>nombre</div>
                <div>info</div>
                <div>valor</div>
              </div>
              <button class="buy-button">COMPRAR</button>
            </div>
          </div>

          <div class="empty-product"></div>
          <div class="empty-product"></div>
          <div class="empty-product"></div>
          <div class="empty-product"></div>
          <div class="empty-product"></div>
          <div class="empty-product"></div>
        </div>
      </div>

      <div class="cart">
        <div class="cart-items">
          <div class="cart-item">
            <div class="cart-image"></div>
            <div class="cart-details">
              <div>nombre</div>
              <div>$ valor</div>
            </div>
            <div class="quantity-control">
              <div class="quantity-button">-</div>
              <div class="quantity-button">+</div>
            </div>
          </div>

          <div class="cart-item">
            <div class="cart-image"></div>
            <div class="cart-details">
              <div>nombre</div>
              <div>$ valor</div>
            </div>
            <div class="quantity-control">
              <div class="quantity-button">-</div>
              <div class="quantity-button">+</div>
            </div>
          </div>

          <div class="cart-item">
            <div class="cart-image"></div>
            <div class="cart-details">
              <div>nombre</div>
              <div>$ valor</div>
            </div>
            <div class="quantity-control">
              <div class="quantity-button">-</div>
              <div class="quantity-button">+</div>
            </div>
          </div>

          <div class="cart-item">
            <div class="cart-image"></div>
            <div class="cart-details">
              <div>nombre</div>
              <div>$ valor</div>
            </div>
            <div class="quantity-control">
              <div class="quantity-button">-</div>
              <div class="quantity-button">+</div>
            </div>
          </div>
        </div>

        <div class="totals">
          <div class="subtotal">
            <div>SUB TOTAL</div>
            <div>$ VALOR</div>
          </div>

          <div class="total">
            <div>TOTAL</div>
            <div>$ VALOR</div>
          </div>
        </div>

        <div class="checkout-button">PAGAR</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
</style>