import { useState, type FormEvent } from 'react'

interface Props {
	onSearch: (value: string) => void
	loading?: boolean
}

export function SearchBar({ onSearch, loading = false }: Props) {
	const [value, setValue] = useState('')

	const submit = (e: FormEvent) => {
		e.preventDefault()
		onSearch(value)
	}

	return (
		<form onSubmit={submit} className="flex gap-2">
			<input
				type="text"
				placeholder="Enter city name (e.g., London)"
				className="flex-1 rounded-full border border-slate-300/70 bg-white/70 backdrop-blur px-4 py-3 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-sky-400"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<button
				type="submit"
				disabled={loading}
				className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:scale-[1.02] hover:bg-sky-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
			>
				{loading ? 'Searching...' : 'Search'}
			</button>
		</form>
	)
}


