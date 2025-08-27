import type { WeatherData } from '../App'
import { Sun, Cloud, CloudRain, CloudFog, CloudLightning } from 'lucide-react'

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

function iconFor(code: number) {
	if (code === 0 || code === 1) return <Sun className="h-10 w-10 text-amber-500" />
	if (code === 2 || code === 3) return <Cloud className="h-10 w-10 text-slate-500" />
	if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
		return <CloudRain className="h-10 w-10 text-sky-600" />
	if (code === 45 || code === 48) return <CloudFog className="h-10 w-10 text-slate-400" />
	if (code >= 95) return <CloudLightning className="h-10 w-10 text-indigo-600" />
	return <Cloud className="h-10 w-10 text-slate-500" />
}

export function WeatherCard({ data }: { data: WeatherData }) {
	const description = data.weatherDescription || weatherCodeMap[data.weathercode] || 'N/A'
	return (
		<div className="rounded-2xl border border-white/30 bg-white/30 backdrop-blur-md shadow-lg">
			<div className="p-6">
				<div className="text-[11px] uppercase tracking-[0.2em] text-slate-600 mb-2">{data.city}</div>
				<div className="flex items-center gap-4">
					<div className="flex items-end gap-3">
						<div className="text-6xl font-extrabold bg-gradient-to-tr from-slate-900 to-slate-600 text-transparent bg-clip-text">
							{Math.round(data.temperature)}°
						</div>
						{iconFor(data.weathercode)}
					</div>
					<div className="flex-1">
						<div className="text-slate-800 font-medium">{description}</div>
						<div className="text-sm text-slate-500">Wind: {Math.round(data.windspeed)} km/h</div>
					</div>
				</div>
			</div>
		</div>
	)
}


