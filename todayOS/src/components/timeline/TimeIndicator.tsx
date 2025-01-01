import { motion } from "motion/react"
import { transition } from "@/utils/motionUtils"

interface ITimeIndicator {
	date: string
	time: string
	period: string
	isActive: boolean
	className?: string
}

export const TimeIndicator = (props: ITimeIndicator) => {
	return (
		<motion.div
			className={`flex flex-col gap-4 w-full h-fit px-4 ${props.className}`}
			// Current V1: Tap the indicator to trigger isActive state
			// TODO: V2: Scroll the blank space to trigger isActive state
		>
			<div className="flex justify-left items-center w-full h-fit gap-4">
				<motion.div
					className="flex justify-center items-center bg-md-error rounded-full text-md-on-error text-xs font-display font-medium tracking-normal z-[5] text-nowrap"
					animate={{
						width: props.isActive ? "fit-content" : "0.5rem",
						height: props.isActive ? "fit-content" : "0.5rem",
						paddingLeft: props.isActive ? "1rem" : "0",
						paddingRight: props.isActive ? "1rem" : "0",
						paddingTop: props.isActive ? "0.5rem" : "0",
						paddingBottom: props.isActive ? "0.5rem" : "0",
						fontSize: props.isActive ? "1rem" : "0.5rem",
					}}
					transition={transition.enter}
				>
					<motion.span
						animate={{
							opacity: props.isActive ? 1 : 0,
							scale: props.isActive ? 1 : 0,
						}}
						transition={transition.enter}
					>
						{props.time} {props.period}
					</motion.span>
				</motion.div>
				<motion.div
					className="flex flex-col justify-center items-start z-50 w-full"
					animate={{
						opacity: props.isActive ? 0 : 1,
						x: props.isActive ? "20%" : "0%",
						transition: transition.enter,
					}}
					exit={{
						opacity: 0,
						x: "20%",
						transition: transition.exit,
					}}
				>
					<span className="text-md-on-surface-variant text-lg font-display font-medium tracking-normal">
						{props.date}
					</span>
					<div className="flex justify-center items-start gap-2 z-50">
						<motion.span
							className="text-md-on-surface text-8xl font-display font-extrabold tracking-normal"
							initial={{
								fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
							}}
							animate={{
								fontVariationSettings: !props.isActive
									? `'opsz' 24, 'wdth' 75, 'wght' 800`
									: `'opsz' 32, 'wdth' 75, 'wght' 200`,
								transition: transition.enter,
							}}
							exit={{
								fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
								transition: transition.exit,
							}}
						>
							{props.time}
						</motion.span>
						<motion.span className="text-md-on-surface-variant text-xl font-display font-medium tracking-normal">
							{props.period}
						</motion.span>
					</div>
				</motion.div>
				<div className="absolute w-full h-0 left-0 border border-md-error" />
			</div>
		</motion.div>
	)
}
