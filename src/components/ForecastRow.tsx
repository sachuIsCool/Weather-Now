import { Cloud, CloudFog, CloudLightning, CloudRain, Sun } from 'lucide-react'
import type { ForecastDay } from '../services/weather'

function iconFor(code: number) {
	if (code === 0 || code === 1) return <Sun className="h-5 w-5 text-amber-500" />
	if (code === 2 || code === 3) return <Cloud className="h-5 w-5 text-slate-500" />
	if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
		return <CloudRain className="h-5 w-5 text-sky-600" />
	if (code === 45 || code === 48) return <CloudFog className="h-5 w-5 text-slate-400" />
	if (code >= 95) return <CloudLightning className="h-5 w-5 text-indigo-600" />
	return <Cloud className="h-5 w-5 text-slate-500" />
}

function dayName(dateStr: string) {
	const d = new Date(dateStr)
	return d.toLocaleDateString(undefined, { weekday: 'short' })
}

export function ForecastRow({ days }: { days: ForecastDay[] }) {
	return (
		<div className="mt-5 grid grid-cols-5 gap-3">
			{days.map((d) => (
				<div
					key={d.date}
					className="rounded-xl bg-white/30 backdrop-blur hover:bg-white/40 transition shadow-sm border border-white/30 p-3 text-center"
				>
					<div className="text-xs text-slate-700 mb-1">{dayName(d.date)}</div>
					<div className="flex items-center justify-center mb-1">{iconFor(d.weathercode)}</div>
					<div className="text-[13px] text-slate-800">
						<span className="font-semibold">{Math.round(d.max)}°</span>
						<span className="text-slate-600"> / {Math.round(d.min)}°</span>
					</div>
				</div>
			))}
		</div>
	)
}


