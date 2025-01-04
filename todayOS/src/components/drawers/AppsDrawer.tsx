import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"
import { BaseDrawer } from "./Base"
import { motion, Variants, useAnimationControls } from "motion/react"
import { transition } from "@utils/motionUtils.ts"

interface IApp {
	icon: SymbolCodepoints
	name: string
	role: "primary" | "secondary" | "tertiary"
	state: "enabled" | "disabled"
}

export const App = (props: IApp) => {

	const textAnimationControl = useAnimationControls()
	const stateAnimationControl = useAnimationControls()

	const stateMotion: Variants = {
		initial: {
			opacity: 0,
		},
		hover: {
			opacity: 0.8,
		},
		pressed: {
			opacity: 0.10,
		},
		drag: {
			opacity: 0.16,
		},
	}

	const textMotion: Variants = {
		hidden: {
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

	const handleTapStart = () => {
		textAnimationControl.start("visible")
		stateAnimationControl.start("pressed")
	}

	const handleTapCancel = () => {
		textAnimationControl.start("hidden")
		stateAnimationControl.start("initial")
	}

	const themes: Record<IApp["role"], Record<"container" | "state", string>> = {
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

	const AppIcon = (props: IApp) => {
		return (
			// Container
			<div
				className={`${
					themes[props.role]["container"]
				} flex flex-col items-center justify-center rounded-full overflow-hidden w-full h-full relative`}
			>
				{/* Icon */}
				<MaterialSymbol
					icon={props.icon}
					fill
					size={24}
					grade={200}
					className="z-10"
				/>
				{/* State Layer */}
				<motion.div
					className={`absolute inset-0 ${
						themes[props.role]["state"]
					} rounded-full`}
					variants={stateMotion}
					initial="initial"
					animate={stateAnimationControl}
				/>
			</div>
		)
	}

	return (
		<motion.div
			className="flex flex-col justify-center items-center basis-1/4 min-w-16"
			whileTap={{
					flexBasis: "50%",
					y: -24,
					zIndex: 100,
					// transition: transition.enter,
			}}
			onTapStart={handleTapStart}
			onTap={handleTapCancel}
			onTapCancel={handleTapCancel}
			>
			<motion.span
				className="relative -top-10 py-1 px-3 rounded-full text-2xs font-sans font-semibold tracking-normal bg-md-surface-container-highest text-md-on-surface-variant"
				variants={textMotion}
				initial="hidden"
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
		{ icon: "call", name: "Phone", role: "primary" },
		{ icon: "forum", name: "Message", role: "primary" },
		{ icon: "public", name: "Browser", role: "primary" },
		{ icon: "waving_hand", name: "Hey!", role: "tertiary" },
	]

	return (
		<BaseDrawer>
			{/* Dock */}
			<div className="w-full md:w-fit flex flex-row justify-between gap-4 h-16">
				{apps.map((app) => (
					<App
						key={app.name}
						icon={app.icon}
						name={app.name}
						role={app.role}
						state="enabled"
					/>
				))}
			</div>
		</BaseDrawer>
	)
}
