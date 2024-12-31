import { useNowTime } from "../../utils/getLiveTime"
import { Now } from "./blocks/Now"

export const Timeline = () => {
	const { time, period, hour } = useNowTime()

	return (
		<div className="relative w-full h-screen bg-md-surface flex flex-col items-left justify-start overflow-auto">
			{/* Top gradient overlay */}
			<div className="fixed top-0 left-0 w-full h-48 bg-gradient-to-b from-md-surface to-transparent z-10" />

			<div className="flex justify-center items-end top-0 left-0 w-full h-fit pb-16 text-md-on-surface-variant">
				<div className="flex flex-row justify-between items-center gap-2 w-full">
					<div className="flex flex-row justify-start items-center gap-2 w-1/5 px-4">
						<span className="font-semibold">{hour - 1}</span>
						<span className="font-regular">{period}</span>
					</div>
					<div className="w-4/5 h-0 border border-md-outline-variant" />
				</div>
			</div>
			<Now className="fixed" time={time} period={period} />
			<div className="h-screen" />

			{/* Bottom gradient overlay */}
			<div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-md-surface to-transparent z-10" />
		</div>
	)
}
