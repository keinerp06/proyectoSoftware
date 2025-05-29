<template>
  <div class="container">
    <div class="categories">
      <div 
        class="category" 
        v-for="cat in categories" 
        :key="cat"
        :class="{ active: selectedCategory === cat }"
        @click="filterByCategory(cat)"
      >
        {{ cat }}
      </div>
    </div>

    <div class="main-content">
      <div class="products-section">
        <div class="products-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product">
            <div class="product-image">
              <img :src="product.imagen" alt="" @click="openModal(product)" />
            </div>
            <div class="product-info">
              <div class="product-details">
                <div class="product-name">{{ product.nombre }}</div>

                <div>Cop {{pesoCol(product.costo)}}</div>
              </div>
              <ButtonUno
                class="buy-button"
                @click="addToCart(product)"
                severity="contrast"
                icon="pi pi-shopping-cart"
              >
              </ButtonUno>
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
            <div class="cart-image">
              <img :src="item.imagen" alt="" class="imagen" />
            </div>
            <div class="cart-details">
              <div>{{ item.name }}</div>
              <div>Cop {{ pesoCol(item.price)}}</div>
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

        
        <ButtonUno
          class="checkout-button"
          severity="contrast"
          label="Pagar "
          @click="checkout"
          raised
        >
        </ButtonUno>
      </div>
    </div>

    <!-- Modal del Producto -->
    <div class="modal" v-if="selectedProduct" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">&times;</span>
        <div class="modal-image">
          <img :src="selectedProduct.imagen" :alt="selectedProduct.nombre" />
        </div>
        <div class="modal-details">
          <h2>{{ selectedProduct.nombre }}</h2>
          <p class="description">{{ selectedProduct.descripcion }}</p>
          <p class="price">{{ pesoCol(selectedProduct.costo )}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import axios from "axios";

const categories = ["All", "wiskhy", "Aguardiente", "Vino", "Cerveza", "Ron"];
const products = ref([]);
const selectedCategory = ref(null);

// Productos filtrados por categoría
const filteredProducts = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === "All") return products.value;
  return products.value.filter(product => product.tipo.nombre.toLowerCase() === selectedCategory.value.toLowerCase());
});

// Función para filtrar por categoría
const filterByCategory = (category) => {
  selectedCategory.value = selectedCategory.value === category ? null : category;
};

const loading = ref(false);
const error = ref(null);

const cart = reactive({
  items: {},
  subtotal: 0,
  total: 0,
});

const notification = ref("");
const notificationVisible = ref(false);

const showNotification = (msg) => {
  notification.value = msg;
  notificationVisible.value = true;
  setTimeout(() => {
    notificationVisible.value = false;
  }, 2000);
};

const addToCart = async (product) => {
  try {
    // Verificar stock antes de agregar al carrito
    const response = await axios.get(
      `http://localhost:3000/producto/${product.id}`
    );
    const currentProduct = response.data;

    if (currentProduct.stock <= 0) {
      alert("Producto sin stock disponible");
      return;
    }

    if (cart.items[product.id]) {
      if (cart.items[product.id].quantity < currentProduct.stock) {
        cart.items[product.id].quantity++;
      } else {
        alert("Stock máximo alcanzado");
        return;
      }
    } else {
      cart.items[product.id] = {
        id: product.id,
        name: product.nombre,
        price: product.costo,
        imagen: product.imagen,
        quantity: 1,
        stock: currentProduct.stock,
      };
    }
    calculateTotals();
    showNotification(`${product.nombre} añadido al carrito`);
  } catch (error) {
    console.error("Error al verificar stock:", error);
    showNotification("Error al agregar al carrito");
  }
};

const changeQuantity = async (productId, action) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/producto/${productId}`
    );
    const currentProduct = response.data;

    if (action === "increase") {
      if (cart.items[productId].quantity < currentProduct.stock) {
        cart.items[productId].quantity++;
      } else {
        showNotification("Stock máximo alcanzado");
        return;
      }
    } else if (action === "decrease") {
      if (cart.items[productId].quantity > 1) {
        cart.items[productId].quantity--;
      } else {
        delete cart.items[productId];
      }
    }
    calculateTotals();
  } catch (error) {
    console.error("Error al actualizar cantidad:", error);
    showNotification("Error al actualizar cantidad");
  }
};

const calculateTotals = () => {
  let subtotal = 0;
  Object.values(cart.items).forEach((item) => {
    subtotal += item.price * item.quantity;
  });
  cart.subtotal = subtotal;
  cart.total = subtotal;
};

const checkout = async () => {
  if (Object.keys(cart.items).length === 0) {
    alert("El carrito está vacío");
    return;
  }

  try {
  
    // Actualizar el stock de cada producto
    for (const item of Object.values(cart.items)) {
      await axios.put(`http://localhost:3000/producto/${item.id}`, {
        stock: item.stock - item.quantity
      });
    }

    alert(`Venta procesada por un total de $${cart.total}`);
    cart.items = {};
    calculateTotals();
    getAllProductos(); // Actualizar la lista de productos
  } catch (error) {
    console.error("Error al procesar la venta:", error);
    showNotification("Error al procesar la venta");
  }
};

const getAllProductos = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get("http://localhost:3000/producto");
    products.value = response.data;
  } catch (err) {
    console.error("Error al cargar productos:", err);
    error.value = "Error al cargar los productos";
    showNotification("Error al cargar los productos");
  } finally {
    loading.value = false;
  }
};
const pesoCol = (number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(number);
};

onMounted(() => {
  getAllProductos();
});
const selectedProduct = ref(null);

const openModal = (product) => {
  selectedProduct.value = product;
};

const closeModal = () => {
  selectedProduct.value = null;
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
  color: var(--text-primary);
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
}

/* Contenedor principal */
.container {
  max-width: 1400px;
  margin: 0 auto;
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-medium);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

/* Categorías */
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  background: var(--card-background);
  border-bottom: 1px solid var(--border-color);
}

.category {
  padding: 8px 16px;
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.category::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.05),
    transparent
  );
  transition: left 0.3s;
}

.category:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
  border-color: var(--primary-color);
}

.category:hover::before {
  left: 100%;
}

.category.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Contenido principal */
.main-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 0;
  min-height: 600px;
}

/* Grilla de productos */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  padding: 30px;
  max-height: 80vh;
  overflow-y: auto;
  background: var(--background-color);
}

/* Scrollbar personalizado */
.products-grid::-webkit-scrollbar {
  width: 8px;
}

.products-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.products-grid::-webkit-scrollbar-thumb {
  background: var(--secondary-color);
  border-radius: 10px;
}

.products-grid::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

/* Tarjetas de productos */
.product {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--shadow-light);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  height: 320px;
  position: relative;
  overflow: hidden;
}

.product::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(52, 152, 219, 0.05));
  opacity: 0;
  transition: var(--transition);
}

.product:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-heavy);
}

.product:hover::before {
  opacity: 1;
}

.product-image {
  height: 200px;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.product-image::before {
  content: "📦";
  font-size: 3rem;
  opacity: 0.3;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  transition: var(--transition);
}

.product:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
}

.product-details {
  flex: 1;
}

.product-details h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
  line-height: 1.3;
}

.product-details .price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent-color);
}

.buy-button {
  background: linear-gradient(135deg, var(--accent-color), black);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.85rem;
}

.buy-button:hover {
  background: linear-gradient(135deg, black, black);
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}

.buy-button:active {
  transform: translateY(0);
}

/* Productos vacíos */
.empty-product {
  background: var(--card-background);
  border-radius: var(--border-radius);
  height: 320px;
  border: 2px dashed var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-style: italic;
}

/* Carrito de compras */
.cart {
  background: linear-gradient(180deg, var(--primary-color), #34495e);
  color: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: 600px;
}

.cart h2 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.5rem;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.cart-items {
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.cart-items::-webkit-scrollbar {
  width: 6px;
}

.cart-items::-webkit-scrollbar-track {
  background-color: #1a1a1a;
  border-radius: 10px;
}

.cart-items::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  transition: var(--transition);
  backdrop-filter: blur(10px);
}

.cart-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.cart-image,
.imagen {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.cart-details {
  flex-grow: 1;
  margin-right: 15px;
}

.cart-details h4 {
  font-size: 0.9rem;
  margin-bottom: 5px;
  line-height: 1.3;
}

.cart-details .item-price {
  font-weight: 600;
  color: black;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-button {
  width: 25px;
  height: 25px;
  background: var(--accent-color);
  color: black;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  transition: var(--transition);
  font-size: 0.9rem;
}

.quantity-button:hover {
  background: white;
  transform: scale(1.1);
}

.quantity {
  min-width: 25px;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
}

/* Totales */
.totals {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
}

.subtotal,
.total {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.952);
  backdrop-filter: blur(10px);
}

.total {
  background: rgb(0, 0, 0);
  font-weight: 700;
  font-size: 1.1rem;
}

.checkout-button {
  width: 100%;
  background: linear-gradient(135deg, var(--success-color), #2ecc71);
  color: black;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: var(--transition);
  margin-top: 15px;
}

.checkout-button:hover {
  color: white;
  background: black; 
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}



/* Estados de carga */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Modo oscuro */
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #2c3e50;
    --card-background: #34495e;
    --text-primary: #ecf0f1;
    --text-secondary: #bdc3c7;
    --border-color: #7f8c8d;
  }

  body {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  }
}

/* Estados de focus para accesibilidad */
.category:focus,
.buy-button:focus,
.quantity-button:focus,
.checkout-button:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

/* Animaciones adicionales */
.product-details h3 {
  transition: var(--transition);
}

.product:hover .product-details h3 {
  color: var(--secondary-color);
}

/* Estados disabled */
.buy-button:disabled,
.checkout-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.buy-button:disabled:hover,
.checkout-button:disabled:hover {
  background: var(--accent-color);
  transform: none;
}
/* Estilos del Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: black;
}

.modal-image {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.modal-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-details h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.modal-details .description {
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.modal-details .price {
  font-size: 20px;
  font-weight: bold;
  color: black;
}
</style>



