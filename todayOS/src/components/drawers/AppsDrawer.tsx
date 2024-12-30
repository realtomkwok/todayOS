import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols"
import { BaseDrawer } from "./Base"
import { motion, Variants } from "motion/react"
import { transition } from "../../utils/motionUtils"

interface IApp {
	icon: SymbolCodepoints
	name: string
	role: "primary" | "secondary" | "tertiary"
}

export const AppIcon = (props: IApp) => {
	const appIconMotion: Variants = {
		initial: { scale: 1 },
		whileTap: { scale: 1.2, width: "50%", y: -64, transition: transition.onScreen },
    }

    const themes: Record<IApp["role"], string> = {
        primary: "bg-md-primary-fixed text-md-on-primary-fixed",
        secondary: "bg-md-secondary-fixed text-md-on-secondary-fixed",
        tertiary: "bg-md-tertiary-fixed text-md-on-tertiary-fixed",
    }

	return (
		<motion.div
			className={`${themes[props.role]} w-16 h-16 flex flex-col items-center justify-center rounded-full`}
			variants={appIconMotion}
			initial="initial"
			whileTap="whileTap"
		>
			<MaterialSymbol icon={props.icon} fill size={24} grade={200} />
			{/* <span className="text-xs">{props.name}</span> */}
		</motion.div>
	)
}

export const AppsDrawer = () => {
	const apps: IApp[] = [
		{ icon: "call", name: "Phone", role: "secondary" },
		{ icon: "forum", name: "Message", role: "secondary" },
		{ icon: "public", name: "Browser", role: "secondary" },
		{ icon: "feedback", name: "Feedback", role: "tertiary" },
	]

	return (
		<BaseDrawer>
			{/* Dock */}
			<div className="w-full md:w-fit flex flex-row justify-around gap-4">
				{apps.map((app) => (
                    <AppIcon
                        key={app.name}
						icon={app.icon}
						name={app.name}
						role={app.role}
					/>
				))}
			</div>
		</BaseDrawer>
	)
}
