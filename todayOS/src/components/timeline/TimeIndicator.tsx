import { motion } from "framer-motion"
import { transition } from "@/utils/motionUtils"
import { useMemo } from 'react'

export interface ITimeIndicator {
	time: Date
	isActive: boolean
	className?: string
}

export const TimeIndicator = (props: ITimeIndicator) => {
	const { time, isActive, className } = props

	// Memoize the date and time strings to prevent unnecessary recalculations
	const { dateString, timeString, timeWithoutPeriod, period } = useMemo(() => {
		const dateStr = time.toLocaleDateString([], {
			weekday: "short",
			month: "short",
			day: "numeric",
		})
		const timeStr = time.toLocaleTimeString([], {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		})
		const timeWithoutPrd = timeStr.match(/(\d+:\d+)/)?.[0] || ""
		const prd = timeStr.replace(timeWithoutPrd, "").trim()

		return {
			dateString: dateStr,
			timeString: timeStr,
			timeWithoutPeriod: timeWithoutPrd,
			period: prd
		}
	}, [time])

	return (
		<motion.div
			className={`flex flex-col gap-4 w-full h-fit px-4 ${className}`}
			// Current V1: Tap the indicator to trigger isActive state
			// TODO: V2: Scroll the blank space to trigger isActive state
		>
			<div className="flex justify-left items-center w-full h-fit gap-4">
				<motion.div
					className="flex justify-center items-center bg-md-error rounded-full text-md-on-error text-xs font-display font-medium tracking-normal z-[5] text-nowrap"
					initial={false}
					animate={{
						width: isActive ? "fit-content" : "0",
						height: isActive ? "fit-content" : "0",
						paddingLeft: isActive ? "1rem" : "0",
						paddingRight: isActive ? "1rem" : "0",
						paddingTop: isActive ? "0.5rem" : "0",
						paddingBottom: isActive ? "0.5rem" : "0",
						fontSize: isActive ? "1rem" : "0.5rem",
					}}
					transition={transition.enter}
				>
					<motion.span
						animate={{
							opacity: isActive ? 1 : 0,
							scale: isActive ? 1 : 0,
						}}
						transition={transition.enter}
					>
						{timeString}
					</motion.span>
				</motion.div>
				<motion.div
					className="flex flex-col justify-center items-start z-50 w-full"
					animate={{
						opacity: isActive ? 0 : 1,
						x: isActive ? "20%" : "0%",
						transition: transition.enter,
					}}
					exit={{
						opacity: 0,
						x: "20%",
						transition: transition.exit,
					}}
				>
					<span className="text-md-on-surface-variant text-lg font-display font-medium tracking-normal">
						{dateString}
					</span>
					<div className="flex justify-center items-start gap-2 z-50">
						<motion.span
							className="text-md-on-surface text-8xl font-display font-extrabold tracking-normal"
							initial={{
								fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
							}}
							animate={{
								fontVariationSettings: !isActive
									? `'opsz' 24, 'wdth' 75, 'wght' 800`
									: `'opsz' 32, 'wdth' 75, 'wght' 200`,
								transition: transition.enter,
							}}
							exit={{
								fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
								transition: transition.exit,
							}}
						>
							{timeWithoutPeriod}
						</motion.span>
						<motion.span className="text-md-on-surface-variant text-xl font-display font-medium tracking-normal">
							{period}
						</motion.span>
					</div>
				</motion.div>
				<div className="absolute w-full h-0 left-0 border border-md-error" />
			</div>
		</motion.div>
	)
}
