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
  </div>
  <div class="selected-date" id="selected-date-display">
    Fecha seleccionada: viernes, 16 de junio de 2023
  </div>
</template>

<script>
export default {};
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

  // Establecer la fecha inicial (16 de junio de 2023)
  let currentMonth = 5; // Junio (0-indexado)
  let currentYear = 2023;
  let selectedDay = 16; // Día inicialmente seleccionado
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
        console.log("Día seleccionado marcado:", i);
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

        console.log("Día seleccionado:", i, "Mes:", month + 1, "Año:", year);
        console.log("Elemento:", this);
        console.log(
          "Tiene clase selected:",
          this.classList.contains("selected")
        );
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

  // Inicializar el calendario
  generateCalendar(currentMonth, currentYear);

  // Marcar inicialmente el día 16 como seleccionado
  console.log("Estado inicial:");
  console.log("Día seleccionado:", selectedDay);
  console.log("Mes seleccionado:", selectedMonth + 1);
  console.log("Año seleccionado:", selectedYear);

  // Para probar y verificar si hay conflictos de estilo
  window.testSelection = function () {
    const selectedElement = document.querySelector(".day.selected");
    if (selectedElement) {
      console.log("Elemento seleccionado:", selectedElement);
      console.log(
        "Estilos computados:",
        window.getComputedStyle(selectedElement)
      );
    } else {
      console.log("No se encontró ningún día seleccionado");
    }
  };
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f0f0f0;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;

  position: relative;
  right: 39rem;
  top: 10rem;
  display: flex;

}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: normal;
  padding: 20px;
  position: absolute;
  bottom: 14rem;
}

.calendar-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.month-selector {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  flex-grow: 1;
}

.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  padding: 5px 10px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 10px;
}

.weekday {
  font-size: 14px;
  color: #666;
  padding: 8px 0;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.day {
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  position: relative;
  height: 40px;
  width: 40px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Día seleccionado - estilo muy específico para evitar conflictos */
.day.selected {
  background-color: #007bff !important;
  color: white !important;
  border-radius: 50% !important;
}

.other-month {
  color: #ccc;
}

.selected-date {
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  color: #333;
  position: relative;
  right: 27rem;
}

/* Debugging - para ver los bordes de cada celda */
.debug .day {
  border: 1px dashed #ddd;
}
</style>