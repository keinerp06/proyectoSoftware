<template>
  <div class="header">
    <h1 class="h1">Inventario</h1>
  </div>

  <div class="container">
    <!-- First Row -->
    <div class="card" v-for="pokemon in pokemones" :key="pokemon.id">
      <div class="card-image">
        <img :src="pokemon.imagen" alt="Whisky" />
      </div>
      <div class="card-content">
        <div class="card-title">{{ pokemon.nombre }}</div>
        <div
          class="card-price"
          :style="{ 'background-color': pokemon.type_color }"
        >
          COP 80.000
        </div>
        <div class="card-stock">10 en existencias</div>
      </div>
      <div class="card-actions">
        <div class="action-button">
          <ButtonUno
            severity="contrast"
            icon=" pi pi-pen-to-square"
            @click="AbrirModal"
          />
        </div>
        <div class="action-button">
          <ButtonUno severity="contrast" icon="pi pi-trash" />
        </div>
      </div>
    </div>
    <DialogPrime 
      :visible="abierto"
      maximizable
      modal
      :header="nombre"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <CardPrime 
        style="width: 25rem; overflow: initial"
        v-for="pokemon in pokemones"
        :key="pokemon.id"
        :id="pokemon.id"
        :nombre="pokemon.nombre"
        :color="pokemon.type_color"
        :imagen="pokemon.imagen"
        :tipo="pokemon.type_name"
        :disponible="pokemon.disponible" 
        

      >
        <template #header>
          <img :src="pokemon.imagen" alt="" />
        </template>
        <template #title> {{  pokemonSeleccionado.nombre}}</template>
        <template #subtitle>{{ tipo }}</template>
        <template #content>
          <h2>{{ nombre }}</h2>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <button @click="mostrarPokemon(pokemon)">Ver</button>
          </div>
        </template>
      </CardPrime>

      <ButtonUno @click="CerrarModal" class="boton-modal" severity="contrast"
        >Cerrar</ButtonUno
      >
    </DialogPrime>
  </div>
</template>

<script>
export default {
  name: "InventarioComponent",

  data() {
    return {
      pokemones: [],
      abierto: false,
      pokemonSeleccionado: null,
    };
  },

  methods: {
    getAllPokemones: async function () {
      let url =
        "https://cobuses.com.co/APIV2/model/pokemon.php?dato=getallpokemon";
      let vue = this;
      await this.axios
        .get(url)
        .then(function (response) {
          console.log("ESTOS SON LOS DATOS");
          console.log(response.data);
          console.log("STATUS");
          console.log(response.status);
          vue.pokemones = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          console.log("Proceso terminado");
        });
    },
    AbrirModal: function () {
      this.abierto = true;
    },
    CerrarModal: function () {
      this.abierto = false;
    },
    props: {
      id: Number,
      imagen: String,
      nombre: String,
      tipo: String,
      color: String,
      disponible: Number,
    },
    mostrarPokemon(pokemon) {
      this.pokemonSeleccionado = pokemon;
    },
  },

  created: function () {
    this.getAllPokemones();
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
</style>