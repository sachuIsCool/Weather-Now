import { useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { fetchCoordinatesForCity } from './services/geocoding'
import { fetchCurrentWeather, fetchFiveDayForecast, type ForecastDay } from './services/weather'
import { ForecastRow } from './components/ForecastRow'

export interface WeatherData {
	temperature: number
	windspeed: number
	weathercode: number
	weatherDescription: string
	city: string
}

function App() {
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<WeatherData | null>(null)
	const [forecast, setForecast] = useState<ForecastDay[] | null>(null)

	const onSearch = async (value: string) => {
		setQuery(value)
		setError(null)
		setData(null)
		setForecast(null)
		if (!value.trim()) return
		setLoading(true)
		try {
			const coords = await fetchCoordinatesForCity(value)
			if (!coords) {
				setError('City not found. Try another name.')
				return
			}
			const [weather, forecastDays] = await Promise.all([
				fetchCurrentWeather(coords.latitude, coords.longitude),
				fetchFiveDayForecast(coords.latitude, coords.longitude),
			])
			setData({
				temperature: weather.temperature,
				windspeed: weather.windspeed,
				weathercode: weather.weathercode,
				weatherDescription: weather.weatherDescription,
				city: coords.displayName,
			})
			setForecast(forecastDays)
		} catch (e) {
			setError('Failed to fetch weather. Please try again later.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="relative min-h-screen text-slate-800">
			<div className="absolute inset-0 animated-gradient blur-2xl opacity-60" />
			<div
				className={
					`relative min-h-screen transition-colors` +
					` ${
						!data
							? 'bg-gradient-to-b from-sky-100/60 via-white/60 to-white/60'
							: data.weathercode === 0 || data.weathercode === 1
							? 'bg-gradient-to-b from-sky-200/60 via-sky-50/60 to-white/60'
							: data.weathercode === 2 || data.weathercode === 3
							? 'bg-gradient-to-b from-slate-300/60 via-slate-100/60 to-white/60'
							: data.weathercode >= 61 && data.weathercode <= 67
							? 'bg-gradient-to-b from-blue-900/40 via-blue-600/40 to-blue-300/40'
							: 'bg-gradient-to-b from-indigo-100/60 via-white/60 to-white/60'
						}`
				}
			>
			<div className="max-w-xl mx-auto px-4 py-10">
				<header className="mb-6 text-center">
					<h1 className="text-4xl font-semibold tracking-tight text-slate-900">Weather Now</h1>
					<p className="text-sm text-slate-600 mt-1">Quickly check current conditions anywhere</p>
				</header>
				<SearchBar onSearch={onSearch} loading={loading} />
				{error && (
					<div className="mt-4 p-3 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-sm">{error}</div>
				)}
				{!error && !loading && data && (
					<div className="mt-6 mx-auto max-w-md">
						<WeatherCard data={data} />
						{forecast && <ForecastRow days={forecast} />}
					</div>
				)}
			</div>
			</div>
		</div>
	)
}

export default App


