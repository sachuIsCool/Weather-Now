export interface CoordinatesResult {
	latitude: number
	longitude: number
	displayName: string
}

// Use Nominatim (OpenStreetMap) free public API for geocoding
// Docs: https://nominatim.org/release-docs/develop/api/Search/
export async function fetchCoordinatesForCity(city: string): Promise<CoordinatesResult | null> {
	const params = new URLSearchParams({
		q: city,
		format: 'json',
		limit: '1',
		addressdetails: '0',
	})
	const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`
	const res = await fetch(url, {
		headers: {
			'Accept-Language': 'en',
			'User-Agent': 'WeatherNow/1.0 (educational app)'
		},
	})
	if (!res.ok) throw new Error('Geocoding request failed')
	const json = (await res.json()) as Array<any>
	if (!json.length) return null
	const first = json[0]
	return {
		latitude: parseFloat(first.lat),
		longitude: parseFloat(first.lon),
		displayName: typeof first.display_name === 'string' ? first.display_name.split(',')[0] : city,
	}
}


