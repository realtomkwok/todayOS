import { motion } from "motion/react";
import { ITimelineEvent } from "@/assets/sampleEvents";

export interface IEvent extends ITimelineEvent {
    position: number;
    eventHeight: number;
}

export const Event = (event: IEvent) => {
    const {position: eventPosition, eventHeight } = event
    
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
		>
			<div className="flex flex-col">
				<div className="inline-block text-md-on-surface-container text-xs font-sans font-medium tracking-normal">
					<span className="">
						{event.startTime.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}{" - "}
						{event.endTime?.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
				</div>
				<h3 className="text-md-on-surface-container font-display font-medium">
					{event.title}
				</h3>
				{event.description && (
					<p className="text-md-on-surface-container text-sm">
						{event.description}
					</p>
				)}
			</div>
		</motion.div>
	)
}
