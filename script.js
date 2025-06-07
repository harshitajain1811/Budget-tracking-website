const toggleBtn = document.getElementById("theme-toggle");

// Apply saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    toggleBtn.textContent = "Light ☀️";
  } else {
    document.body.classList.remove("light-theme");
    toggleBtn.textContent = "Dark 🌙";
  }
  updateChartBorderColorForTheme();
});

//Toggle between dark and light mode
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  toggleBtn.textContent = isLight ? "Light ☀️" : "Dark 🌙";

  // Save to localStorage
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateChartBorderColorForTheme();
});

const menuToggleBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".navbar a");

// Toggles navigation for medium and small screens
menuToggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close the menu when a link is clicked on mobile
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

//Redirecting to login page
const loginBtn = document.getElementById("login-signup");

if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    window.open("login.html", "_blank");
  });
}

//Toggle betweeen login and signup forms
function toggleForm(formType) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (formType === "signup") {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
  } else {
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
  }
}


const realDateInput = document.getElementById("realDateInput");
const formattedDate = document.getElementById("formattedDate");
const dateWrapper = document.getElementById("dateWrapper");

//Format date to displayed on dashboard
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function updateFormattedDate() {
  if (realDateInput.value) {
    formattedDate.value = formatDate(realDateInput.value);
  }
}

// Initialize with today's date
  const today = new Date().toISOString().split("T")[0];
  realDateInput.value = today;
  updateFormattedDate();

  // Open calendar on wrapper click
  dateWrapper.addEventListener("click", () => {
    realDateInput.showPicker(); // Modern browser method
  });

  realDateInput.addEventListener("change", updateFormattedDate);

//Line chart
const ctxLine = document.getElementById("incomeExpenseLineChart").getContext("2d");
const incomeExpenseLineChart = new Chart(ctxLine, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Income",
        data: [5200, 7500, 6700, 9000, 11900],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 79, 0.19)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Expense",
        data: [4800, 5000, 8300, 7700, 5600],
        borderColor: "#F44336",
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#E9ECEF", //This changes the legend label color
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#000" } /*color of vertical grid lines*/,
        ticks: { color: "#E9ECEF" } /*x-axis label text color*/,
      },
      y: {
        grid: { color: "#000" },
        ticks: { color: "#E9ECEF", stepSize: 5000 },
        min: 0,
        max: 25000,
      },
    },
  },
});

//Doughnut Chart
const doughCtx = document.getElementById("doughnutChart").getContext("2d");
const doughnutChart = new Chart(doughCtx, {
  type: "doughnut",
  data: {
    //labels: ['Food', 'Rent', 'Bills', 'Entertainment', 'Other'],
    datasets: [
      {
        data: [120, 450, 100, 80, 60],
        backgroundColor: [
          "#F72585",
          "#B5179E",
          "#7209B7",
          "#560BAD",
          "#480CA8",
        ],
        borderColor: "#2c2c2c",
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// Change the color based on theme
function updateChartBorderColorForTheme() {
  const isLight = document.body.classList.contains("light-theme");
  
  doughnutChart.data.datasets[0].borderColor = isLight ? "#E9ECEF" : "#2c2c2c";

  incomeExpenseLineChart.options.scales.x.grid.color = isLight ? "#d2d4d7" : "#121212"; // X-axis grid lines
  incomeExpenseLineChart.options.scales.y.grid.color = isLight ? "#d2d4d7" : "#121212"; // Y-axis grid lines

  incomeExpenseLineChart.options.scales.x.ticks.color = isLight ? "#2c2c2c" : "#E9ECEF"; // X-axis labels
  incomeExpenseLineChart.options.scales.y.ticks.color = isLight ? "#2c2c2c" : "#E9ECEF"; // Y-axis labels

  incomeExpenseLineChart.options.plugins.legend.labels.color = isLight ? "#2c2c2c" : "#E9ECEF"; // Legend labels

  // Update chart
  doughnutChart.update();
  incomeExpenseLineChart.update();
}
