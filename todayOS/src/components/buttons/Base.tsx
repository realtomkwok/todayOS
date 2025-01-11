import { HTMLMotionProps, motion } from "motion/react"
import { useState } from "react"
import { stateLayerOpacity, transition } from "@/utils/motionUtils"

export interface IBaseButton extends HTMLMotionProps<"button"> {
	className?: string
	children?: React.ReactNode
}

export const BaseButton = ({ className, children, ...props }: IBaseButton) => {
	const [isTap, setIsTap] = useState(false)

	return (
		<motion.button
			{...props}
			className={`flex flex-row items-center justify-center gap-2 w-fit h-fit overflow-clip ${
				className ?? ""
			}`}
			whileTap={{ scale: 1.1 }}
			onTapStart={() => setIsTap(true)}
			onTap={() => setIsTap(false)}
			onTapCancel={() => setIsTap(false)}
			transition={transition.enter}
			data-oid="j-7chq4"
		>
			<motion.div
				className="absolute inset-0 bg-md-on-primary-fixed rounded-[inherit] opacity-0 w-full h-full"
				initial={{ opacity: stateLayerOpacity.initial }}
				animate={{ opacity: isTap ? stateLayerOpacity.press : 0 }}
				transition={transition.enter}
				data-oid="0queo-c"
			/>

			{children}
		</motion.button>
	)
}
