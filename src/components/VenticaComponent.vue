<template>
  <div class="container">
    <div class="regresar">
      <ButtonUno icon="pi pi-arrow-left" iconPos="top" severity="contrast"  style="width: 6rem; height: 3rem;"  @click="regresar()"/>
    </div>
    <div class="search-bar">
      <div class="search-input">
        <ButtonUno icon="pi pi-search" iconPos="top" severity="contrast"  />
        <input type="text" placeholder="Search" />
      </div>
    </div>

    <div class="boxes-container">
      <div class="box">
        <PanelD class="PanelD" v-for="item in items" :key="item">
          <p class="raya">{{ item.mensaje }}</p>
        </PanelD>
        <div class="box-label">productos</div>
      </div>

      <div class="box">
        <PanelD class="PanelDos">
          <p>sdsa</p>
        </PanelD>
        <div class="box-label">Graficas ventas general</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VenticaComponent",
  data() {
    return {
      items: [
        { mensaje: "olaa" },
        { mensaje: "Este es el panel 2" },
        { mensaje: "Este es el panel 3" },
        { mensaje: "Este es el panel 3" },
        { mensaje: "Este es el panel 3" },
      ],
    };
  },
  methods: {
    regresar: function() {
      this.$router.push({ name: "Admin" });
    },
    addItem() {
      this.items.push({
        mensaje: `Este es el panel ${this.items.length + 1}`,
      });
    },
  },
};
</script>


<style scoped>
.regresar{
  position: relative;
  top: 4rem;
  left: 7rem;

}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;

  background-color: #af0707;
}

.PanelD {
  margin-top: 10px;
  height: 80px;
  border-radius: 8px 8px 15px 15px;
  box-shadow: 0px 0px 10px 0 rgba(97, 92, 92, 0.7);
}
.PanelDos {
  margin-top: 10px;
  height: 85%;

  border-radius: 8px 8px 15px 15px;
  box-shadow: 0px 0px 10px 0 rgba(97, 92, 92, 0.7);
}

.container {
  position: relative;
  right: 15rem;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 10px;
}

.search-bar {
  padding: 10px;
  background-color: #ffffff;
  border-bottom: 1px solid #ececec;
  margin-bottom: 20px;
}

.search-input {
  display: flex;
  position: relative;
  width: 800px;
  left: 26rem;
  align-items: center;
  padding: 8px 12px;
  box-shadow: 0px 0px 10px 0 rgba(97, 92, 92, 0.7);
}

input {
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
}

.boxes-container {
  display: flex;
  position: relative;
  left: 14rem;
  gap: 50px;
}

.box {
  position: relative;
  background-color: white;
  width: 900rem;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.5);
  height: 900px;
}

.box-label {
  position: absolute;
  bottom: 15px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  color: #333;
}
</style>