import { AnimatePresence, motion, Variants } from "motion/react"
import { AppsDrawer } from "./AppsDrawer"
import { ClipboardDrawer } from "./ClipboardDrawer"
import { JustType } from "../justType/Base"
import { useState, memo } from "react"
import { transition } from "@/utils/motionUtils"
import { PeopleDrawer } from "./PeopleDrawer"

const OFFSET_THRESHOLD = 2000
const SCREEN_WIDTH = window.innerWidth
const DRAG_THRESHOLD = 50 // Threshold for vertical drag to close

const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity
}

// Memoized JustType to prevent re-renders
const MemoizedJustType = memo(JustType)

const drawers = [
	<AppsDrawer key="apps" />,
	<ClipboardDrawer key="clipboard" />,
	<PeopleDrawer key="people" />,
]

export const Drawers = () => {
	const [[drawerIndex, direction], setDrawer] = useState([0, 0])
	const [isDrawerOpen, setDrawerOpen] = useState(false)

	const paginate = (newDirection: number) => {
		setDrawer([drawerIndex + newDirection, newDirection])
	}

	const handleDragEnd = (
		e: UIEvent,
		{
			offset,
			velocity,
		}: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
	) => {
		console.log(e)
		// Handle horizontal swipe
		const swipeX = swipePower(offset.x, velocity.x)
		if (Math.abs(offset.x) > Math.abs(offset.y)) {
			if (swipeX < -OFFSET_THRESHOLD && drawerIndex < drawers.length - 1) {
				paginate(1)
			} else if (swipeX > OFFSET_THRESHOLD && drawerIndex > 0) {
				paginate(-1)
			}
		}

		// Handle vertical drag
		const swipeY = swipePower(offset.y, velocity.y)
		if (Math.abs(offset.y) > Math.abs(offset.x)) {
			if (Math.abs(offset.y) > DRAG_THRESHOLD) {
				// If dragging down, close the drawer
				if (swipeY > 0) {
					setDrawerOpen(false)
				}
				// If dragging up and drawer is closed, open it
				else if (swipeY < 0 && !isDrawerOpen) {
					setDrawerOpen(true)
				}
			}
		}
	}

	const drawersMotion: Variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
			y: 0,
			transition: transition.enter,
		}),
		center: {
			x: 0,
			y: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
			y: 0,
			transition: transition.exit,
		}),
	}

	const containerVariants: Variants = {
		initial: {
			y: "calc(100vh - 12em)",
		},
		animate: {
			y: isDrawerOpen ? "0" : "calc(100vh - 12rem)",
			transition: { type: "spring", stiffness: 300, damping: 40 },
		},
	}

	return (
		<motion.div
			className="w-full h-full fixed bottom-0 z-10 overflow-visible"
			variants={containerVariants}
			initial="initial"
			animate="animate"
		>
			<div className="w-full relative -top-5 flex justify-center items-center px-4 z-20">
				<MemoizedJustType />
			</div>
			<AnimatePresence mode="wait" custom={direction}>
				<motion.div
					key={drawerIndex}
					variants={drawersMotion}
					custom={direction}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					drag={true}
					dragDirectionLock
					onDirectionLock={(axis) => console.log(axis)}
					dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
					dragElastic={0.3}
					onDragEnd={handleDragEnd}
					inherit={false}
				>
					{drawers[drawerIndex]}
				</motion.div>
			</AnimatePresence>
		</motion.div>
	)
}
