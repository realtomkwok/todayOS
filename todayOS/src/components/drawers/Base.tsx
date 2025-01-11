import { motion, MotionProps } from "motion/react"
import React from "react"

export const BaseDrawer = ({
	props,
	children,
}: {
	props?: MotionProps
	children: React.ReactNode
}) => {
	return (
		<div className="w-screen h-screen flex flex-col gap-4 items-center flex-shrink-0">
			<motion.div
				className="w-full px-4 pt-4 rounded-tl-[32px] rounded-tr-[32px] flex flex-col bg-md-surface-container-high items-center h-[958px]"
				{...props}
			>
				{/* Drag Handle */}
				<div className="flex justify-center mb-4">
					<div className="w-8 h-1 rounded-full bg-md-outline-variant" />
				</div>
				{children}
				{/* Gesture Bar */}
				<div className="flex justify-center w-full h-10 pb-10" />
			</motion.div>
		</div>
	)
}
