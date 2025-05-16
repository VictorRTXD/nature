import { useState, useEffect } from "react";
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Clock, 
  Calendar,
  X,
  Search,
  Leaf
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: 51.5074, lon: -0.1278 }); // Default: London

  const API_KEY = "ce3d6e809120526fcbec669ef2a135f2";

  // Fetch default location on mount
  useEffect(() => {
    fetchWeatherData("Madrid");
  }, []);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get coordinates
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        setNotification("Ubicación no disponible. Mostrando ubicación predeterminada: Madrid");
        fetchWeatherData("Madrid");
        return;
      }

      const { lat, lon, name, country } = geoData[0];
      setLocation({ lat, lon });
      setCity(`${name}, ${country}`);

      // 2. Get current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
      );
      const currentWeather = await weatherRes.json();
      
      // 3. Get forecast data (for hourly and daily forecasts)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
      );
      const forecastData = await forecastRes.json();
      
      // 4. Get air quality data
      const airQualityRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const airQualityData = await airQualityRes.json();
      setAirQuality(airQualityData.list[0]);
      
      // Process hourly forecast for next 24 hours
      const hourly = forecastData.list.slice(0, 8).map(item => {
        return {
          time: new Date(item.dt * 1000).getHours() + ":00",
          temp: Math.round(item.main.temp),
          weather: item.weather[0].description,
          icon: getWeatherIcon(item.weather[0].main),
          precipitation: item.pop * 100,
          wind: Math.round(item.wind.speed * 10) / 10
        };
      });
      
      // Procesamiento mejorado del pronóstico diario
      const daily = [];
      
      // Get day names in Spanish
      const getDayName = (date) => {
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]}`;
      };
      
      // Agrupar pronósticos por día para extraer temperaturas máx/mín reales
      const dailyData = {};
      
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            date: date,
            temps: [],
            descriptions: [],
            conditions: []
          };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].descriptions.push(item.weather[0].description);
        dailyData[dateKey].conditions.push(item.weather[0].main);
      });
      
      // Procesar datos agrupados para el pronóstico de los próximos 8 días (incluyendo hoy)
      Object.values(dailyData).slice(0, 8).forEach((dayData, index) => {
        const maxTemp = Math.max(...dayData.temps);
        const minTemp = Math.min(...dayData.temps);
        
        // Elegir la condición meteorológica más frecuente
        const conditionCounts = {};
        dayData.conditions.forEach(condition => {
          if (!conditionCounts[condition]) conditionCounts[condition] = 0;
          conditionCounts[condition]++;
        });
        
        let mostFrequentCondition = dayData.conditions[0];
        let highestCount = 0;
        
        for (const [condition, count] of Object.entries(conditionCounts)) {
          if (count > highestCount) {
            highestCount = count;
            mostFrequentCondition = condition;
          }
        }
        
        // Encontrar descripción correspondiente a la condición más frecuente
        const descriptionIndex = dayData.conditions.findIndex(c => c === mostFrequentCondition);
        const description = dayData.descriptions[descriptionIndex >= 0 ? descriptionIndex : 0];
        
        daily.push({
          day: getDayName(dayData.date),
          high: Math.round(maxTemp),
          low: Math.round(minTemp),
          weather: description,
          icon: getWeatherIcon(mostFrequentCondition)
        });
      });
      
      setWeather(currentWeather);
      setHourlyForecast(hourly);
      setDailyForecast(daily);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Error al obtener datos del clima. Por favor intenta de nuevo.");
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchWeatherData(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  // Helper function to get weather icon based on weather condition
  function getWeatherIcon(condition) {
    const lowerCondition = condition ? condition.toLowerCase() : "";
    if (lowerCondition.includes("clear") || lowerCondition.includes("despejado")) return "🔴"; // Clear day
    if (lowerCondition.includes("clouds") || lowerCondition.includes("nub")) return "☁️"; // Cloudy
    if (lowerCondition.includes("broken") || lowerCondition.includes("scattered") || lowerCondition.includes("parcial")) return "🌤️"; // Partly cloudy
    if (lowerCondition.includes("rain") || lowerCondition.includes("lluv")) return "🌧️"; // Rain
    if (lowerCondition.includes("drizzle") || lowerCondition.includes("llovizna")) return "🌦️"; // Light rain
    if (lowerCondition.includes("snow") || lowerCondition.includes("niev")) return "❄️"; // Snow
    if (lowerCondition.includes("thunder") || lowerCondition.includes("tormenta")) return "⛈️"; // Thunderstorm
    if (lowerCondition.includes("mist") || lowerCondition.includes("fog") || lowerCondition.includes("niebla")) return "🌫️"; // Fog
    return "☁️"; // Default
  }

  // Format temperature with degree symbol
  const formatTemp = (temp) => `${Math.round(temp)}°C`;

  // Get hours in 12-hour format with AM/PM
  const getFormattedTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Get current date and time in Spanish
  const getCurrentDateTime = () => {
    const now = new Date();
    const options = { 
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleDateString('es-ES', options).replace('.', '');
  };

  // Get air quality description based on AQI
  const getAirQualityDescription = (aqi) => {
    switch(aqi) {
      case 1: return { text: "Buena", color: "text-green-400" };
      case 2: return { text: "Aceptable", color: "text-yellow-400" };
      case 3: return { text: "Moderada", color: "text-orange-400" };
      case 4: return { text: "Mala", color: "text-red-400" };
      case 5: return { text: "Muy mala", color: "text-purple-400" };
      default: return { text: "Sin datos", color: "text-gray-400" };
    }
  };

  // Format chart data for hourly temperature forecast
  const chartData = hourlyForecast.map((item, index) => ({
    name: item.time,
    temp: item.temp,
    precipitation: item.precipitation
  }));

  return (
    <div className="bg-gray-900 text-white p-4 min-h-screen">
      {/* Search Bar */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar ciudad"
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Buscar
          </button>
          <div className="flex gap-4 text-sm text-gray-400 ml-4">
            <span>Métrico: °C, m/s</span>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="bg-teal-800 text-white p-4 rounded mb-4 flex justify-between items-center max-w-6xl mx-auto">
          <p>{notification}</p>
          <button onClick={dismissNotification} className="text-white hover:text-gray-200">
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-800 text-white p-4 rounded mb-4 max-w-6xl mx-auto">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {weather && (
        <div className="max-w-6xl mx-auto">
          {/* Current Weather */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <div className="mb-2 text-gray-400">{getCurrentDateTime()}</div>
              <h1 className="text-2xl font-bold mb-6">{city}</h1>
              
              <div className="flex items-center">
                <div className="text-6xl mr-2">{formatTemp(weather.main.temp)}</div>
              </div>
              
              <div className="mt-2">
                Sensación térmica de {formatTemp(weather.main.feels_like)}. {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}.
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <Wind size={16} />
                  <span>{weather.wind.speed} m/s {weather.wind.deg ? `${weather.wind.deg}°` : "SO"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer size={16} />
                  <span>{weather.main.pressure} hPa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets size={16} />
                  <span>Humedad: {weather.main.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>Visibilidad: {(weather.visibility / 1000).toFixed(1)} km</span>
                </div>
              </div>
              
              {/* Air Quality */}
              {airQuality && (
                <div className="mt-4 bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Leaf size={16} />
                    <span className="font-semibold">Calidad del Aire</span>
                  </div>
                  <div className={`mt-1 font-medium ${getAirQualityDescription(airQuality.main.aqi).color}`}>
                    {getAirQualityDescription(airQuality.main.aqi).text}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>PM2.5: {airQuality.components.pm2_5.toFixed(1)} µg/m³</div>
                    <div>PM10: {airQuality.components.pm10.toFixed(1)} µg/m³</div>
                    <div>NO₂: {airQuality.components.no2.toFixed(1)} µg/m³</div>
                    <div>O₃: {airQuality.components.o3.toFixed(1)} µg/m³</div>
                    <div>SO₂: {airQuality.components.so2.toFixed(1)} µg/m³</div>
                    <div>CO: {(airQuality.components.co / 1000).toFixed(1)} mg/m³</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Map */}
            <div className="w-full md:w-2/3 bg-gray-800 rounded-lg overflow-hidden h-72 relative">
              <div className="absolute top-2 right-2 text-xs bg-gray-900 bg-opacity-70 p-1 rounded z-10">
                © OpenStreetMap
              </div>
              <div className="h-full w-full bg-gray-700 flex items-center justify-center">
                <img 
                  src={`https://tile.openstreetmap.org/10/${Math.floor((location.lon + 180) / 360 * Math.pow(2, 10))}/${Math.floor((1 - Math.log(Math.tan(location.lat * Math.PI / 180) + 1 / Math.cos(location.lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, 10))}.png`}
                  alt="Mapa" 
                  className="opacity-80 w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-70 p-2 rounded">
                  <div className="text-lg">Sin precipitaciones en la próxima hora</div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>07:47pm</span>
                    <span>08:02pm</span>
                    <span>08:17pm</span>
                    <span>08:32pm</span>
                    <span>08:47pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="mb-6">
            <h2 className="text-xl mb-4">Pronóstico por horas</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              {/* Times */}
              <div className="flex justify-between mb-2 text-sm text-gray-400">
                {hourlyForecast.map((hour, index) => (
                  <div key={index}>{hour.time}</div>
                ))}
              </div>
              
              {/* Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                    <XAxis dataKey="name" tick={{fill: '#999'}} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 'dataMax + 5']} tick={{fill: '#999'}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value) => [`${value}°C`, 'Temperatura']}
                      labelFormatter={(value) => `${value}h`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#ff6b35" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Precipitation Percentages */}
              <div className="flex justify-between mt-2 text-sm text-green-400">
                {hourlyForecast.map((hour, index) => (
                  <div key={index}>{Math.round(hour.precipitation)}%</div>
                ))}
              </div>
              
              {/* Weather Conditions */}
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                {hourlyForecast.map((hour, index) => (
                  <div key={index} className="text-center">
                    <div>{hour.weather}</div>
                  </div>
                ))}
              </div>
              
              {/* Wind Speeds */}
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                {hourlyForecast.map((hour, index) => (
                  <div key={index}>{hour.wind}m/s</div>
                ))}
              </div>
            </div>
          </div>

          {/* 8-day Forecast */}
          <div>
            <h2 className="text-xl mb-4">Pronóstico de 8 días</h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {dailyForecast.map((day, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 ${
                    index < dailyForecast.length - 1 ? 'border-b border-gray-700' : ''
                  }`}
                >
                  <div className="w-1/4">{day.day}</div>
                  <div className="w-1/6 text-center">{day.icon}</div>
                  <div className="w-1/4 text-right">{day.high} / {day.low}°C</div>
                  <div className="w-1/4 text-right text-gray-400">{day.weather}</div>
                  <div className="w-1/12 text-right">▼</div>
                </div>
              ))}
            </div>
          </div>
          <footer  className="bg-slate-900/80 border-t border-slate-800 py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                EcoSoluciones ODS
              </h3>
              <p className="text-gray-400 max-w-md">
                Promoviendo prácticas sostenibles para alcanzar los Objetivos de Desarrollo Sostenible 2030.
              </p>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm border-t border-slate-800 pt-6">
            <p>© {new Date().getFullYear()} EcoSoluciones. Todos los derechos reservados.</p>
            <p className="mt-1">
              Desarrollado con 💚 para un futuro más sostenible
            </p>
          </div>
        </div>
      </footer>
        </div>
      )}
    </div>
  );
}