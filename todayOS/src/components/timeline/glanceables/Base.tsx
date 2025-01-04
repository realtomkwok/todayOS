import { motion } from "framer-motion"
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"

interface IGlanceables {
	isActive: boolean
	icon: SymbolCodepoints
	text: string
}

export const Glanceables = (props: IGlanceables) => {
	const { isActive, icon, text } = props
	
	return (
		<motion.div
			className={`flex flex-row justify-center items-center gap-1 w-fit h-fit ${
				props.isActive
					? "bg-md-primary-container text-md-on-primary-container rounded-full px-3 py-1 font-medium text-base"
					: "text-md-on-surface-variant px-2 font-normal text-sm"
			}`}
		>
			<MaterialSymbol
				icon={icon}
				size={isActive ? 20 : 16}
				grade={isActive ? -25 : 0}
			/>
			<span>{text}</span>
		</motion.div>
	)
}
