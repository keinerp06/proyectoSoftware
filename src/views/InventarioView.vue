<template>
  <InventarioComponent></InventarioComponent>
</template>

<script>
import InventarioComponent from "@/components/InventarioComponent.vue";

export default {
  data() {
    return {
      pokemones: [],
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
  },

  created: function () {
    this.getAllPokemones();
  },
  components: {
    InventarioComponent,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>