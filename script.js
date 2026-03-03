const apiKey = "6a6ed9b861432104829b76beeff94464";

const weather = {

  async fetchWeather(city) {
    try {
      document.querySelector(".weather").classList.add("loading");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      this.displayWeather(data);
      this.fetchForecast(city);

    } catch {
      document.querySelector(".city").innerHTML =
        "<span class='error'>⚠ City not found</span>";
      document.querySelector(".weather").classList.remove("loading");
    }
  },

  async fetchForecast(city) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();
    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
      const day = data.list[i * 8];

      const card = document.createElement("div");
      card.classList.add("forecast-card");

      card.innerHTML = `
        <div>${new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</div>
        <div>${Math.round(day.main.temp)}°C</div>
      `;

      forecastContainer.appendChild(card);
    }
  },

  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = name;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind: ${speed} km/h`;
    document.querySelector(".icon").src =
      `https://openweathermap.org/img/wn/${icon}.png`;

    const now = new Date();
    document.querySelector(".date").innerText =
      now.toDateString() + " | " + now.toLocaleTimeString();

    document.querySelector(".weather").classList.remove("loading");
  }

};

document.querySelector(".search-btn").addEventListener("click", () => {
  weather.fetchWeather(document.querySelector(".search-bar").value);
});

document.querySelector(".search-bar").addEventListener("keyup", e => {
  if (e.key === "Enter") {
    weather.fetchWeather(document.querySelector(".search-bar").value);
  }
});

document.querySelector(".toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});