import { useNowTime } from "../../utils/getLiveTime"
import { Now } from "./TimeIndicator"
import { Glanceables } from "./glanceables/Base"
export const Timeline = () => {
	const { time, period, hour, dateString } = useNowTime()
    
	return (
		<div className="relative w-full h-full bg-md-surface flex flex-col items-left justify-start">
			{/* Top gradient overlay */}
			<div className="fixed top-0 left-0 w-full h-48 bg-gradient-to-b from-md-surface to-transparent z-10" />
			<div className="flex justify-center items-end top-0 left-0 w-full h-fit pb-16 text-md-on-surface-variant">
				<div className="flex flex-row justify-between items-center gap-2 w-full">
					<div className="flex flex-row justify-start items-center gap-2 w-1/5 px-4">
						<span className="font-semibold">{hour - 1}</span>
						<span className="font-regular">{period}</span>
					</div>
				</div>
			</div>
            <Now date={dateString} time={time} period={period} />
            <div className="flex flex-col justify-center items-start gap-4 w-full h-fit pl-6">
                <Glanceables isActive={true} icon="rainy" text="Drizzle in 15 min" />
                <Glanceables isActive={true} icon="event" text="Pick up groceries in 20 min" />
                <Glanceables isActive={false} icon="event" text="Pick up groceries in 20 min" />
            </div>
			<div className="h-screen" />

			{/* Bottom gradient overlay */}
			<div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-md-surface to-transparent z-10" />
		</div>
	)
}
