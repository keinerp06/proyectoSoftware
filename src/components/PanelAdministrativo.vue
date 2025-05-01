<template>
  <div><title>Panel de Administración</title></div>

  <div class="container">
    <div class="header">
      <h1>Panel de Administración</h1>
      <p>Selecciona una opción para continuar</p>
    </div>

    <div class="dashboard-grid">
      <a href="/Venta" class="dashboard-card">
        <div class="card-pattern"></div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon icon-sales"></div>
          <h2 class="card-title">VENTANA VENTAS</h2>
        </div>
      </a>

      <a href="#crear" class="dashboard-card">
        <div class="card-pattern"></div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon icon-create"></div>
          <h2 class="card-title">VENTANA CREAR O ELIMINAR</h2>
        </div>
      </a>

      <a href="#inventario" class="dashboard-card">
        <div class="card-pattern"></div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon icon-inventory"></div>
          <h2 class="card-title">VENTANA INVENTARIO</h2>
        </div>
      </a>

      <a href="#inicio" class="dashboard-card">
        <div class="card-pattern"></div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon icon-home"></div>
          <h2 class="card-title">VENTANA INICIAL</h2>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PanelAdm'
};
document.querySelectorAll(".dashboard-card").forEach((card) => {
  card.addEventListener("click", function () {
    // Añadir efecto de pulsación
    this.style.transform = "scale(0.98)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-top: 20px;
}

.dashboard-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  height: 200px;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.card-icon {
  font-size: 40px;
  margin-bottom: 15px;
  color: #444;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  z-index: 1;
}

.card-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  background-image: linear-gradient(45deg, #000 25%, transparent 25%),
    linear-gradient(-45deg, #000 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #000 75%),
    linear-gradient(-45deg, transparent 75%, #000 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.header p {
  color: #666;
  font-size: 16px;
}

/* Iconos utilizando caracteres */
.icon-sales::before {
  content: "💰";
}

.icon-create::before {
  content: "✏️";
}

.icon-inventory::before {
  content: "📦";
}

.icon-home::before {
  content: "🏠";
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>