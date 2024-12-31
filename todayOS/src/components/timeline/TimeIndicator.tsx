import { motion } from "motion/react"

import { transition } from "@/utils/motionUtils"

export const Now = (props: { date: string, time: string, period: string } & React.HTMLAttributes<HTMLDivElement>) => {

    return (
		<div
			className={`relative flex flex-col gap-4 w-full h-fit px-4 ${props.className}`}
		>
			<div className="flex justify-left items-center w-full h-fit gap-4">
				<div className="w-2 h-2 bg-md-error rounded-full" />
				<div className="flex flex-col justify-center items-start gap-1 z-50">
					<span className="text-md-on-surface-variant text-lg font-display font-medium tracking-normal">
						{props.date}
					</span>
					<div className="flex justify-center items-start gap-2 z-50">
						<motion.span
							className="text-md-on-surface text-8xl font-display font-extrabold tracking-normal"
							initial={{
								fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
							}}
							animate={{
                                fontVariationSettings: `'opsz' 24, 'wdth' 75, 'wght' 800`,
                                transition: transition.enter
                            }}
						>
							{props.time}
						</motion.span>
						<motion.span className="text-md-on-surface-variant text-xl font-display font-medium tracking-normal">
							{props.period}
						</motion.span>
					</div>
				</div>
				<div className="absolute w-full h-0 left-0 border border-md-error" />
            </div>
            <div className="flex flex-col items-start w-full h-fit gap-2 ">
            </div>
		</div>
	)
}