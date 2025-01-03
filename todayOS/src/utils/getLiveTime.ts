import { useState, useEffect } from 'react'

export function useNowTime() {
	const formatTime = (time: Date) => {
		const rawTime = date
		const dateString = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
		const timeString = date.toLocaleTimeString([], {
			hour: "numeric",
			 minute: "2-digit",
			 hour12: true,
		})
		const timeMatch = timeString.match(/(\d+:\d+)/)
		const time = timeMatch?.[0] || ''
		const hour = time
		const minute = Number(time.split(':')[1])
		const period = timeString.replace(time, '').trim()
		return { hour, minute, period, dateString, timeString, rawTime }
	}

	const [timeData, setTimeData] = useState(formatTime(new Date()))

	useEffect(() => {
		// Calculate ms until next minute
		const now = new Date()
		const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()

		// Initial timeout to sync with minute boundary
		const initialTimeout = setTimeout(() => {
			setTimeData(formatTime(new Date()))
			
			// Then set interval to run every minute
			const interval = setInterval(() => {
				setTimeData(formatTime(new Date()))
			}, 60000)
			
			return () => clearInterval(interval)
		}, msUntilNextMinute)

		return () => clearTimeout(initialTimeout)
	}, [])

	return timeData
}