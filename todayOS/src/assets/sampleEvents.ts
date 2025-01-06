export interface ITimelineEvent {
	id: string
	title: string
	startTime: Date
	endTime?: Date
	color: string
	description: string
}

const today = new Date()
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

export const sampleEvents: ITimelineEvent[] = [
	{
		id: "1",
		title: "Morning Coffee",
		startTime: new Date(today.setHours(8, 30)),
		endTime: new Date(today.setHours(9, 0)),
		color: "var(--md-sys-color-tertiary)",
		description: "Start the day right",
	},
	{
		id: "2",
		title: "Team Meeting",
		startTime: new Date(today.setHours(10, 0)),
		endTime: new Date(today.setHours(11, 0)),
		color: "var(--md-sys-color-primary)",
		description: "Weekly sync",
	},
	{
		id: "3",
		title: "Lunch Break",
		startTime: new Date(today.setHours(12, 30)),
		endTime: new Date(today.setHours(13, 30)),
		color: "var(--md-sys-color-secondary)",
		description: "Time to eat!",
	},
	{
		id: "4",
		title: "Team Meeting",
		startTime: new Date(tomorrow.setHours(14, 0)),
		endTime: new Date(tomorrow.setHours(15, 0)),
		color: "var(--md-sys-color-primary)",
		description: "Weekly sync",
	},
	{
		id: "5",
		title: "Afternoon Coffee",
		startTime: new Date(tomorrow.setHours(16, 0)),
		endTime: new Date(tomorrow.setHours(16, 30)),
		color: "var(--md-sys-color-tertiary)",
		description: "End the day right",
	},
]
