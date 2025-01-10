import {
	AnimatePresence,
	motion,
	useMotionValue,
	useTransform,
} from "motion/react"
import { AppsDrawer } from "./AppsDrawer"
import { ClipboardDrawer } from "./ClipboardDrawer"
import { JustType } from "../justType/Base"
import { useState } from "react"
import { transition } from "@/utils/motionUtils"
import { PeopleDrawer } from "./PeopleDrawer"

const OFFSET_THRESHOLD = 200

export const Drawers = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [slideDirection, setSlideDirection] = useState<"left" | "right">(
		"right"
	)
	const drawers = [
		<AppsDrawer key="apps" />,
		<ClipboardDrawer key="clipboard" />,
		<PeopleDrawer key="people" />,
	]

	const x = useMotionValue(0)
	const dragConstraints = { left: 0, right: 0 }

	// const opacity = useTransform(
	// 	x,
	// 	[-OFFSET_THRESHOLD * 2, 0, OFFSET_THRESHOLD * 2],
	// 	[0.9, 1, 0.9]
	// )

	const handleDragEnd = (e: UIEvent, info: { offset: { x: number } }) => {
		const swipeDistance = info.offset.x

		console.log(e)

		if (Math.abs(swipeDistance) > OFFSET_THRESHOLD) {
			if (swipeDistance > 0 && currentIndex > 0) {
				setSlideDirection("right")
				setCurrentIndex(currentIndex - 1)
			} else if (swipeDistance < 0 && currentIndex < drawers.length - 1) {
				setSlideDirection("left")
				setCurrentIndex(currentIndex + 1)
			}
		}
		x.set(0)
	}

	return (
		<motion.div className="w-full h-full fixed bottom-0 z-10 overflow-visible">
			<div className="w-full relative -top-5 flex justify-center items-center px-4 z-20">
				<JustType />
			</div>
			<motion.div
				className="w-screen flex flex-row gap-2 relative z-0"
				style={{
					touchAction: "pan-x",
					x,
				}}
				drag="x"
				dragConstraints={dragConstraints}
				dragElastic={0.3}
				onDragEnd={handleDragEnd}
			>
				<AnimatePresence mode="wait" custom={slideDirection}>
					<motion.div
						key={currentIndex}
						// style={{ opacity }}
						initial={{
							x:
								slideDirection === "left"
									? OFFSET_THRESHOLD * 2
									: -OFFSET_THRESHOLD * 2,
						}}
						animate={{
							x: 0,
							transition: transition.enter,
						}}
						exit={{
							x:
								slideDirection === "left"
									? OFFSET_THRESHOLD * 2
									: -OFFSET_THRESHOLD * 2,
							transition: transition.exit,
						}}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						{drawers[currentIndex]}
					</motion.div>
				</AnimatePresence>
			</motion.div>
		</motion.div>
	)
}
