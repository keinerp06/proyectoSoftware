<template>
  <div class="container">
    <h1>Resumen de ventas</h1>

    <div class="calendar-container">
      <div class="calendar">
        <div class="calendar-header">
          <div class="calendar-nav">
            <button class="nav-btn">&#10094;</button>
            <div class="month-year">JUNIO 2023</div>
       
            <button class="nav-btn">&#10095;</button>
          </div>
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

        <div class="days">
          <div class="day other-month">28</div>
          <div class="day other-month">29</div>
          <div class="day other-month">30</div>
          <div class="day other-month">31</div>
          <div class="day">1</div>
          <div class="day">2</div>
          <div class="day">3</div>

          <div class="day">4</div>
          <div class="day">5</div>
          <div class="day">6</div>
          <div class="day">7</div>
          <div class="day">8</div>
          <div class="day">9</div>
          <div class="day">10</div>

          <div class="day">11</div>
          <div class="day">12</div>
          <div class="day">13</div>
          <div class="day">14</div>
          <div class="day">15</div>
          <div class="day selected">16</div>
          <div class="day">17</div>

          <div class="day">18</div>
          <div class="day">19</div>
          <div class="day">20</div>
          <div class="day">21</div>
          <div class="day">22</div>
          <div class="day">23</div>
          <div class="day">24</div>

          <div class="day">25</div>
          <div class="day">26</div>
          <div class="day">27</div>
          <div class="day">28</div>
          <div class="day">29</div>
          <div class="day">30</div>
          <div class="day other-month">1</div>

          <div class="day other-month">2</div>
          <div class="day other-month">3</div>
          <div class="day other-month">4</div>
          <div class="day other-month">5</div>
          <div class="day other-month">6</div>
          <div class="day other-month">7</div>
          <div class="day other-month">8</div>
        </div>
      </div>
    </div>

    <div class="date-selector">
      <h2>Seleccione una fecha</h2>
      <!-- Aquí podrían ir más controles o información del resumen de ventas -->
    </div>
  </div>
</template>

<script>
export default {};
// Añadir interactividad básica
document.querySelectorAll(".day").forEach((day) => {
  day.addEventListener("click", () => {
    // Quitar selección anterior
    document.querySelectorAll(".day.selected").forEach((selectedDay) => {
      selectedDay.classList.remove("selected");
    });

    // Añadir nueva selección
    day.classList.add("selected");
  });
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
  background-color: #f5f5f5;
  padding: 20px;
}

.container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  width: 100%;
}

.calendar-container {
  background-color: #e6e6e6;
  padding: 20px;
  border-radius: 5px;
  width: 45%;
  min-width: 300px;
}

.date-selector {
  width: 45%;
  min-width: 300px;
}

.date-selector h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.calendar {
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.calendar-nav {
  display: flex;
  align-items: center;
}

.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0 10px;
  color: #666;
}

.month-year {
  margin: 0 15px;
  font-weight: bold;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.weekday {
  padding: 5px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
}

.day:hover {
  background-color: #f0f0f0;
}

.day.other-month {
  color: #ccc;
}

.day.selected {
  background-color: #007bff;
  color: white;
}

.day.today {
  border: 1px solid #007bff;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .calendar-container,
  .date-selector {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>