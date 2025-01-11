import { motion } from "motion/react"
import { ITimelineEvent } from "@/assets/sampleEvents"

export interface IEvent extends ITimelineEvent {
	position: number
	eventHeight: number
}

export const Event = (event: IEvent) => {
	const { position: eventPosition, eventHeight } = event

	return (
		<motion.div
			key={event.id}
			className="absolute left-32 right-4 rounded-xl p-3 overflow-clip bg-md-surface-container-low justify-start border-b-4"
			style={{
				top: `${eventPosition}px`,
				height: `${eventHeight}px`,
				borderColor: event.color,
			}}
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.3 }}
			data-oid="5j0rwva"
		>
			<div className="flex flex-col" data-oid="b3q-:36">
				<div
					className="inline-block text-md-on-surface-container text-xs font-sans tracking-normal"
					data-oid="az0:zcu"
				>
					<span className="" data-oid=".iw.q:b">
						{event.startTime.toLocaleTimeString([], {
							hour: "numeric",
							minute: "2-digit",
						})}
						{" - "}
						{event.endTime?.toLocaleTimeString([], {
							hour: "numeric",
							minute: "2-digit",
						})}
					</span>
				</div>
				<h3
					className="text-md-on-surface-container font-display font-medium text-sm"
					data-oid="9:grl8j"
				>
					{event.title}
				</h3>
				{event.description && (
					<p
						className="text-md-on-surface-container text-xs"
						data-oid="psi642:"
					>
						{event.description}
					</p>
				)}
			</div>
		</motion.div>
	)
}
