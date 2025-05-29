<template>
  <div>
    <div class="container">
      <h1>Nuevo Producto</h1>

      <div class="form-group">
        <div class="input-group">
          <label class="label">Nombre del Producto</label>
          <input
            autocomplete="off"
            name="Email"
            id="Email"
            class="input"
            v-model="producto.nombre"
            type="email"
          />
          <div></div>
        </div>
      </div>
      <div class="form-group">
        <label for="precio">Precio</label>

        <input
          autocomplete="off"
          step="0.01"
          id="precio"
          class="input"
          v-model="producto.precio"
          type="number"
          placeholder="0.00"
        />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          class="description"
          v-model="producto.descripcion"
          placeholder="Describa el producto..."
        ></textarea>
      </div>
      <div class="form-group">
        <label for="disponibles">Ingrese la URL de la imagen</label>

        <input
          autocomplete="off"
          id="imagen"
          class="input"
          v-model="producto.imagen"
          type="text"
          placeholder="URL imagen "
        />
      </div>

      <div class="form-group">
        <label for="disponibles">Unidades Disponibles</label>

        <input
          autocomplete="off"
          min="0"
          id="disponibles"
          class="input"
          v-model="producto.disponibles"
          type="number"
          placeholder="0"
        />
      </div>
      <div class="form-group">
        <label for="categoria">Categoría</label>
        <input
          autocomplete="off"
          id="tipo"
          class="input"
          type="number"
          v-model="producto.categoria"
          placeholder="tipo de producto "
        />
      </div>

      <div class="buttons">
        <ButtonUno
          label="Guardar producto"
          iconPos="top"
          severity="contrast"
          style="
            position: relative;
            right: 14.5rem;
            width: 300px;
            font-weight: bold;
          "
          @click="guardarProducto()"
        />
      </div>
    </div>
  </div>
  <div class="card">
    <CardPrime>
  <template #title>Información</template>
  <template #content>
    <div
      class="m-2"
      style="
        padding: 10px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        width: fit-content;
      "
    >
      <p>Los tipos son:</p>
      <ol>
        <li>Whisky</li>
        <li>Aguardiente</li>
        <li>Vino</li>
        <li>Cerveza</li>
        <li>Ron</li>
      </ol>
    </div>
  </template>
</CardPrime>

  </div>
  <div class="regresar">
    <ButtonUno
      icon="pi pi-arrow-left"
      iconPos="top"
      severity="contrast"
      style="
        width: 3rem;
        height: 3rem;
        position: relative;
        bottom: 60em;
        left: 38.5rem;
      "
      @click="regresar()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [],
      producto: {
        nombre: "",
        precio: 0,
        descripcion: "",
        imagen: "",
        disponibles: 0,
        categoria: 0,
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
    regresar: function () {
      this.$router.push({ name: "Admin" });
    },
    async guardarProducto() {
      if (!this.validar()) return;

      const data = {
        nombre: this.producto.nombre,
        costo: parseFloat(this.producto.precio), // Cambiado a costo para coincidir con el backend
        descripcion: this.producto.descripcion,
        imagen: this.producto.imagen,
        stock: parseInt(this.producto.disponibles), // Cambiado a stock para coincidir con el backend
        id_tipo: parseInt(this.producto.categoria),
      };

      const url = "http://localhost:3000/producto/agregar";

      try {
        const response = await this.axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          alert("Producto agregado exitosamente");
          this.$router.push({ name: "Admin" }); // Redirigir después de agregar
        } else {
          alert("Error al agregar el producto");
        }
      } catch (error) {
        console.error("Error al guardar el producto:", error);
        alert(
          "Error al guardar el producto: " +
            (error.response?.data || error.message)
        );
      } finally {
        this.producto = {
          nombre: "",
          precio: 0,
          descripcion: "",
          imagen: "",
          disponibles: 0,
          categoria: 0,
        };
      }
    },
    validar() {
      if (this.producto.nombre == "") {
        alert("Por favor digite el nombre del producto");
        return false;
      } else if (this.producto.precio == 0) {
        alert("Por favor digite el precio del producto");
        return false;
      } else if (this.producto.descripcion == "") {
        alert("Por favor digite la descripción del producto");
        return false;
      } else if (this.producto.imagen == "") {
        alert("Por favor digite la imagen del producto");
        return false;
      } else if (this.producto.disponibles == 0) {
        alert("Por favor digite la cantidad de unidades disponibles");
        return false;
      } else if (this.producto.categoria == 0) {
        alert("Por favor digite la categoría del producto");
        return false;
      }
      return true;
    },
  },
  created: function () {
    this.getAllProductos();
  },
};
</script>

<style scoped>
.card {
  width: 400px;
  height: 100%;
  position: relative;
  left: 100rem;
  bottom: 40rem;
  background-color: #fff;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}
.regresar {
  position: absolute;
}
h1 {
  color: #2c3e50;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}
input[type="text"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}
.image-upload {
  margin-top: 10px;
}
.upload-btn {
  background-color: #f8f9fa;
  border: 1px dashed #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}
.upload-btn:hover {
  background-color: #f1f3f4;
}
.preview {
  margin-top: 15px;
  text-align: center;
}
.image-placeholder {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  border-radius: 4px;
}
.buttons {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}
.btn {
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.btn-primary {
  background-color: #3498db;
  color: white;
}
.btn-secondary {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #333;
}
.description {
  height: 100px;
}
/* From Uiverse.io by alexruix */
.input {
  height: 44px;
  width: 45rem;
  background-color: #05060f0a;
  border-radius: 0.5rem;
  padding: 0 1rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
    color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
    background 0.2s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
}

.label,
textarea {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: #05060f99;
  transition: color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
}

.input:hover,
.input:focus,
.input-group:hover .input {
  outline: none;
  border-color: #05060f;
}

.input-group:hover .label,
.input:focus,
textarea {
  color: #05060fc2;
}
</style>