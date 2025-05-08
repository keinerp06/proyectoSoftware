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
            type="email"
          />
          <div></div>
        </div>
      </div>

      <div class="form-group">
        <label for="categoria">Categoría</label>
        <SelectD
          v-model="selectedCity1"
          :options="cities"
          optionLabel="name"
          placeholder="Seleccione una categoria"
          :invalid="!selectedCity1"
          class="w-full md:w-56"
          style="width: 45rem"
        />
      </div>

      <div class="form-group">
        <label for="precio">Precio</label>
      
        <input
          autocomplete="off"
          step="0.01"
          id="precio"
          class="input"
          type="number"
          placeholder="0.00"
        />
      </div>

      <div class="form-group">
        <label for="disponibles">Unidades Disponibles</label>

        <input
          autocomplete="off"
          min="0"
          id="disponibles"
          class="input"
          type="number"
          placeholder="0"
        />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          class="description"
          placeholder="Describa el producto..."
        ></textarea>
      </div>

      <div class="form-group">
        <label>Imagen del Producto</label>
        <div class="upload-btn">
          <div>
            Haga clic para seleccionar una imagen o arrastre y suelte aquí
          </div>
        </div>
        <div class="preview">
          <div class="image-placeholder">Vista previa no disponible</div>
        </div>
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
        />
      </div>
    </div>
  </div>
  <div class="regresar">
        <ButtonUno
          icon="pi pi-arrow-left"
          iconPos="top"
          severity="contrast"
          style="width: 3rem; height: 3rem; position: relative;  bottom: 59rem; left: 31.5rem;"
          @click="regresar()"
        />
      </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCity: null,
      cities: [
        { name: "Wiskhy", code: "NY" },
        { name: "Vino", code: "RM" },
        { name: "Tequila", code: "LDN" },
        { name: "Ron", code: "IST" },
        { name: "Vodka", code: "PRS" },
      ],
      
    };
    
  },
  methods: {
    regresar: function() {
      this.$router.push({ name: "Admin" });
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}
.regresar{
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