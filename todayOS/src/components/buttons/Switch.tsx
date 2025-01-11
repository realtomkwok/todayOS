import { transition } from "@/utils/motionUtils"
import { motion, HTMLMotionProps } from "motion/react"
import { useState } from "react"
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"

interface ISwitch extends HTMLMotionProps<"button"> {
	icon: SymbolCodepoints
	label?: string
	hasIcon: boolean
	state: "on" | "off"
}

export const Switch = ({ icon, hasIcon, state, ...props }: ISwitch) => {
	const [isPressed, setIsPressed] = useState(false)

	const themes: Record<
		"on" | "off",
		Record<"track" | "handle" | "icon", string>
	> = {
		on: {
			track: "bg-md-primary",
			handle: "w-6 h-6 bg-md-on-primary",
			icon: "text-md-on-primary-container",
		},
		off: {
			track:
				"bg-md-surface-container-highest outline outline-2 outline-md-outline",
			handle: "w-6 h-6 bg-md-outline",
			icon: "text-md-on-surface-container-highest",
		},
	}

	return (
		<motion.button
			className={`w-14 h-8 rounded-full flex items-center p-1 relative ${themes[state].track}`}
			{...props}
			onTapStart={() => setIsPressed(true)}
			onTap={() => {
				setIsPressed(false)
			}}
			onTapCancel={() => setIsPressed(false)}
			style={{
				justifyContent: `flex-${state === "on" ? "end" : "start"}`,
			}}
			layout
		>
			<motion.div
				className={`rounded-full flex items-center justify-center left-1 ${themes[state].handle}`}
				initial={false}
				animate={{
					scale: isPressed ? 1.1 : 1,
					transition: isPressed ? transition.enter : transition.exit,
				}}
				layout
				transition={transition.enter}
			>
				{hasIcon && (
					<MaterialSymbol
						icon={icon}
						fill
						size={16}
						className={`${themes[state].icon} w-4 h-4`}
					/>
				)}
			</motion.div>
		</motion.button>
	)
}
