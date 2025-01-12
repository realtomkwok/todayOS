import { motion } from "motion/react"
import { transition } from "@/utils/motionUtils"
import { RefObject } from "react"

interface IIndicator {
	offsetFromTop: number
	isInteracting: RefObject<boolean>
	isTimelineLocked: boolean
	displayTime: Date
}

export const Indicator = (props: IIndicator) => {
	const { offsetFromTop, isInteracting, isTimelineLocked, displayTime } = props

	const shouldShowInteractiveState = isTimelineLocked || isInteracting.current

	return (
		<div
			className="absolute left-4 right-0 flex items-center z-10"
			style={{ top: `${offsetFromTop * 100}%` }}
			data-oid="8nrwyyl"
		>
			{/* Pill Indicator */}
			<motion.div
				className="w-2 h-2 rounded-full bg-md-error -ml-1 flex justify-center items-center z-20"
				layout
				initial={false}
				animate={{
					width: shouldShowInteractiveState ? "fit-content" : "0.5rem",
					height: shouldShowInteractiveState ? "fit-content" : "0.5rem",
					padding: shouldShowInteractiveState ? "0.5rem 1rem" : "0",
					fontSize: shouldShowInteractiveState ? "1rem" : "0.5rem",
					transition: transition.enter,
				}}
				exit={{
					width: "0.5rem",
					height: "0.5rem",
					padding: "0",
					fontSize: "0.5rem",
					transition: transition.exit,
				}}
				data-oid="9p1ny.c"
			>
				<motion.span
					className="text-xs font-medium font-display text-md-on-error"
					initial={{
						opacity: 0,
						scale: 0,
					}}
					animate={{
						opacity: shouldShowInteractiveState ? 1 : 0,
						scale: shouldShowInteractiveState ? 1 : 0,
					}}
					transition={transition.enter}
					data-oid=".3-9cea"
				>
					{displayTime.toLocaleTimeString([], {
						hour: "numeric",
						minute: "2-digit",
						hour12: true,
					})}
				</motion.span>
			</motion.div>
			{/* Date and Time */}
			<motion.div
				className="absolute left-4 z-50 flex flex-col items-start"
				initial={false}
				animate={{
					opacity: shouldShowInteractiveState ? 0 : 1,
					transition: transition.enter,
				}}
				exit={{
					opacity: 0,
					transition: transition.exit,
				}}
				data-oid="73bzlck"
			>
				<motion.span
					className="absolute -top-6 text-md-on-surface-variant text-xl font-display font-medium tracking-normal"
					data-oid="a8svn2d"
				>
					{displayTime.toLocaleDateString("en-US", {
						weekday: "short",
						month: "short",
						day: "numeric",
					})}
				</motion.span>
				<div
					className={`flex justify-center gap-2 ${
						displayTime.getHours() < 12 //if AM, align to top, else align to bottom
							? "items-start "
							: "items-end"
					}`}
					data-oid="zpq30lm"
				>
					<motion.span
						className="text-md-on-surface text-8xl font-display font-extrabold tracking-normal"
						initial={{
							fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
						}}
						animate={{
							fontVariationSettings: !shouldShowInteractiveState
								? `'opsz' 24, 'wdth' 75, 'wght' 800`
								: `'opsz' 32, 'wdth' 75, 'wght' 200`,
							transition: transition.enter,
						}}
						exit={{
							fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
							transition: transition.exit,
						}}
						data-oid="db.xi-7"
					>
						{
							displayTime
								.toLocaleTimeString([], {
									hour: "numeric",
									minute: "2-digit",
									hour12: true,
								})
								.split(" ")[0]
						}
					</motion.span>
					<motion.span
						className="text-md-on-surface-variant text-xl font-display font-medium tracking-normal"
						data-oid="kg.4tgl"
					>
						{
							displayTime
								.toLocaleTimeString([], {
									hour: "numeric",
									minute: "2-digit",
									hour12: true,
								})
								.split(" ")[1]
						}
					</motion.span>
				</div>
			</motion.div>
			<div
				className="absolute w-screen -left-4 h-px bg-md-error flex-grow"
				data-oid="4jb80-k"
			/>
		</div>
	)
}
