import { motion } from "framer-motion"
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"

interface IGlanceables {
	isActive: boolean
	icon: SymbolCodepoints
	text: string
}

export const Glanceables = (props: IGlanceables) => {

	return (
		<motion.div
			className={`flex flex-row justify-center items-center py-1 gap-1 w-fit h-fit ${
				props.isActive
					? "bg-md-primary-container text-md-on-primary-container rounded-full px-4 font-medium text-base"
					: "text-md-on-surface-variant px-2 font-normal text-sm"
			}`}
		>
			<MaterialSymbol icon={props.icon} size={props.isActive ? 20 : 16} grade={props.isActive ? -25 : 0} />
			<span>{props.text}</span>
		</motion.div>
	)
}
