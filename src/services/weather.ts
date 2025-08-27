interface OpenMeteoCurrentWeather {
	temperature: number
	windspeed: number
	weathercode: number
}

export interface CurrentWeather extends OpenMeteoCurrentWeather {
	weatherDescription: string
}

const weatherCodeMap: Record<number, string> = {
	0: 'Clear sky',
	1: 'Mainly clear',
	2: 'Partly cloudy',
	3: 'Overcast',
	45: 'Fog',
	48: 'Depositing rime fog',
	51: 'Light drizzle',
	53: 'Moderate drizzle',
	55: 'Dense drizzle',
	56: 'Light freezing drizzle',
	57: 'Dense freezing drizzle',
	61: 'Slight rain',
	63: 'Moderate rain',
	65: 'Heavy rain',
	66: 'Light freezing rain',
	67: 'Heavy freezing rain',
	71: 'Slight snow fall',
	73: 'Moderate snow fall',
	75: 'Heavy snow fall',
	77: 'Snow grains',
	80: 'Slight rain showers',
	81: 'Moderate rain showers',
	82: 'Violent rain showers',
	85: 'Slight snow showers',
	86: 'Heavy snow showers',
	95: 'Thunderstorm',
	96: 'Thunderstorm with slight hail',
	99: 'Thunderstorm with heavy hail',
}

export async function fetchCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeather> {
	const params = new URLSearchParams({
		latitude: String(latitude),
		longitude: String(longitude),
		current_weather: 'true',
	})
	const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`
	const res = await fetch(url)
	if (!res.ok) throw new Error('Weather request failed')
	const json = await res.json()
	const cw = json.current_weather as OpenMeteoCurrentWeather
	return {
		temperature: cw.temperature,
		windspeed: cw.windspeed,
		weathercode: cw.weathercode,
		weatherDescription: weatherCodeMap[cw.weathercode] || 'Unknown',
	}
}

export interface ForecastDay {
	date: string
	min: number
	max: number
	weathercode: number
	description: string
}

export async function fetchFiveDayForecast(latitude: number, longitude: number): Promise<ForecastDay[]> {
	const params = new URLSearchParams({
		latitude: String(latitude),
		longitude: String(longitude),
		daily: 'weathercode,temperature_2m_max,temperature_2m_min',
		timezone: 'auto',
		forecast_days: '5',
	})
	const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`
	const res = await fetch(url)
	if (!res.ok) throw new Error('Forecast request failed')
	const json = await res.json()
	const times: string[] = json.daily.time
	const mins: number[] = json.daily.temperature_2m_min
	const maxs: number[] = json.daily.temperature_2m_max
	const codes: number[] = json.daily.weathercode
	return times.map((t, i) => ({
		date: t,
		min: mins[i],
		max: maxs[i],
		weathercode: codes[i],
		description: weatherCodeMap[codes[i]] || 'Unknown',
	}))
}


