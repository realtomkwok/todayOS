import { HTMLMotionProps, motion } from "motion/react"

export type BaseButtonProps = {
    className?: string
    children?: React.ReactNode
} & HTMLMotionProps<"button">

export const BaseButton = ({
	className,
	children,
	...props
}: BaseButtonProps) => {
	return (
		<motion.button
			{...props}
			className={`flex flex-row items-center justify-center gap-2 ${
				className || ""
			}`}
        >
            {children}
		</motion.button>
	)
}
