import { convertHourToString } from "@/utils/convertTime"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "motion/react"
import { transition } from "@/utils/motionUtils"

const MIN_HOUR_HEIGHT = 120
const OFFSET_FROM_TOP = 0.4
const HOUR_LABEL_HEIGHT = 16 // Approximate height of hour label text

export const Timeline = () => {
	const [dimensions, setDimensions] = useState({
		hourHeights: Array(24).fill(MIN_HOUR_HEIGHT), // Individual hour block heights
		minuteHeight: 0,
		totalHeight: 0,
		viewportHeight: window.innerHeight,
		paddingTop: window.innerHeight * OFFSET_FROM_TOP,
		paddingBottom: 0,
		indicatorOffset: 0,
	})
	const [currentTime, setCurrentTime] = useState(new Date())
	const [displayTime, setDisplayTime] = useState(new Date())

	const timelineRef = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const hourRefs = useRef<Array<HTMLDivElement | null>>(Array(24).fill(null))
	const scrollTimeoutRef = useRef<number | null>(null)
	const isScrolling = useRef(false)
	const isInteracting = useRef(false)

	// Calculate heights of all hour blocks
	const calculateHeights = () => {
		const newHourHeights = hourRefs.current.map((ref) => {
			if (ref && ref.offsetHeight) {
				return Math.max(MIN_HOUR_HEIGHT, ref.offsetHeight)
			}
			return MIN_HOUR_HEIGHT // Default height
		})

		const newMinuteHeight = newHourHeights[0] / 60

		const totalHeight =
			newHourHeights.reduce((sum, height) => sum + height, 0) +
			24 * HOUR_LABEL_HEIGHT // Add height for all hour labels

		return {
			hourHeights: newHourHeights,
			minuteHeight: newMinuteHeight,
			totalHeight,
		}
	}

	// Calculate dimensions based on container size and content
	const calculateDimensions = useCallback(() => {
		if (containerRef.current) {
			const viewportHeight = containerRef.current.offsetHeight
			const indicatorOffset = viewportHeight * OFFSET_FROM_TOP
			const { hourHeights, minuteHeight, totalHeight } =
				calculateHeights()

			setDimensions({
				hourHeights,
				minuteHeight,
				totalHeight,
				viewportHeight,
				paddingTop: indicatorOffset,
				paddingBottom: viewportHeight - indicatorOffset,
				indicatorOffset,
			})
		}
	}, [])

	// Handle window resize and content changes
	useEffect(() => {
		const handleResize = () => calculateDimensions()
		window.addEventListener("resize", handleResize)
		calculateDimensions()
		return () => window.removeEventListener("resize", handleResize)
	}, [calculateDimensions])

	// Get cumulative height up to a specific hour
	const getHeightBeforeHour = (hour: number) => {
		return (
			dimensions.hourHeights
				.slice(0, hour)
				.reduce((sum, height) => sum + height, 0) +
			hour * HOUR_LABEL_HEIGHT
		)
	}

	// Convert position to time, accounting for variable heights
	const getTimeFromScrollPosition = (scrollTop: number) => {
		const adjustedPosition = Math.max(
			0,
			scrollTop + dimensions.indicatorOffset - dimensions.paddingTop
		)

		// Find the hour block containing this position
		let accumulatedHeight = 0
		let targetHour = 0
		let remainingPixels = adjustedPosition

		for (let hour = 0; hour < 24; hour++) {
			const hourHeight = dimensions.hourHeights[hour] + HOUR_LABEL_HEIGHT
			if (accumulatedHeight + hourHeight > adjustedPosition) {
				targetHour = hour
				remainingPixels = adjustedPosition - accumulatedHeight - HOUR_LABEL_HEIGHT // Subtract label height
				break
			}
			accumulatedHeight += hourHeight
		}

		// Calculate minutes within the hour, ensuring we don't get stuck at 59
		const minutesInHour = Math.min(
			59,
			Math.max(
				0,
				Math.floor((remainingPixels / dimensions.hourHeights[targetHour]) * 60)
			)
		)
		
		const time = new Date()
		time.setHours(targetHour, minutesInHour, 0, 0)
		return time
	}

	// Convert time to scroll position, accounting for variable heights
	const getScrollPositionForTime = (time: Date) => {
		const hours = time.getHours()
		const minutes = time.getMinutes()

		// Get height up to the target hour
		const heightBeforeHour = getHeightBeforeHour(hours)

		// Calculate position within the hour
		const hourHeight = dimensions.hourHeights[hours]
		const minutePosition = (minutes / 60) * hourHeight

		return heightBeforeHour + minutePosition
	}

	const scrollToTime = (time: Date) => {
		if (timelineRef.current && dimensions.totalHeight > 0) {
			const position = getScrollPositionForTime(time)
			const scrollPosition =
				position + dimensions.paddingTop - dimensions.indicatorOffset
			timelineRef.current.scrollTop = scrollPosition
			timelineRef.current.style.scrollBehavior = "smooth"
		}
	}

	// Handle scroll with debounce
	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		isScrolling.current = true
		const newTime = getTimeFromScrollPosition(e.currentTarget.scrollTop)
		setDisplayTime(newTime)

		if (scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current)
		}

		// Reduce timeout to 1 second and update both times immediately when scroll stops
		scrollTimeoutRef.current = window.setTimeout(() => {
			const now = new Date()
			setCurrentTime(now)
			setDisplayTime(now)
			scrollToTime(now)
			isScrolling.current = false
		}, 1000)
	}

	useEffect(() => {
		window.addEventListener(
			"touchstart",
			() => (isInteracting.current = true)
		)
		window.addEventListener(
			"touchmove",
			() => (isInteracting.current = true)
		)
	}, [isInteracting])

	// Auto-update current time
	useEffect(() => {
		// Calculate ms until next minute
		const now = new Date()
		const msUntilNextMinute =
			(60 - now.getSeconds()) * 1000 - now.getMilliseconds()

		const initialTimeout = setTimeout(() => {
			if (!isScrolling.current) {
				const currentDate = new Date()
				setCurrentTime(currentDate)
				setDisplayTime(currentDate)
				scrollToTime(currentDate)

				// Use requestAnimationFrame for smoother updates
				const interval = setInterval(() => {
					if (!isScrolling.current) {
						const newDate = new Date()
						setCurrentTime(newDate)
						setDisplayTime(newDate)
						requestAnimationFrame(() => {
							scrollToTime(newDate)
						})
					}
				}, 60000)

				return () => clearInterval(interval)
			}
		}, msUntilNextMinute)

		return () => clearTimeout(initialTimeout)
	})

	// Initial scroll to current time
	useEffect(() => {
		scrollToTime(currentTime)
	}, [])

	const timelineAnimationVariants = {
		initial: {
			opacity: 0.24,
		},
		visible: {
			opacity: 1,
		},
	}

	return (
		<div className="w-full h-screen bg flex flex-col overflow-hidden fixed inset-0">
			{/* Timeline Container */}
			<div
				ref={containerRef}
				className="relative flex-1 min-h-0 overflow-hidden"
			>
				{/* Fixed time indicator at 25% */}
				<div
					className="absolute left-4 right-0 flex items-center z-10"
					style={{ top: `${OFFSET_FROM_TOP * 100}%` }}
				>
					<motion.div
						className="w-2 h-2 rounded-full bg-md-error -ml-1 flex justify-center items-center z-20"
						initial={false}
						animate={{
							width: isScrolling.current 
								? "fit-content"
								: "0.5rem",
							height: isScrolling.current
								? "fit-content"
								: "0.5rem",
							padding: isScrolling.current ? "0.5rem 1rem" : "0",
							fontSize: isScrolling.current ? "1rem" : "0.5rem",
							transition: transition.enter,
						}}
						exit={{
							width: "0.5rem",
							height: "0.5rem",
							padding: "0",
							fontSize: "0.5rem",
							transition: transition.exit,
						}}
					>
						<motion.span
							className="text-xs font-medium font-display text-md-on-error"
							initial={{
								opacity: 0,
								scale: 0,
							}}
							animate={{
								opacity: isScrolling.current ? 1 : 0,
								scale: isScrolling.current ? 1 : 0,
								transition: transition.enter,
							}}
							exit={{
								opacity: 0,
								scale: 0,
								transition: transition.exit,
							}}
						>
							{isScrolling.current
								? displayTime.toLocaleTimeString([], {
										hour: "numeric",
										minute: "2-digit",
										hour12: true,
								  })
								: currentTime.toLocaleTimeString([], {
										hour: "numeric",
										minute: "2-digit",
										hour12: true,
								  })}
						</motion.span>
					</motion.div>
					<motion.div
						className="absolute left-4 z-50 flex flex-col items-start"
						animate={{
							opacity:
								isScrolling.current
									? 0
									: 1,
						}}
						transition={transition.enter}
					>
						<motion.span className="text-md-on-surface-variant text-xl font-display font-medium tracking-normal">
							{currentTime.toLocaleDateString("en-US", {
								weekday: "short",
								month: "short",
								day: "numeric",
							})}
						</motion.span>
						<div
							className={`flex justify-center gap-2 ${
								currentTime.getHours() < 12 //if AM, align to top, else align to bottom
									? "items-start "
									: "items-end"
							}`}
						>
							<motion.span
								className="text-md-on-surface text-8xl font-display font-extrabold tracking-normal"
								initial={{
									fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
								}}
								animate={{
									fontVariationSettings:
										!isScrolling.current ||
										!isInteracting.current
											? `'opsz' 24, 'wdth' 75, 'wght' 800`
											: `'opsz' 32, 'wdth' 75, 'wght' 200`,
									transition: transition.enter,
								}}
								exit={{
									fontVariationSettings: `'opsz' 32, 'wdth' 75, 'wght' 200`,
									transition: transition.exit,
								}}
							>
								{
									displayTime
										.toLocaleTimeString([], {
											hour: "numeric",
											minute: "2-digit",
											hour12: true,
										})
										.split(" ")[0]
								}
							</motion.span>
							<motion.span className="text-md-on-surface-variant text-xl font-display font-medium tracking-normal">
								{
									displayTime
										.toLocaleTimeString([], {
											hour: "numeric",
											minute: "2-digit",
											hour12: true,
										})
										.split(" ")[1]
								}
							</motion.span>
						</div>
					</motion.div>
					<div className="absolute w-screen -left-4 h-px bg-md-error flex-grow" />
				</div>
				<div
					className="absolute flex w-full h-fit px-4"
					style={{ top: `${OFFSET_FROM_TOP * 100}% ` }}
				></div>

				{/* Scrollable timeline */}
				<motion.div
					ref={timelineRef}
					className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
					onScroll={handleScroll}
					variants={timelineAnimationVariants}
					initial="initial"
					animate={isScrolling.current ? "visible" : "initial"}
					transition={transition.onScreen}
				>
					{/* Timeline content container */}
					<div
						className="relative"
						style={{
							height: `${
								dimensions.totalHeight +
								dimensions.paddingTop +
								dimensions.paddingBottom
							}px`,
							paddingTop: `${dimensions.paddingTop}px`,
							paddingBottom: `${dimensions.paddingBottom}px`,
						}}
					>
						{/* Timeline vertical line */}
						<motion.div className="absolute left-4 top-0 bottom-0 w-px bg-md-outline-variant" />

						{/* Hour blocks with dynamic content */}
						{Array.from({ length: 24 }, (_, hour) => {
							const heightBeforeHour = getHeightBeforeHour(hour)

							return (
								<div
									key={hour}
									ref={(el) => (hourRefs.current[hour] = el)}
									className="absolute left-4 right-4 flex flex-row items-start"
									style={{
										top: `${
											heightBeforeHour +
											dimensions.paddingTop
										}px`,
									}}
								>
									<div className="flex items-center">
										<span className="text-xs font-display text-md-on-surface-variant mr-2 w-12  text-right">
											{`${convertHourToString(
												hour,
												true
											)}`}
										</span>
										<div className="w-4 h-px bg-md-outline-variant -ml-px" />
									</div>

									<div className="flex flex-col w-full"></div>
								</div>
							)
						})}
					</div>
				</motion.div>
			</div>
		</div>
	)
}
