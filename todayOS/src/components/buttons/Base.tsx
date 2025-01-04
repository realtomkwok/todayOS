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
            whileTap={{scale: 0.9}}
            onTapStart={() => setIsTap(true)}
            onTap={() => setIsTap(false)}
            onTapCancel={() => setIsTap(false)}
            transition={transition.onScreen}
		>
            <motion.div
                className="absolute inset-0 bg-md-on-primary-fixed rounded-[inherit] opacity-0"
                initial={{opacity: stateLayerOpacity.initial}}
                animate={{ opacity: isTap ? stateLayerOpacity.press : 0 }}
                transition={transition.enter}
			/>
			{children}
		</motion.button>
	)
}
