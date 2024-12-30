import { motion, MotionProps } from "framer-motion";
import { JustType } from "@components/justType/Base";

export const BaseDrawer = ({
	props,
	children,
}: {
	props?: MotionProps
	children: React.ReactNode
}) => {
    return (
        <div className="absolute bottom-0 w-screen flex flex-col gap-4 items-center z-10">
            <div className="w-full flex justify-center items-center px-4">
                <JustType />
            </div>
			<motion.div
				className="w-full px-4 pt-4 rounded-3xl flex flex-col bg-md-surface-container-high items-center"
				{...props}
			>
				<div className="flex justify-center mb-4">
					<div className="w-8 h-1 rounded-full bg-md-outline-variant" />
				</div>
                {children}
                {/* Gesture Bar */}
                <div className="flex justify-center w-full pb-10" />
			</motion.div>
		</div>
	)
}