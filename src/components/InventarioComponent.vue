<template>
  <div class="header">
    <h1 class="h1">Inventario</h1>
    <ButtonUno
      severity="contrast"
      style="position: absolute; bottom: 2rem; left: 6rem; font-size: 20px"
      @click="Agregar()"
    >
      Agregar Producto</ButtonUno
    >
  </div>

  <div class="container">
    <!-- First Row -->
    <div class="card" v-for="produc in productos" :key="produc.id">
      <div class="card-image">
        <img :src="produc.imagen" alt="Whisky" />
      </div>
      <div class="card-content">
        <div class="card-title">{{ produc.nombre }}</div>
        <div class="card-price">{{ pesoCol(produc.costo) }}</div>
        <div class="card-stock">{{ produc.stock }} existencias</div>
      </div>
      <div class="card-actions">
        <div class="action-button">
          <ButtonUno
            severity="contrast"
            icon=" pi pi-pen-to-square"
            @click="AbrirModal(produc)"
          />
        </div>
        <div class="action-button">
          <ButtonUno
            severity="contrast"
            icon="pi pi-trash"
            @click="eliminarProducto(produc.id)"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Edición -->
  <div class="modal" v-if="abierto">
    <div class="modal-content">
      <h2>Editar Producto</h2>
      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="productoEditando.nombre" type="text" class="input" />
      </div>
      <div class="form-group">
        <label>Precio:</label>
        <input
          v-model="productoEditando.costo"
          type="number"
          step="0.01"
          class="input"
        />
      </div>
      <div class="form-group">
        <label>Descripción:</label>
        <input
          v-model="productoEditando.descripcion"
          type="text"
          class="input"
        />
      </div>
      <div class="form-group">
        <label>Imagen URL:</label>
        <input v-model="productoEditando.imagen" type="text" class="input" />
      </div>
      <div class="form-group">
        <label>Stock:</label>
        <input v-model="productoEditando.stock" type="number" class="input" />
      </div>

      <div class="modal-buttons">
        <ButtonUno
          @click="guardarCambios"
          severity="contrast"
          label="Guardar"
        />
        <ButtonUno @click="CerrarModal" severity="contrast" label="Cancelar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InventarioComponent",

  data() {
    return {
      productos: [],
      abierto: false,
      productoEditando: {
        id: null,
        nombre: "",
        costo: 0,
        descripcion: "",
        imagen: "",
        stock: 0,
        id_tipo: 1,
      },
    };
  },

  methods: {
    getAllProductos: async function () {
      let url = "http://localhost:3000/producto";
      let vue = this;
      await this.axios
        .get(url)
        .then(function (response) {
          console.log("ESTOS SON LOS DATOS");
          console.log(response.data);
          console.log("STATUS");
          console.log(response.status);
          vue.productos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          console.log("Proceso terminado");
        });
    },
    pesoCol: function (number) {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COL",
        minimumFractionDigits: 0,
      }).format(number);
    },

    Agregar: function () {
      this.$router.push({ name: "agregar" });
    },
    AbrirModal: function (producto) {
      this.productoEditando = { ...producto };
      this.abierto = true;
    },

    CerrarModal: function () {
      this.abierto = false;
      this.productoEditando = {
        id: null,
        nombre: "",
        costo: 0,
        descripcion: "",
        imagen: "",
        stock: 0,
        id_tipo: 1,
      };
    },
    async guardarCambios() {
      try {
        const response = await this.axios.put(
          `http://localhost:3000/producto/${this.productoEditando.id}`,
          this.productoEditando
        );

        if (response.status === 200) {
          alert("Producto actualizado correctamente");
          this.CerrarModal();
          await this.getAllProductos();
        }
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
        alert(
          "Error al actualizar el producto: " +
            (error.response?.data || error.message)
        );
      }
    },

    eliminarProducto: async function (id) {
      if (confirm("¿Está seguro de que desea eliminar este producto?")) {
        try {
          const response = await this.axios.delete(
            `http://localhost:3000/producto/eliminar/${id}`
          );
          if (response.status === 200) {
            alert("Producto eliminado correctamente");
            // Actualizar la lista de productos
            await this.getAllProductos();
          } else {
            alert("Error al eliminar el producto");
          }
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          alert(
            "Error al eliminar el producto: " +
              (error.response?.data || error.message)
          );
        }
      }
    },
  },
  created: function () {
    this.getAllProductos();
  },
};
</script>

<style scoped>
 * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            min-height: 100vh;
            overflow-x: hidden;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .header {
            position: relative;
            top: 6rem;
            text-align: center;
            color: white;
            padding: 2rem 0;
            z-index: 2;
        }

        h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 8px 32px rgba(0,0,0,0.3);
            margin-bottom: 1rem;
            letter-spacing: -2px;
        }

        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            font-weight: 300;
            margin-bottom: 2rem;
        }

        .search-bar {
            width: 100%;
            max-width: 500px;
            margin: 0 auto 2rem auto;
            position: relative;
            top: 6rem;
        }

        .search-input {
            width: 100%;
            padding: 20px 60px 20px 25px;
            border: none;
            border-radius: 30px;
            font-size: 16px;
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .search-input::placeholder {
            color: rgba(255,255,255,0.7);
        }

        .search-input:focus {
            outline: none;
            background: rgba(255,255,255,0.25);
            border-color: rgba(255,255,255,0.4);
            transform: translateY(-2px);
            box-shadow: 0 16px 64px rgba(0,0,0,0.2);
        }

        .search-icon {
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255,255,255,0.8);
            font-size: 20px;
        }

        .stats-bar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 25px;
            margin: 0 auto 3rem auto;
            position: relative;
            top: 6rem;
            max-width: 1200px;
            padding: 0 2rem;
        }

        .stat-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 30px 25px;
            text-align: center;
            color: white;
            border: 1px solid rgba(255,255,255,0.2);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: all 0.6s;
        }

        .stat-card:hover::before {
            left: 100%;
        }

        .stat-card:hover {
            transform: translateY(-8px) scale(1.02);
            background: rgba(255,255,255,0.15);
            border-color: rgba(255,255,255,0.3);
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .stat-number {
            font-size: 2.8rem;
            font-weight: 800;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .stat-label {
            font-size: 1rem;
            opacity: 0.9;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .filters {
            display: flex;
            gap: 15px;
            margin-bottom: 3rem;
            flex-wrap: wrap;
            justify-content: center;
            position: relative;
            top: 6rem;
            padding: 0 2rem;
        }

        .filter-btn {
            padding: 15px 30px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 50px;
            color: white;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(20px);
            font-weight: 500;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
        }

        .filter-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: all 0.6s;
        }

        .filter-btn:hover::before,
        .filter-btn.active::before {
            left: 100%;
        }

        .filter-btn:hover, 
        .filter-btn.active {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.4);
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }

        .container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            width: 100%;
            gap: 30px;
            padding: 8rem 3rem 4rem 3rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .card {
            height: 180px;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid rgba(255,255,255,0.2);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }

 

        .card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 80px rgba(0,0,0,0.2);
            background: rgba(255,255,255,0.98);
        }

        .card-image {
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 30px 0 30px 30px;
            border-radius: 20px;
            transition: all 0.4s ease;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .card:hover .card-image {
            transform: scale(1.05) rotate(2deg);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }

        .card-image img {
            max-width: 80px;
            max-height: 80px;
            border-radius: 12px;
        }

        .card-content {
            flex-grow: 1;
            padding: 30px 20px;
        }

        .card-title {
            font-weight: 700;
            margin-bottom: 8px;
            color: #2c3e50;
            font-size: 1.3rem;
            line-height: 1.3;
        }

        .card-price {
            font-weight: 800;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.4rem;
        }

        .card-stock {
            font-size: 14px;
            color: #7f8c8d;
            font-weight: 500;
        }

        .card-actions {
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .action-button {
            width: 45px;
            height: 45px;
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.3);
        }

        .action-button:hover {
            transform: scale(1.1) translateY(-2px);
        }

        .action-button.edit {
            background: linear-gradient(135deg, #3498db, #2980b9);
            box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
        }

        .action-button.edit:hover {
            box-shadow: 0 12px 40px rgba(52, 152, 219, 0.4);
        }

        .action-button.delete {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
        }

        .action-button.delete:hover {
            box-shadow: 0 12px 40px rgba(231, 76, 60, 0.4);
        }

        .action-button svg {
            width: 20px;
            height: 20px;
            fill: white;
        }

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            animation: modalFadeIn 0.4s ease-out forwards;
        }

        @keyframes modalFadeIn {
            to {
                opacity: 1;
            }
        }

        .modal-content {
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(20px);
            padding: 40px;
            border-radius: 24px;
            width: 90%;
            max-width: 500px;
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 25px 80px rgba(0,0,0,0.3);
            transform: scale(0.9) translateY(20px);
            animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes modalSlideIn {
            to {
                transform: scale(1) translateY(0);
            }
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .form-group input {
            width: 100%;
            padding: 15px 20px;
            border: 2px solid rgba(52, 152, 219, 0.1);
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(255,255,255,0.8);
            font-weight: 500;
        }

        .form-group input:focus {
            outline: none;
            border-color: #3498db;
            background: rgba(255,255,255,1);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(52, 152, 219, 0.2);
        }

        .modal-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            margin-top: 30px;
        }

        .modal-btn {
            padding: 15px 30px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modal-btn.cancel {
            background: linear-gradient(135deg, #95a5a6, #7f8c8d);
            color: white;
        }

        .modal-btn.cancel:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(149, 165, 166, 0.3);
        }

        .modal-btn.save {
            background: linear-gradient(135deg, #27ae60, #229954);
            color: white;
        }

        .modal-btn.save:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
        }

        .fade-in {
            animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

       

        /* Floating particles animation */
        .particle {
            position: absolute;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            pointer-events: none;
            animation: float 15s infinite ease-in-out;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
</style>