import { motion, AnimatePresence, MotionProps } from "framer-motion"
import { useState } from "react"
import { duration, easing, transition } from "../../utils/motionUtils"

export const JustType = () => {
	const [isWaiting, setIsWaiting] = useState(true)

	const Active = (props: MotionProps) => {
		return (
			<motion.div
				className="absolute flex items-center justify-left bg-md-primary-fixed text-md-on-primary-fixed rounded-3xl z-50"
				{...props}
			>
				<span className="font-sans text-xs font-medium tracking-tight w-fit text-nowrap px-4 py-2">
					Just type…
				</span>
			</motion.div>
		)
	}

	const Waiting = (props: MotionProps) => {
		return (
			<motion.div
				className="absolute flex items-center justify-left bg-md-primary-fixed text-md-on-primary-fixed rounded-3xl"
				onClick={() => setIsWaiting(false)}
				{...props}
			>
				<span className="font-mono text-xs font-medium tracking-tight w-fit text-nowrap px-4 py-2">
					Just type…
				</span>
			</motion.div>
		)
	}

	return (
		<div className="w-full relative">
			<AnimatePresence mode="wait">
				{!isWaiting && (
					<motion.div
						key="scrim"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.32 }}
						exit={{ opacity: 0 }}
						transition={transition.onScreen}
						className="fixed inset-0 bg-md-scrim"
						onClick={() => setIsWaiting(true)}
					/>
				)}
			</AnimatePresence>
			<motion.div className="relative h-16 flex items-end justify-center">
				<AnimatePresence mode="sync">
					{isWaiting ? (
						<Waiting
							key="waiting"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: duration.long1,
								easing: easing.emphasized,
							}}
							whileTap={{ scale: 1.2, y: -12 }}
						/>
					) : (
						<Active
							key="active"
							initial={{ opacity: 0, width: "60%", scale: 0.8, height: "4rem" }}
							animate={{ opacity: 1, width: "100%", scale: 1, height: "4rem" }}
							exit={{ opacity: 0, width: "60%", scale: 0.8, height: "4rem" }}
							transition={transition.onScreen}
						/>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}
