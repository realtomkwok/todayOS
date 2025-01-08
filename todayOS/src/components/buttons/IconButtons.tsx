import { motion } from "motion/react"
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"
import { IBaseButton } from "./Base"

interface IIconButton extends IBaseButton {
	icon: SymbolCodepoints
	fill?: boolean
	style?: "filled" | "filled-tonal" | "outlined" | "standard"
	state?: "enabled" | "disabled" | "hovered" | "focused" | "pressed"
	isToggled?: boolean
}

export const IconButton = ({
	icon,
	fill,
	state = "enabled",
	style = "filled",
	isToggled,
	...props
}: IIconButton) => {
	const styles: Record<
		"filled" | "filled-tonal" | "outlined" | "standard",
		Record<"default" | "toggle", string>
	> = {
		filled: {
			default: "bg-md-primary text-md-on-primary",
			toggle: isToggled
				? "bg-md-primary text-md-on-primary"
				: "bg-md-surface-container-highest text-md-primary",
		},
		"filled-tonal": {
			default: "bg-md-secondary-container text-md-on-secondary-container",
			toggle: isToggled
				? "bg-md-secondary-container text-md-on-secondary-container"
				: "bg-md-surface-container-highest text-md-on-surface-variant",
		},
		outlined: {
			default: "outline outline-md-outline text-md-on-surface-variant",
			toggle: isToggled
				? "bg-md-inverse-surface text-md-on-inverse-surface"
				: "outline outline-md-outline text-md-on-surface-variant",
		},
		standard: {
			default: "text-md-on-surface-variants",
			toggle: isToggled ? "text-md-primary" : "text-md-on-surface-variants",
		},
	}

	return (
		<motion.button
			className={`w-10 h-10 rounded-full flex items-center justify-center ${styles[style][isToggled ? "toggle" : "default"]}`}
			{...props}
		>
			<MaterialSymbol icon={icon} fill={fill} size={24} />
		</motion.button>
	)
}
