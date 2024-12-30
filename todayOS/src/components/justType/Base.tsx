import { motion, AnimatePresence, MotionProps } from "framer-motion"
import { useState, useRef } from "react"
import { transition } from "../../utils/motionUtils"

export const JustType = () => {
	const [isActive, setIsActive] = useState(false)
	const [inputValue, setInputValue] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

	const handleActivate = () => {
		setIsActive(true)
		setTimeout(() => {
			inputRef.current?.focus()
		}, 100) // Small delay to ensure animation starts before focus
	}

	const Inactive = (props: MotionProps) => {
		return (
			<motion.div
				className="absolute flex items-center justify-left bg-md-primary-fixed text-md-on-primary-fixed rounded-3xl z-[20] cursor-pointer"
				onClick={handleActivate}
				whileTap={{ scale: 1.1, y: -8 }}
				{...props}
			>
				<span className="font-mono text-xs font-medium tracking-tight w-fit text-nowrap px-4 py-2">
					Just type…
				</span>
			</motion.div>
		)
	}

	const Active = (props: MotionProps) => {
		return (
			<motion.div
				className="absolute flex items-center justify-left bg-md-surface-container-high text-md-on-surface rounded-3xl overflow-hidden z-[100]"
				{...props}
			>
				<input
					ref={inputRef}
					placeholder='Just type...'
					defaultValue={inputValue}
					type="text"
					className="w-full bg-transparent font-sans text-md font-regular tracking-wide outline-none px-4 py-2 placeholder:text-md-on-primary-variant placeholder:font-medium placeholder:text-sm placeholder:tracking-tightest"
					autoComplete="off"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setInputValue(e.currentTarget.value)
						}
					}}
					
				/>
			</motion.div>
		)
	}

	return (
		<div className="w-full relative">
			<AnimatePresence mode="wait">
				{isActive && (
					<motion.div
						key="scrim"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.32 }}
						exit={{ opacity: 0 }}
						transition={transition.onScreen}
						className="fixed inset-0 bg-md-scrim z-[99]"
						onClick={() => setIsActive(false)}
					/>
				)}
			</AnimatePresence>
			<motion.div className="relative h-16 flex items-end justify-center">
				<AnimatePresence mode="sync">
					{isActive ? (
						<Active
							key="active"
							initial={{
								width: "60%",
								height: "2rem",
								opacity: 0,
							}}
							animate={{
								width: "100%",
								height: "4rem",
								opacity: 1,
								transition: transition.enter,
							}}
							exit={{
								width: "60%",
								height: "2rem",
								opacity: 0,
								transition: transition.exit,
							}}
						/>
					) : (
						<Inactive
							key="inactive"
							initial={{ scale: 1.2, y: -12, opacity: 0 }}
							animate={{
								scale: 1,
								y: 0,
								opacity: 1,
								transition: transition.enter,
							}}
							exit={{
								scale: 0.5,
								y: 12,
								opacity: 0,
								transition: transition.exit,
							}}
						/>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}
