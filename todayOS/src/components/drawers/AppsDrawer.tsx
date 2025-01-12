import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"
import { BaseDrawer } from "./Base"
import {
	motion,
	Variants,
	useAnimationControls,
	AnimatePresence,
} from "motion/react"
import { transition } from "@/utils/motionUtils"
import { useState } from "react"

interface IApp {
	icon: SymbolCodepoints
	name: string
	role: "primary" | "secondary" | "tertiary"
	state: "enabled" | "disabled"
	drawerIsOpen: boolean
}

export const App = (props: IApp) => {
	const [isPressed, setIsPressed] = useState(false)

	const iconAnimationControl = useAnimationControls()
	const textAnimationControl = useAnimationControls()

	const iconMotion: Variants = {
		initial: {
			flexBasis: "25%",
			y: 0,
			zIndex: 10,
		},
		pressed: {
			flexBasis: "50%",
			y: -24,
			zIndex: 100,
		},
	}

	const stateMotion: Variants = {
		initial: {
			opacity: 0,
		},
		hover: {
			opacity: 0.8,
		},
		pressed: {
			opacity: 0.1,
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
		textAnimationControl.start("visible").catch(console.error)
		iconAnimationControl.start("pressed").catch(console.error)
		setIsPressed(true)
	}

	const handleTapCancel = () => {
		textAnimationControl.start("hidden").catch(console.error)
		iconAnimationControl.start("initial").catch(console.error)
		setIsPressed(false)
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
					themes[props.role].container
				} flex flex-col items-center justify-center rounded-full overflow-hidden relative px-4 w-full h-full min-w-16 min-h-16`}
			>
				{/* Icon */}
				<MaterialSymbol
					icon={props.icon}
					fill
					size={isPressed ? 32 : 24}
					grade={isPressed ? 0 : 200}
				/>

				{/* State Layer */}
				<motion.div
					className={`absolute inset-0 z-10 ${
						themes[props.role].state
					} rounded-full`}
					variants={stateMotion}
					initial="initial"
					animate={isPressed ? "pressed" : "initial"}
				/>
			</div>
		)
	}

	return (
		<AnimatePresence mode="sync">
			<motion.div
				className="flex flex-col justify-center items-center justify-self-center flex-[0_1_25%] gap-2"
				variants={iconMotion}
				initial="initial"
				animate={iconAnimationControl}
				onTapStart={handleTapStart}
				onTap={handleTapCancel}
				onTapCancel={handleTapCancel}
				onPanStart={handleTapStart}
				onPanEnd={handleTapCancel}
			>
				<motion.span
					className="relative -top-10 py-1 px-3 rounded-full text-2xs font-sans font-semibold tracking-normal bg-md-surface-container text-md-on-surface-variant"
					variants={textMotion}
					initial="hidden"
					animate={textAnimationControl}
				>
					{props.name}
				</motion.span>

				<AppIcon {...props} />
				{!isPressed && (
					<motion.span
						className="relative text-xs font-semibold text-wrap text-md-on-surface"
						initial={{ opacity: 0 }}
						animate={{
							height: props.drawerIsOpen ? "100%" : "0%",
							opacity: props.drawerIsOpen ? 1 : 0,
							transition: transition.enter,
						}}
					>
						{props.name}
					</motion.span>
				)}
			</motion.div>
		</AnimatePresence>
	)
}

type AppRow = Omit<IApp, "state" | "drawerIsMoving" | "drawerIsOpen">[]

export const AppsDrawer = ({ drawerIsOpen }: { drawerIsOpen: boolean }) => {
	const apps: AppRow = [
		{ icon: "call", name: "Phone", role: "primary" },
		{ icon: "forum", name: "Message", role: "primary" },
		{ icon: "public", name: "Browser", role: "primary" },
		{ icon: "waving_hand", name: "Hey!", role: "tertiary" },
		{ icon: "partly_cloudy_day", name: "Weather", role: "primary" },
		{ icon: "newspaper", name: "News", role: "primary" },
		{ icon: "music_note", name: "Music", role: "primary" },
		{ icon: "settings", name: "Settings", role: "primary" },
		{ icon: "schedule", name: "Clock", role: "primary" },
		{ icon: "calendar_month", name: "Calendar", role: "primary" },
		{ icon: "map", name: "Maps", role: "primary" },
		{ icon: "stacked_email", name: "Email", role: "primary" },
		{ icon: "photo_camera", name: "Camera", role: "primary" },
		{ icon: "yard", name: "Photos", role: "primary" },
		{ icon: "checklist", name: "Reminders", role: "primary" },
		{ icon: "sticky_note_2", name: "Notes", role: "primary" },
		{ icon: "calculate", name: "Calculator", role: "primary" },
		{ icon: "wallet", name: "Wallet", role: "primary" },
		{ icon: "finance_mode", name: "Stock", role: "primary" },
		{ icon: "storefront", name: "App Store", role: "primary" },
		{ icon: "ecg_heart", name: "Health", role: "primary" },
		{ icon: "search", name: "Search", role: "primary" },
		{ icon: "home_app_logo", name: "Home", role: "primary" },
		{ icon: "podcasts", name: "Podcasts", role: "primary" },
	]

	// Group apps into rows of 4
	const appsInRows = apps.reduce<AppRow[]>((rows, app, index) => {
		if (index % 4 === 0) {
			rows.push([app])
		} else {
			rows[rows.length - 1].push(app)
		}
		return rows
	}, [])

	return (
		<BaseDrawer>
			<div className="w-full sm:w-1/2 lg:w-1/3 grid auto-rows-fr gap-6">
				{appsInRows.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className="flex flex-row justify-between items-center gap-2"
					>
						{row.map((app) => (
							<App
								key={app.name}
								icon={app.icon}
								name={app.name}
								role={app.role}
								state="enabled"
								drawerIsOpen={drawerIsOpen}
							/>
						))}
					</div>
				))}
			</div>
		</BaseDrawer>
	)
}
