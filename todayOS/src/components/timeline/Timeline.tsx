import { convertHourToString } from "@/utils/convertTime"
import { UIEvent, useCallback, useEffect, useRef, useState } from "react"
import { motion, Variants } from "motion/react"
import { transition } from "@/utils/motionUtils"
import { ITimelineEvent, sampleEvents } from "@/assets/sampleEvents"
import { AnimatePresence } from "framer-motion"
import { Event } from "@/components/cards/Event"
import { Now } from "@/components/timeline/Now"
import { Indicator } from "@/components/timeline/Indicator"
import { MaterialSymbol } from "react-material-symbols"
import { Switch } from "@/components/buttons/Switch"
import { IconButton } from "../buttons/IconButtons"

const MIN_HOUR_HEIGHT = 120
const OFFSET_FROM_TOP = 0.25
const HOUR_LABEL_HEIGHT = 16 // Approximate height of hour label text

export const Timeline = () => {
	const [dimensions, setDimensions] = useState({
		hourHeights: Array(24).fill(MIN_HOUR_HEIGHT), // Individual hour block heights
		minuteHeight: 0,
		totalHeight: 0,
		viewportHeight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		indicatorOffset: 0,
	})
	const [displayTime, setDisplayTime] = useState(() => new Date())
	const [isTimelineLocked, setTimelineLocked] = useState(false)

	const timelineRef = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const hourRefs = useRef<HTMLDivElement[] | null>(Array(24).fill(null))
	const scrollTimeoutRef = useRef<number | null>(null)
	const isScrolling = useRef(false)
	const isInteracting = useRef(false)

	// Calculate heights of all hour blocks
	const calculateHeights = () => {
		const newHourHeights = hourRefs.current!.map((ref) => {
			if (ref?.offsetHeight) {
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
		if (!containerRef.current) return

		const viewportHeight = containerRef.current.offsetHeight
		const indicatorOffset = viewportHeight * OFFSET_FROM_TOP
		const { hourHeights, minuteHeight, totalHeight } = calculateHeights()

		setDimensions({
			hourHeights,
			minuteHeight,
			totalHeight,
			viewportHeight,
			paddingTop: indicatorOffset,
			paddingBottom: viewportHeight - indicatorOffset,
			indicatorOffset,
		})
	}, [])

	// Handle window resize and content changes
	useEffect(() => {
		const handleResize = () => calculateDimensions()
		window.addEventListener("resize", handleResize)
		calculateDimensions()
		return () => window.removeEventListener("resize", handleResize)
	}, [calculateDimensions])

	// Get cumulative height up to a specific hour
	const getHeightBeforeHour = useCallback(
		(hour: number) => {
			return (dimensions.hourHeights
				.slice(0, hour)
				.reduce((sum: number, height: number) => sum + height, 0) +
				hour * HOUR_LABEL_HEIGHT) as number
		},
		[dimensions]
	)

	// Convert position to time, accounting for variable heights
	const getTimeFromScrollPosition = (scrollTop: number) => {
		const adjustedPosition = Math.max(
			0,
			scrollTop + dimensions.indicatorOffset - dimensions.paddingTop
		)

		// Get total height of all hour blocks
		const totalTimelineHeight = getHeightBeforeHour(24)

		// If scrolled past the last hour block, return 23:59
		if (adjustedPosition >= totalTimelineHeight) {
			const lastTime = new Date()
			lastTime.setHours(23, 59, 0, 0)
			return lastTime
		}

		// Find the hour block containing this position
		let accumulatedHeight = 0
		let targetHour = 0
		let remainingPixels = adjustedPosition

		for (let hour = 0; hour < 24; hour++) {
			const hourHeight = (dimensions.hourHeights[hour] +
				HOUR_LABEL_HEIGHT) as number
			if (accumulatedHeight + hourHeight > adjustedPosition) {
				targetHour = hour
				remainingPixels = adjustedPosition - accumulatedHeight
				break
			}
			accumulatedHeight += hourHeight
		}

		// Calculate minutes within the hour
		const minutesInHour = Math.floor(
			(remainingPixels / dimensions.hourHeights[targetHour]) * 60
		)
		const totalMinutes = targetHour * 60 + Math.min(59, minutesInHour)

		const time = new Date()
		time.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0)
		return time
	}

	// Convert time to scroll position, accounting for variable heights
	const getScrollPositionForTime = useCallback(
		(time: Date) => {
			const hours = time.getHours()
			const minutes = time.getMinutes()

			// Get height up to the target hour
			const heightBeforeHour = getHeightBeforeHour(hours)

			// Calculate position within the hour
			const hourHeight = dimensions.hourHeights[hours] as number
			const minutePosition = (minutes / 60) * hourHeight

			return heightBeforeHour + minutePosition
		},
		[dimensions, getHeightBeforeHour]
	)

	const scrollToTime = useCallback(
		(time: Date) => {
			if (timelineRef.current && dimensions.totalHeight > 0) {
				const position = getScrollPositionForTime(time)
				timelineRef.current.scrollTop =
					position + dimensions.paddingTop - dimensions.indicatorOffset
				timelineRef.current.style.scrollBehavior = "smooth"
			}
		},
		[dimensions, getScrollPositionForTime]
	)

	// Add a useEffect to watch lock state changes
	useEffect(() => {
		// If timeline becomes locked, cancel any pending scroll timeout
		if (isTimelineLocked && scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current)
			isScrolling.current = false
		}
	}, [isTimelineLocked])

	// Handle scroll with debounce
	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		isScrolling.current = true
		const newTime = getTimeFromScrollPosition(e.currentTarget.scrollTop)
		setDisplayTime(newTime)

		if (scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current)
		}

		// Only set timeout if not currently locked
		if (!isTimelineLocked) {
			scrollTimeoutRef.current = window.setTimeout(() => {
				const now = new Date()
				setDisplayTime(now)
				scrollToTime(now)
				// console.log("Scroll to time after 3 seconds")

				isScrolling.current = false
			}, 3000)
		} else {
			// If already locked, just reset scrolling state after a short delay
			scrollTimeoutRef.current = window.setTimeout(() => {
				isScrolling.current = false
			}, 300) // Shorter timeout for locked state
		}
	}

	// Add event listeners to detect user interaction
	useEffect(() => {
		const handleInteraction = () => {
			isInteracting.current = true
		}

		document.addEventListener("touchstart", handleInteraction)
		document.addEventListener("scroll", handleInteraction)
		document.addEventListener("pointerdown", handleInteraction)
		document.addEventListener("pointerup", handleInteraction)

		return () => {
			document.removeEventListener("touchstart", handleInteraction)
			document.removeEventListener("scroll", handleInteraction)
			document.removeEventListener("pointerdown", handleInteraction)
			document.removeEventListener("pointerup", handleInteraction)
		}
	}, [])

	// Auto-update current time
	useEffect(() => {
		const now = new Date()
		const msUntilNextMinute =
			(60 - now.getSeconds()) * 1000 - now.getMilliseconds()

		const initialTimeout = setTimeout(() => {
			// Only update display time and scroll if not locked
			if (!isTimelineLocked) {
				setDisplayTime(new Date())
				scrollToTime(new Date())
			}

			const interval = setInterval(() => {
				const newDate = new Date()

				// Only update display time and scroll if not locked and not scrolling
				if (!isTimelineLocked && !isScrolling.current) {
					setDisplayTime(newDate)
					requestAnimationFrame(() => {
						if (!isTimelineLocked) {
							scrollToTime(newDate)
						}
					})
				}
			}, 60000)

			return () => clearInterval(interval)
		}, msUntilNextMinute)

		return () => clearTimeout(initialTimeout)
	}, [isTimelineLocked, scrollToTime])

	// Initial scroll to current time
	useEffect(() => {
		const now = new Date()
		setDisplayTime(now)

		// Only scroll when dimensions are properly calculated
		if (dimensions.totalHeight > 0) {
			// Add a small delay to ensure DOM is ready
			requestAnimationFrame(() => {
				scrollToTime(now)
			})
		}
	}, [dimensions, scrollToTime])

	// State monitor
	useEffect(() => {
		console.log(
			`Timeline locked state: ${isTimelineLocked}, Timeline is scrolling: ${isScrolling.current}`
		)
	}, [isTimelineLocked, isScrolling])

	const timelineAnimationVariants: Variants = {
		initial: {
			opacity: 0.24,
		},
		visible: {
			opacity: 1,
		},
	}

	const tomorrow = new Date(displayTime.getTime() + 24 * 60 * 60 * 1000)
	const tomorrowEvents = sampleEvents.filter(
		(event) => event.startTime.getDate() === tomorrow.getDate()
	)

	return (
		<div
			className="w-full h-screen bg flex flex-col overflow-hidden fixed inset-0"
			data-oid="rll6l:q"
		>
			{/* Timeline Container */}
			<div
				ref={containerRef}
				className="relative flex-1 min-h-0 overflow-hidden"
				data-oid="g08:cju"
			>
				{/* Fixed time indicator */}
				<Indicator
					offsetFromTop={OFFSET_FROM_TOP}
					isInteracting={isInteracting}
					displayTime={displayTime}
					data-oid="hhsi.c9"
				/>

				{/* Now */}
				<Now
					offsetFromTop={OFFSET_FROM_TOP}
					isInteracting={isInteracting}
					data-oid="76icn:a"
				/>

				{/* Scrollable timeline */}
				<motion.div
					ref={timelineRef}
					className="absolute inset-0 overflow-y-auto"
					onScroll={handleScroll}
					variants={timelineAnimationVariants}
					initial="initial"
					animate={isInteracting.current ? "visible" : "initial"}
					transition={transition.onScreen}
					data-oid="ykkshgq"
				>
					{/* Header */}
					<motion.div
						className="fixed p-4 z-10 w-full flex justify-between items-center bg-gradient-to-b from-md-surface h-fit"
						initial={{ opacity: 0 }}
						animate={
							isInteracting.current
								? { opacity: 1, transition: transition.enter }
								: { opacity: 0, transition: transition.exit }
						}
						data-oid="ekoeyz8"
					>
						<div
							className="flex flex-row items-center gap-2"
							data-oid="a7:sov9"
						>
							<IconButton
								icon="chevron_left"
								variant="standard"
								data-oid="jt0xk3l"
							/>

							<IconButton
								icon="chevron_right"
								variant="standard"
								data-oid="zo0-gee"
							/>

							<div
								className="relative flex flex-col items-left "
								data-oid=":xumz9n"
							>
								<span
									className="w-20 text-md-on-surface text-xl font-display font-semibold tracking-tight"
									data-oid="8xr:6fj"
								>
									Today
								</span>
								<span
									className="text-md-on-surface-variant text-sm font-display font-regular tracking-normal"
									data-oid="xo9zgsh"
								>
									{displayTime.toLocaleDateString("en-US", {
										weekday: "short",
										month: "short",
										day: "numeric",
									})}
								</span>
							</div>
						</div>

						{/* Lock button to prevent scrolling back to the current time */}
						<div
							className="flex flex-row items-center gap-4"
							data-oid="2uwv9e5"
						>
							<IconButton
								icon="event"
								variant="filled-tonal"
								data-oid="17vtura"
							/>

							<Switch
								icon={isTimelineLocked ? "lock" : "lock_open"}
								hasIcon={true}
								state={isTimelineLocked ? "on" : "off"}
								onClick={() => {
									setTimelineLocked((prev) => {
										if (prev) {
											setTimeout(() => {
												setDisplayTime(new Date())
												scrollToTime(new Date())
											}, 0)
										}

										return !prev
									})
								}}
								data-oid="i-lvpua"
							/>
						</div>
					</motion.div>

					{/* Timeline content container */}
					<div
						className="relative flex flex-col items-center justify-start"
						style={{
							height: `${
								dimensions.totalHeight +
								dimensions.paddingTop +
								dimensions.paddingBottom
							}px`,

							paddingTop: `${dimensions.paddingTop}px`,
							paddingBottom: `${dimensions.paddingBottom}px`,
						}}
						data-oid="_7yswr0"
					>
						{isTimelineLocked && (
							<div
								className="fixed flex flex-col w-fit items-center justify-end top-20 px-4 py-2 bg-md-inverse-surface rounded-2xl z-50"
								data-oid="oqut0_j"
							>
								<span
									className="text-md-inverse-on-surface text-sm font-sans font-regular tracking-normal"
									data-oid="vcea8ms"
								>
									Timeline Locked
								</span>
							</div>
						)}

						{/* Timeline vertical line */}
						<motion.div
							className="absolute left-4 top-0 bottom-0 w-px bg-md-outline-variant opacity-50"
							data-oid="4umxq7."
						/>

						{/* Hour blocks */}
						{Array.from({ length: 24 }, (_, hour) => {
							const heightBeforeHour = getHeightBeforeHour(hour)

							return (
								<div
									key={hour}
									ref={(el) => {
										if (hourRefs.current) {
											hourRefs.current[hour] = el!
										}
									}}
									className="absolute left-4 right-4 flex flex-row items-start h-fit"
									style={{
										top: `${heightBeforeHour + dimensions.paddingTop}px`,
									}}
									data-oid="qm:iqvg"
								>
									<div className="flex items-center" data-oid="-4c.0q4">
										<span
											className="text-xs font-display text-md-on-surface-variant mr-2 w-12 text-right"
											data-oid="3._9udw"
										>
											{`${convertHourToString(hour, true)}`}
										</span>
										<div
											className="w-4 h-px bg-md-outline-variant -ml-px"
											data-oid=":4brg.b"
										/>
									</div>
								</div>
							)
						})}

						{/* Tomorrow Summary */}
						<div
							className="absolute left-4 right-4 flex flex-row items-start h-fit"
							style={{
								top: `${getHeightBeforeHour(24) + dimensions.paddingTop}px`,
							}}
							data-oid="wdc:zy6"
						>
							<div
								className="flex flex-col items-left justify-start w-full h-fit mt-12 gap-4"
								data-oid="n5_yhs6"
							>
								<div
									className="flex flex-row items-center w-full p-2"
									data-oid="844zu6q"
								>
									<div
										className="w-full flex flex-col items-left"
										data-oid=":y9c-_x"
									>
										<span
											className="text-md-on-surface text-xl font-display font-semibold tracking-tight"
											data-oid="3zyv2oa"
										>
											Tomorrow
										</span>
										<span
											className="text-md-on-surface-variant text-sm font-display font-regular tracking-normal"
											data-oid="9bo.wgj"
										>
											{tomorrow.toLocaleDateString("en-US", {
												weekday: "short",
												month: "short",
												day: "numeric",
											})}
										</span>
									</div>
									<span
										className="text-md-secondary text-xl flex flex-row items-center gap-2 rounded-full"
										data-oid="pwxw2qp"
									>
										<MaterialSymbol icon="sunny" fill data-oid="2nefg.." />
										<span className="text-xl font-medium" data-oid="7aqmfla">
											76°
										</span>
									</span>
								</div>

								<div
									className="relative w-full flex flex-col items-left justify-start gap-2 pl-28"
									data-oid="3smf:be"
								>
									{tomorrowEvents.map((event) => {
										return (
											<div
												key={event.id}
												className="flex flex-col items-left justify-start w-full bg-md-surface-container-low px-4 py-3 rounded-2xl border-b border-md-outline-variant"
												data-oid="-hazecb"
											>
												<span
													className="text-md-on-surface-variant text-xs font-display font-regular tracking-normal"
													data-oid="ni7zehe"
												>
													{event.startTime.toLocaleTimeString([], {
														hour: "numeric",
														minute: "2-digit",
														hour12: true,
													})}
													{" - "}
													{event.endTime?.toLocaleTimeString([], {
														hour: "numeric",
														minute: "2-digit",
														hour12: true,
													})}
												</span>
												<span
													className="text-md-on-surface text-sm font-display font-regular tracking-normal"
													data-oid="56srac-"
												>
													{event.title}
												</span>
											</div>
										)
									})}
								</div>
							</div>
						</div>

						{/* Events */}
						<div
							className="absolute top-0 w-full h-full"
							style={{ paddingTop: dimensions.paddingTop }}
							data-oid="0k5sryg"
						>
							<AnimatePresence data-oid="kkj4t_4">
								{sampleEvents.map((event: ITimelineEvent) => {
									const startHour = event.startTime.getHours()
									const startMinute = event.startTime.getMinutes()
									const heightBeforeHour =
										getHeightBeforeHour(startHour) + dimensions.paddingTop
									const durationInHours = event.endTime
										? (event.endTime.getTime() - event.startTime.getTime()) /
											(1000 * 60 * 60)
										: 0
									const durationInMinutes = durationInHours * 60
									const durationInPixels =
										durationInMinutes * dimensions.minuteHeight
									const eventPosition =
										heightBeforeHour +
										startMinute * dimensions.minuteHeight +
										HOUR_LABEL_HEIGHT

									let eventHeight = dimensions.minuteHeight * 30 // Default 30min height
									if (event.endTime) {
										eventHeight =
											durationInPixels + HOUR_LABEL_HEIGHT * durationInHours
									}

									return (
										<Event
											key={event.id}
											id={event.id}
											title={event.title}
											description={event.description}
											startTime={event.startTime}
											endTime={event.endTime}
											position={eventPosition}
											eventHeight={eventHeight}
											color={event.color}
											data-oid="-wk_743"
										/>
									)
								})}
							</AnimatePresence>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
