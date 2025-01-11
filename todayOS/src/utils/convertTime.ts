export const convertHourToString = (hour: number, is12Hour = true) => {
	if (is12Hour) {
		const period = hour < 12 ? "AM" : "PM"
		const hour12 = hour % 12 || 12
		return `${hour12.toString()} ${period}`
	}

	return `${hour.toString().padStart(2, "0")}:00`
}
