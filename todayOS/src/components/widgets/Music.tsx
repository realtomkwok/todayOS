import { motion } from "motion/react"
import { MaterialSymbol } from "react-material-symbols"

export const Music = () => {
	return (
		<motion.div className="w-48 h-48 flex flex-col rounded-3xl bg-md-primary-container p-4">
			<MaterialSymbol
				icon="music_note"
				size={24}
				className="text-md-on-primary-container"
			/>
			<div className="flex flex-col gap-2">
				<h2 className="text-md-on-primary-container">Music</h2>
				<p className="text-md-on-primary-container">
					Currently playing:{" "}
					<span className="text-md-on-primary-container">Nothing</span>
				</p>
			</div>
		</motion.div>
	)
}
