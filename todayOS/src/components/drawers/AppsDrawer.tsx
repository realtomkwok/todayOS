import { BaseDrawer } from "./Base"
import { motion } from "motion/react"

export const AppsDrawer = ({ drawerIsOpen }: { drawerIsOpen: boolean }) => {
	return (
		<BaseDrawer>
			<motion.div>
				<h1>Apps</h1>
				<p>Drawer is open: {drawerIsOpen ? "true" : "false"}</p>
				{/*<Music />*/}
			</motion.div>
		</BaseDrawer>
	)
}
