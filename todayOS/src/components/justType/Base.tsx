import { motion, AnimatePresence, MotionProps } from "framer-motion"
import { useState, useRef } from "react"
import { transition } from "@utils/motionUtils"
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"
import { BaseButton } from "@components/buttons/Base"
import { Variants } from "motion/react"

const suggestions: { icon: SymbolCodepoints; text: string }[] = [
	{ icon: "send", text: "Text Benji your ETA" },
	{ icon: "edit_calendar", text: "Plan a trip to the beach this weekend" },
	{ icon: "reminder", text: "Remind me to pick up groceries on the way home" },
]

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

	const containerVariants: Variants = {
		hidden: {
			opacity: 0,
			transition: {
				when: "beforeChildren",
				staggerDirection: -1,
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
		show: {
			opacity: 1,
			transition: {
				when: "beforeChildren",
				staggerDirection: -1,
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	}

	const itemsVariants: Variants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
			},
		},
	}

	const Inactive = (props: MotionProps) => {
		return (
			<motion.div
				className="absolute flex items-center justify-left bg-md-primary text-md-on-primary rounded-3xl z-[20] cursor-pointer"
				// onClick={handleActivate}
				whileTap={{ scale: 1.1, y: -8 }}
				{...props}
				onTap={handleActivate}
				onTapCancel={() => setIsActive(false)}
			>
				<span className="font-sans text-xs font-semibold tracking-tight italic w-fit text-nowrap px-4 py-2">
					Just type
				</span>
			</motion.div>
		)
	}

	const Active = (props: MotionProps) => {
		return (
			<motion.div
				className="absolute flex items-center justify-left bg-md-surface-container-high text-md-on-surface border border-md-outline-variant rounded-3xl overflow-hidden z-[100]"
				{...props}
			>
				<input
					ref={inputRef}
					placeholder="Just type... or ask me anything!"
					defaultValue={inputValue}
					type="text"
					className="w-full bg-transparent font-sans text-base font-medium tracking-wide outline-none px-4 py-2 placeholder:text-md-on-surface-variant placeholder:font-medium placeholder:text-md placeholder:tracking-tight placeholder:italic"
					autoComplete="off"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setInputValue(e.currentTarget.value)
						}
					}}
				/>
				<BaseButton className="bg-md-secondary-container text-md-on-secondary-container p-4 rounded-3xl mr-1 w-16">
					<MaterialSymbol icon="graphic_eq" fill size={20} />
				</BaseButton>
			</motion.div>
		)
	}

	return (
		<div className="w-full relative h-fit">
			<AnimatePresence mode="wait">
				{isActive && (
					<motion.div
						key="scrim"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.32 }}
						exit={{ opacity: 0 }}
						transition={transition.onScreen}
						className="fixed inset-0 bg-md-scrim z-[70]"
						onClick={() => setIsActive(false)}
					/>
				)}
			</AnimatePresence>
			<motion.div className="relative h-16 flex items-end justify-center">
				<AnimatePresence mode="sync">
					{isActive ? (
						<>
							<motion.ul
								key="active-container"
								className="relative -top-20 left-0 w-full h-fit flex flex-col gap-4 z-[90] "
								variants={containerVariants}
								initial="hidden"
								animate="show"
								exit="hidden"
							>
								{suggestions.map((suggestion, index) => (
									<motion.li
										key={index}
										variants={itemsVariants}
										className="relative flex items-center justify-left bg-md-surface-container-high text-md-on-surface-variant border border-md-outline-variant rounded-3xl z-[80] w-fit h-fit px-4 py-2 gap-2"
									>
										<span className="font-sans text-sm font-medium tracking-tight italic w-fit">
											{suggestion.text}
										</span>
									</motion.li>
								))}
							</motion.ul>
							<Active
								key="active"
								initial={{
									width: "60%",
									height: "2rem",
									opacity: 0.5,
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
						</>
					) : (
						<Inactive
							key="inactive"
							initial={{
								scale: 1.2,
								y: -12,
								opacity: 0,
							}}
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
