import { motion } from "motion/react"
import { RefObject } from "react"
import { transition } from "@/utils/motionUtils"
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"

interface INow {
	offsetFromTop: number
	isInteracting: RefObject<boolean>
	isTimelineLocked: boolean
}

const Glanceable = (props: {
	icon: SymbolCodepoints
	text: string
	state: string
	role: "primary" | "secondary" | "tertiary"
}) => {
	const themes: Record<
		"primary" | "secondary" | "tertiary",
		Record<"container" | "state", string>
	> = {
		primary: {
			container: "bg-md-primary-container text-md-on-primary-container",
			state: "bg-md-on-primary-container",
		},
		secondary: {
			container: "bg-md-secondary-container text-md-on-secondary-container",
			state: "bg-md-on-secondary-container",
		},
		tertiary: {
			container: "bg-md-tertiary-container text-md-on-tertiary-container",
			state: "bg-md-on-tertiary-container",
		},
	}

	return (
		<div
			className={`flex flex-row items-center justify-left gap-2 text-sm font-sans tracking-normal rounded-full px-4 py-2 font-medium w-fit ${themes[props.role].container}`}
		>
			<MaterialSymbol icon={props.icon} fill size={20} data-oid="3:d41xa" />
			<span>{props.text}</span>
		</div>
	)
}

export const Now = (props: INow) => {
	const { offsetFromTop, isInteracting, isTimelineLocked } = props

	// Only show when neither locked nor interacting
	const shouldShow = !isTimelineLocked && !isInteracting.current

	return (
		<motion.div
			className="absolute flex w-full h-fit px-4 mt-12 justify-end"
			style={{ top: `${offsetFromTop * 120}% ` }}
			initial={false}
			animate={{
				opacity: shouldShow ? 1 : 0,
				transition: transition.enter,
			}}
			exit={{
				opacity: 0,
				transition: transition.exit,
			}}
			data-oid="y:jwpre"
		>
			<div
				className="flex flex-col items-start justify-center w-2/3 h-full"
				data-oid="t8a7xwi"
			>
				<Glanceable
					icon="rainy"
					text="Showers in 10 minutes"
					role="primary"
					state="primary"
					data-oid="nx4ltvq"
				/>
			</div>
		</motion.div>
	)
}
