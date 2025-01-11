import { motion } from "motion/react"
import { RefObject } from "react"
import { transition } from "@/utils/motionUtils"
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"

interface INow {
	offsetFromTop: number
	isInteracting: RefObject<boolean>
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
			container: "bg-md-primary-fixed text-md-on-primary-fixed",
			state: "bg-md-on-primary-fixed",
		},
		secondary: {
			container: "bg-md-secondary-fixed text-md-on-secondary-fixed",
			state: "bg-md-on-secondary-fixed",
		},
		tertiary: {
			container: "bg-md-tertiary-fixed text-md-on-tertiary-fixed",
			state: "bg-md-on-tertiary-fixed",
		},
	}

	return (
		<div
			className={`flex flex-row items-center justify-left gap-2 text-md-primary text-sm font-sans tracking-normal rounded-full px-4 py-2 font-medium w-fit ${themes[props.role].container}`}
			data-oid="3stwyg:"
		>
			<MaterialSymbol icon={props.icon} fill size={20} data-oid="3:d41xa" />
			<span data-oid="pv_vwca">{props.text}</span>
		</div>
	)
}

export const Now = (props: INow) => {
	return (
		<motion.div
			className="absolute flex w-full h-fit px-4 mt-12 justify-end"
			style={{ top: `${props.offsetFromTop * 120}% ` }}
			initial={false}
			animate={{
				opacity: !props.isInteracting.current ? 1 : 0,
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
