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
        <div class="card-price">{{pesoCol(produc.costo)}}</div>
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
.header {
  position: relative;
  top: 10rem;
  border-bottom: 1px solid white;
  z-index: 2;
}
h1 {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 23rem;
  bottom: 0px;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 2rem;
  padding: 12rem;
}

.card {
  height: 150px;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  min-height: 90px;
  display: flex;
  align-items: center;
}

.card-image {
  width: 90px;
  height: 90px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.card-image img {
  max-width: 70px;
  max-height: 70px;
}

.card-content {
  flex-grow: 1;
  background-color: white;
}

.card-title {
  font-weight: bold;
  margin-bottom: 5px;
  background-color: white;
}

.card-price {
  font-weight: bold;
  margin-bottom: 5px;
  background-color: white;
}

.card-stock {
  font-size: 14px;
  background-color: white;
}

.card-actions {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  display: flex;
  gap: 10px;
}

.action-button {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.action-button svg {
  width: 18px;
  height: 18px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>