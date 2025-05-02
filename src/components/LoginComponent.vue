<template>
  <div class="todo">
    <video class="Banner" autoplay loop muted>
      <source src="../assets/bar.mp4" type="video/mp4" />
    </video>
    <div class="login-wrapper">
      <!-- Caja del nombre del bar -->
      <div class="bar-name-container">
        <h1 class="bar-name">Bar-Galaxy</h1>
      </div>

      <!-- Contenedor del formulario -->
      <div class="login-container">
        <div class="form-content">
          <p class="instructions">Inicia Sesion</p>

          <!-- From Uiverse.io by Satwinder04 -->
          <div class="input-container">
            <input type="text" id="input" required=""  v-model="user"/>
            <label for="input" class="label">Usuario</label>
            <div class="underline"></div>
          </div>
          <!-- From Uiverse.io by Satwinder04 -->
          <div class="input-container">
            <input type="password" id="password" required="" v-model="contra" />
            <label for="input" class="label">Contraseña</label>
           
            <div class="underline"></div>
           
          </div>
          <button type="button" id="togglePassword" class="toggle-password">
              <i class="pi pi-eye-slash"></i>
            </button>

          <hr class="separator" />
          <span>
            <button type="submit" @click="click()" class="submit-button">
              INGRESAR
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      user: "",
      contra: "",
    };
  },
  methods: {
    click: function () {
      if (this.user == "keiner" && this.contra == "1234") {
        this.$router.push({ name: "Admin" });
      } else {
        alert("credenciales incorrectas");
      }
    },
  },
};
document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (!togglePassword || !passwordInput) {
    console.error("No se encontraron los elementos necesarios");
    return;
  }

  togglePassword.addEventListener("click", function (event) {
    event.preventDefault();

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
});
</script>

<style scoped>
.todo {
  position: fixed;
}
.Banner {
  position: relative;
  width: 140rem;
  top: 0;
  left: 0;
  height: 80%;
  object-fit: cover;
  z-index: -1;
}
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-size: cover;
  background-position: center;
}
/* From Uiverse.io by Satwinder04 */
.input-container {
  position: relative;
  margin: 50px auto;
  width: 450px;
}

.input-container input[type="text"] {
  font-size: 20px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px 0;
  background-color: transparent;
  outline: none;
}
.input-container input[type="password"] {
  font-size: 20px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px 0;
  background-color: transparent;
  outline: none;
}

.input-container .label {
  position: absolute;
  top: 0;
  left: 0;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container input[type="text"]:focus ~ .label,
.input-container input[type="text"]:valid ~ .label {
  top: -20px;
  font-size: 16px;
  color: #333;
}

.input-container input[type="password"]:focus ~ .label,
.input-container input[type="password"]:valid ~ .label {
  top: -20px;
  font-size: 16px;
  color: #333;
}

.input-container .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #e7d384;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.input-container input[type="password"]:focus ~ .underline,
.input-container input[type="password"]:valid ~ .underline {
  transform: scaleX(1);
}
.input-container input[type="text"]:focus ~ .underline,
.input-container input[type="text"]:valid ~ .underline {
  transform: scaleX(1);
}

.login-wrapper {
  position: relative;
  width: 30rem;
  bottom: 60rem;
  left: 50rem;
  box-shadow: 0 0 10px rgba(246, 246, 110, 0.1);
}

/* Estilo del contenedor del nombre del bar */
.bar-name-container {
  position: relative;
  z-index: 2;
  background-color: #caa928;
  color: white;
  padding: 15px 0;
  text-align: center;
  margin-bottom: -15px;
  border-radius: 8px 8px 8px 8px;
  width: 20rem;
  left: 5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.bar-name {
  margin: 0;
  font-size: 24px;
  z-index: 3;
}

/* Estilo del contenedor del formulario */
.login-container {
  position: relative;

  z-index: 1;

  background-color: beige;
  border-radius: 10px;
  padding: 25px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  margin-top: 0;
}

/* Texto de instrucciones */
.instructions {
  color: black;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}



/* Separador */
.separator {
  border: none;
  height: 1px;
  background-color: #e7d384;
  margin: 25px 0;
}


.toggle-password {
  position: relative;
  bottom: 5rem;
  left: 26rem;
  border: none;
  cursor: pointer;
 
}

/* Botón de ingreso */

.submit-button {
  display: inline-block;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #555;
  position: relative;
  left: 8.5rem;
  overflow: hidden;
  transition: all 0.5s ease-in;
  z-index: 1;
}

.submit-button::before,
.submit-button::after {
  content: "";
  position: absolute;
  top: 0;
  width: 0;
  height: 100%;
  transform: skew(15deg);
  transition: all 0.5s;
  overflow: hidden;
  z-index: -1;
}

.submit-button::before {
  left: -10px;
  background: #e7d384;
}

.submit-button::after {
  right: -10px;
  background: #caa928;
}

.submit-button:hover::before,
.submit-button:hover::after {
  width: 58%;
}

.submit-button:hover span {
  color: #e0aaff;
  transition: 0.3s;
}

.submit-button span {
  color: #03045e;
  font-size: 18px;
  transition: all 0.3s ease-in;
}
</style>