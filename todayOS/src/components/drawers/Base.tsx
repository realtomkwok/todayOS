import { motion, MotionProps } from "framer-motion";

export const BaseDrawer = ({
	props,
	children,
}: {
	props?: MotionProps
	children: React.ReactNode
}) => {
	return (
		<motion.div
			className="absolute bottom-0 w-full px-4 pt-4 pb-12 bg-md-surface-container-high rounded-3xl"
			{...props}
		>
			<div className="flex justify-center mb-4">
				<div className="w-8 h-1 rounded-full bg-md-outline-variant" />
			</div>
			{children}
		</motion.div>
	)
}
