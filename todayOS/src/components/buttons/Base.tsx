import { transition } from "@/utils/motionUtils"
import { HTMLMotionProps, motion } from "motion/react"
import { useState } from "react"

export type BaseButtonProps = {
    className?: string
    children?: React.ReactNode
} & HTMLMotionProps<"button">

export const BaseButton = ({
	className,
	children,
	...props
}: BaseButtonProps) => {
    const [isTap, setIsTap] = useState(false)

	return (
		<motion.button
			{...props}
			className={`flex flex-row items-center justify-center gap-2 w-fit h-fit overflow-clip ${
				className || ""
                }`}
            onTapStart={() => setIsTap(true)}
            onTap={() => setIsTap(false)}
            onTapCancel={() => setIsTap(false)}
		>
            <motion.div
                className="absolute inset-0 bg-md-on-primary-fixed rounded-[inherit] opacity-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTap ? 0.1 : 0 }}
			/>
			{children}
		</motion.button>
	)
}
