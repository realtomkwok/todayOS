import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"
import { BaseDrawer } from "./Base"
import { motion, Variants, useAnimationControls } from "motion/react"
import { transition } from "../../utils/motionUtils"
import { useState } from "react"

interface IApp {
	icon: SymbolCodepoints
	name: string
	role: "primary" | "secondary" | "tertiary"
	state: "enabled" | "disabled" | "pressed" | "hover" | "focus" | "drag"
}

export const App = (props: IApp) => {
	const iconAnimationControl = useAnimationControls()
	const textAnimationControl = useAnimationControls()
	const stateAnimationControl = useAnimationControls()
	const [state, setState] = useState<IApp["state"]>(props.state)

	const iconMotion: Variants = {
		initial: {
			scale: 1,
		},
		pressed: {
			scale: 1.5,
		},
	}

	const textMotion: Variants = {
		initial: {
			display: "none",
			opacity: 0,
			fontSize: "1rem",
		},
		visible: {
			display: "block",
			position: "absolute",
			opacity: 1,
			fontSize: "1rem",
			transition: transition.enter,
		},
	}

	const stateMotion: Variants = {
		visable: {
			opacity: 0.32,
			transition: transition.enter,
		},
	}

	const handleTapStart = () => {
		textAnimationControl.start("visible")
		stateAnimationControl.start("visible")
		setState("pressed")
	}

	const handleTapCancel = () => {
		textAnimationControl.start("initial")
		stateAnimationControl.start("initial")
		setState("enabled")
	}

	const themes: Record<IApp["role"], Record<IApp["state"], string>> = {
		primary: {
			enabled: "bg-md-primary-fixed text-md-on-primary-fixed",
			disabled:
				"bg-md-primary-container-disabled text-md-on-primary-container-disabled",
			pressed:
				"bg-md-on-primary-fixed text-md-on-primary-fixed opacity-[10]",
			hover: "bg-md-on-primary-fixed text-md-on-primary-fixed opacity-[8]",
			focus: "bg-md-on-primary-fixed text-md-on-primary-fixed opacity-[10]",
			drag: "bg-md-on-primary-fixed text-md-on-primary-fixed opacity-[16]",
		},
		secondary: {
			enabled: "bg-md-secondary-fixed text-md-on-secondary-fixed",
			disabled:
				"bg-md-secondary-container-disabled text-md-on-secondary-container-disabled",
			pressed:
				"bg-md-on-secondary-fixed text-md-on-secondary-fixed opacity-10",
			hover: "bg-md-on-secondary-fixed text-md-on-secondary-fixed opacity-8",
			focus: "bg-md-on-secondary-fixed text-md-on-secondary-fixed opacity-10",
			drag: "bg-md-on-secondary-fixed text-md-on-secondary-fixed opacity-16",
		},
		tertiary: {
			enabled: "bg-md-tertiary-fixed text-md-on-tertiary-fixed",
			disabled:
				"bg-md-tertiary-container-disabled text-md-on-tertiary-container-disabled",
			pressed:
				"bg-md-on-tertiary-fixed text-md-on-tertiary-fixed opacity-10",
			hover: "bg-md-on-tertiary-fixed text-md-on-tertiary-fixed opacity-8",
			focus: "bg-md-on-tertiary-fixed text-md-on-tertiary-fixed opacity-10",
			drag: "bg-md-on-tertiary-fixed text-md-on-tertiary-fixed opacity-16",
		},
	}

	const AppIcon = (props: IApp) => {
		return (
			// Container
			<motion.div
				className={`${
					themes[props.role]["enabled"]
				} flex flex-col items-center justify-center rounded-full w-16 h-16`}
				variants={iconMotion}
				initial="initial"
				animate={iconAnimationControl}
			>
				{/* State Layer */}
				<motion.div
					className={`${
						themes[props.role][state]
					} absolute w-16 h-16 z-10 rounded-full`}
					variants={stateMotion}
					initial="visible"
					animate={stateAnimationControl}
				/>
				{/* Icon */}
				<MaterialSymbol
					icon={props.icon}
					fill
					size={24}
					grade={200}
					style={{ zIndex: 100 }}
				/>
			</motion.div>
		)
	}

	return (
		<motion.div
			className={`flex flex-col justify-center items-center`}
			whileTap={{
				width: "50%",
				y: -24,
				zIndex: 100,
				transition: transition.enter,
			}}
			onTapStart={handleTapStart}
			onTap={handleTapCancel}
			onTapCancel={handleTapCancel}
		>
			<motion.span
				className="relative -top-8 py-1 px-2 rounded-full text-xs font-sans font-medium bg-md-surface-container-highest text-md-on-surface-variant"
				variants={textMotion}
				initial="initial"
				animate={textAnimationControl}
			>
				{props.name}
			</motion.span>
			<AppIcon {...props} />
		</motion.div>
	)
}

export const AppsDrawer = () => {
	const apps: Omit<IApp, "state">[] = [
		{ icon: "call", name: "Phone", role: "secondary" },
		{ icon: "forum", name: "Message", role: "secondary" },
		{ icon: "public", name: "Browser", role: "secondary" },
		{ icon: "waving_hand", name: "Hey!", role: "tertiary" },
	]

	return (
		<BaseDrawer>
			{/* Dock */}
			<div className="w-full md:w-fit flex flex-row justify-around gap-4">
				{apps.map((app) => (
					<App
						key={app.name}
						icon={app.icon}
						name={app.name}
						role={app.role}
						state={"enabled"}
					/>
				))}
			</div>
		</BaseDrawer>
	)
}
