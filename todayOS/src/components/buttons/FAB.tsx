import { SymbolCodepoints } from "react-material-symbols"
import { MaterialSymbol } from "react-material-symbols"
import { BaseButton } from "./Base"
import { HTMLMotionProps, AnimatePresence } from "motion/react"

interface FABProps extends HTMLMotionProps<"button"> {
	icon: SymbolCodepoints
	iconAlt?: SymbolCodepoints
	text?: string
	textAlt?: string
	isAlt?: boolean

	size: "small" | "regular" | "large"
	role: "primary" | "secondary" | "tertiary"
}
export const FAB = (props: FABProps) => {
	const { size, role, icon, text, iconAlt, textAlt, isAlt, ...rest } = props

	const themes: Record<
		FABProps["role"],
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

	const styles: Record<FABProps["size"], string> = {
		small: "w-fit min-w-5 h-fit min-h-5 p-2 rounded-2xl",
		regular: "w-fit min-w-7 h-fit min-h-7 p-3 rounded-2xl",
		large: "w-fit min-w-12 h-fit min-h-12 p-4 rounded-2xl",
	}

    return (
		<AnimatePresence>
			<BaseButton
				className={`bg-primary-container text-primary ${themes[role].container} ${styles[size]}`}
				{...rest}
			>
				{isAlt && iconAlt ? (
					<MaterialSymbol fill icon={iconAlt} />
				) : (
					<MaterialSymbol fill icon={icon} />
                )}

				{isAlt && textAlt ? (
					<span className="text-md-on-surface-variant text-sm font-display font-medium tracking-normal">
						{textAlt}
					</span>
				) : (
					<span className="text-md-on-surface-variant text-sm font-display font-medium tracking-normal">
						{text}
					</span>
				)}
			</BaseButton>
		</AnimatePresence>
	)
}
