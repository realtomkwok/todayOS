import { SymbolCodepoints } from "react-material-symbols"
import { MaterialSymbol } from "react-material-symbols"
import { BaseButton } from "./Base"
import { HTMLMotionProps, AnimatePresence } from "motion/react"

interface FABProps extends HTMLMotionProps<"button"> {
	icon: SymbolCodepoints
	text: string
	size: "small" | "regular" | "large"
	role: "primary" | "secondary" | "tertiary"
}
export const FAB = (props: FABProps) => {
	const { size, role, icon, text, ...rest } = props

	const themes: Record<
		FABProps["role"],
		Record<"container" | "state", string>
	> = {
		primary: {
			container: "bg-md-primary text-md-on-primary",
			state: "bg-md-on-primary",
		},
		secondary: {
			container: "bg-md-secondary text-md-on-secondary",
			state: "bg-md-on-secondary",
		},
		tertiary: {
			container: "bg-md-tertiary text-md-on-tertiary",
			state: "bg-md-on-tertiary",
		},
	}

	const styles: Record<FABProps["size"], string> = {
		small: "w-fit min-w-5 h-fit min-h-5 p-2 rounded-2xl",
		regular: "w-fit min-w-7 h-fit min-h-7 p-3 rounded-2xl",
		large: "w-fit min-w-12 h-fit min-h-12 p-4 rounded-2xl",
	}

	return (
		<AnimatePresence data-oid="vnkz3z-">
			<BaseButton
				className={`${themes[role].container} ${styles[size]}`}
				{...rest}
				data-oid="8u_abo4"
			>
				<MaterialSymbol fill icon={icon} data-oid=":7q2pvg" />
				<span
					className="text-sm font-sans font-medium tracking-normal"
					data-oid="_cpm3:t"
				>
					{text}
				</span>
			</BaseButton>
		</AnimatePresence>
	)
}
