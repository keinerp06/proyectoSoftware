<template>
  <div class="todo">
    <title>Login</title>
    <video class="Banner" autoplay loop>
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

          <div class="input-field">
            <input
              type="email"
              id="email"
              name="email"
              v-model="user"
              placeholder="Usuario"
            />
          </div>

          <div class="input-field">
            <input
              type="password"
              id="password"
              name="password"
              v-model="contra"
              placeholder="Contraseña"
            />

            <button type="button" id="togglePassword" class="toggle-password">
              <i class="pi pi-eye-slash"></i>
            </button>
          </div>

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
  width: 100%;
  top: 0;
  left: 0;
  height: 80%;
  object-fit: cover;
  z-index: -1;
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-size: cover;
  background-position: center;
}

.login-wrapper {
  position: relative;
  width: 30rem;
  bottom: 48rem;
  left: 35rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
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

/* Campos de entrada */
.input-field {
  margin-bottom: 25px;
}

.input-field label {
  display: block;
  color: white;
  text-align: center;
  margin-bottom: 10px;
}

.input-field input {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #e7d384;
  text-align: center;
  outline: none;
  font-size: 16px;
  background-color: beige;
}

/* Separador */
.separator {
  border: none;
  height: 1px;
  background-color: #e7d384;
  margin: 25px 0;
}

.pi-eye {
  display: flex;
  width: 20px;
  height: 20px;
  position: relative;
  bottom: 1rem;
  left: 26rem;

  cursor: pointer;
  opacity: 0.6;
}
.toggle-password {
  position: relative;
  bottom: 1.5rem;
  left: 13rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
}

/* Botón de ingreso */

.submit-button {
  display: inline-block;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #555;
  position: relative;
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