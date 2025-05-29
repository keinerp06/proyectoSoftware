<template>
  <div class="container">
    <h1>Resumen de ventas</h1>

    <div class="calendar-container">
      <div class="calendar-header">
        <button class="nav-btn prev-month">&lt;</button>
        <div class="month-selector" id="month-year">JUNIO 2025</div>
        <button class="nav-btn next-month">&gt;</button>
      </div>

      <div class="weekdays">
        <div class="weekday">dom.</div>
        <div class="weekday">lun.</div>
        <div class="weekday">mar.</div>
        <div class="weekday">mié.</div>
        <div class="weekday">jue.</div>
        <div class="weekday">vie.</div>
        <div class="weekday">sáb.</div>
      </div>

      <div class="days" id="calendar-days">
        <!-- Los días se generarán con JavaScript -->
      </div>
    </div>

    <div class="selected-date" id="selected-date-display">
      Fecha seleccionada:
    </div>

    <!-- Nuevo contenedor para mostrar los productos -->
    <div class="products-container" v-if="selectedDateProducts.length > 0">
      <h2>Productos vendidos en esta fecha:</h2>
      <div class="product-card" v-for="product in selectedDateProducts" :key="product.id">
        <img :src="product.imagen" :alt="product.nombre" class="product-image">
        <div class="product-details">
          <h3>{{ product.nombre }}</h3>
          <p>Cantidad vendida: {{ product.cantidad }}</p>
        </div>
      </div>
    </div>
    <div v-else class="no-products">
      No hay ventas registradas en esta fecha
    </div>
  </div>
</template>

<script setup>
document.addEventListener("DOMContentLoaded", function () {
  // Nombres de los meses en español
  const monthNames = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  // Nombres de los días en español
  const weekdayNames = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  // Obtener la fecha actual del sistema
  const today = new Date();

  // Establecer la fecha inicial con la fecha actual del computador
  let currentMonth = today.getMonth(); // Mes actual (0-indexado)
  let currentYear = today.getFullYear(); // Año actual
  let selectedDay = today.getDate(); // Día actual
  let selectedMonth = currentMonth;
  let selectedYear = currentYear;

  const calendarDays = document.getElementById("calendar-days");
  const monthYearElement = document.getElementById("month-year");
  const prevMonthButton = document.querySelector(".prev-month");
  const nextMonthButton = document.querySelector(".next-month");
  const selectedDateDisplay = document.getElementById("selected-date-display");

  // Función para generar el calendario
  function generateCalendar(month, year) {
    // Limpiar el contenedor de días
    calendarDays.innerHTML = "";

    // Actualizar el título del mes y año
    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    // Obtener el primer día del mes y el número de días
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 (Domingo) a 6 (Sábado)

    // Obtener el último día del mes anterior
    const prevMonthLastDay = new Date(year, month, 0);
    const daysInPrevMonth = prevMonthLastDay.getDate();

    // Crear un array para todos los elementos de día
    let allDayElements = [];

    // Días del mes anterior
    for (let i = startingDay - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dayElement = document.createElement("div");
      dayElement.classList.add("day", "other-month");
      dayElement.textContent = dayNum;
      allDayElements.push(dayElement);
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.textContent = i;

      // Comprobar si este día debe estar seleccionado
      if (
        i === selectedDay &&
        month === selectedMonth &&
        year === selectedYear
      ) {
        dayElement.classList.add("selected");
      }

      // Marcar el día actual con un color especial si es el mes y año actuales
      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayElement.style.border = "2px solid #28a745";
        dayElement.style.fontWeight = "bold";
      }

      // Aquí se agrega el data attribute para identificar el día
      dayElement.setAttribute("data-day", i);
      dayElement.setAttribute("data-month", month);
      dayElement.setAttribute("data-year", year);

      // Agregar evento de clic
      dayElement.addEventListener("click", function () {
        // Actualizar variables globales de selección
        selectedDay = i;
        selectedMonth = month;
        selectedYear = year;

        // Eliminar la clase 'selected' de todos los días
        document.querySelectorAll(".day").forEach((day) => {
          day.classList.remove("selected");
        });

        // Añadir la clase 'selected' al día cliqueado
        this.classList.add("selected");

        // Actualizar la fecha seleccionada
        updateSelectedDateDisplay();
      });

      allDayElements.push(dayElement);
    }

    // Calcular cuántos días del mes siguiente necesitamos
    const totalDaysShown = startingDay + daysInMonth;
    const daysFromNextMonth = 42 - totalDaysShown; // 6 filas x 7 días = 42

    // Días del mes siguiente
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day", "other-month");
      dayElement.textContent = i;
      allDayElements.push(dayElement);
    }

    // Añadir todos los días al calendario
    allDayElements.forEach((element) => {
      calendarDays.appendChild(element);
    });

    // Actualizar el texto de la fecha seleccionada
    updateSelectedDateDisplay();
  }

  // Función para actualizar el texto de la fecha seleccionada
  function updateSelectedDateDisplay() {
    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
    const weekday = weekdayNames[selectedDate.getDay()];
    const day = selectedDate.getDate();
    const month = monthNames[selectedDate.getMonth()].toLowerCase();
    const year = selectedDate.getFullYear();

    selectedDateDisplay.textContent = `Fecha seleccionada: ${weekday}, ${day} de ${month} de ${year}`;
  }

  // Eventos para los botones de navegación
  prevMonthButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  });

  nextMonthButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
  });

  // Inicializar el calendario con la fecha actual
  generateCalendar(currentMonth, currentYear);

  console.log("Fecha actual del sistema:");
  console.log("Día:", selectedDay);
  console.log("Mes:", monthNames[selectedMonth]);
  console.log("Año:", selectedYear);
});
</script>

<script>
export default {
  data() {
    return {
      selectedDateProducts: [],
      // ... resto de las propiedades existentes
    }
  },
  methods: {
    async fetchProductsByDate(date) {
      try {
        const response = await this.axios.get(`http://localhost:3000/ventas/${date}`);
        this.selectedDateProducts = response.data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        this.selectedDateProducts = [];
      }
    },

    // Modificar la función que maneja el clic en un día
    handleDayClick(day, month, year) {
      // ... código existente de selección de fecha ...
      
      // Formatear la fecha para la API (YYYY-MM-DD)
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      this.fetchProductsByDate(formattedDate);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.calendar-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.nav-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.nav-btn:hover {
  background: #0056b3;
}

.month-selector {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 10px;
}

.weekday {
  text-align: center;
  font-weight: bold;
  color: #666;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day {
  text-align: center;
  padding: 15px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8f9fa;
}

.day:hover {
  background: #e9ecef;
}

.day.selected {
  background: #007bff !important;
  color: white !important;
  font-weight: bold;
}

.day.other-month {
  color: #ccc;
  background: #f8f9fa;
}

.selected-date {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  background: #e7f3ff;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.products-container {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
}

.product-details {
  flex-grow: 1;
}

.product-details h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.no-products {
  text-align: center;
  padding: 20px;
  color: #666;
  background: #f8f9fa;
  border-radius: 10px;
  margin-top: 20px;
}
</style>