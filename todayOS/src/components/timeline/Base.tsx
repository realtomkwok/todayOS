import { useNowTime } from "../../utils/getLiveTime"
import { TimeIndicator } from "./TimeIndicator"
import { Glanceables } from "./glanceables/Base"
import { useState, useEffect, useRef, forwardRef, useCallback } from "react"
import { AnimatePresence, motion, useAnimationControls } from "motion/react"
import { transition } from "@/utils/motionUtils"

interface IContent {
	timeString: string
	dateString: string
	hour: number
	minute: string
	period: string
	className?: string
}

export const Content = forwardRef<HTMLDivElement, IContent>((props) => {
	const HourBlock = (props: {
		hour: number
		period: string
		children: React.ReactNode
		showTime?: boolean
		isExpanded?: boolean
	}) => {
		return (
			<div className="flex flex-row w-full items-start px-4 h-fit">
				{props.showTime && (
					<div className="flex flex-row basis-1/3">
						<div className="flex flex-row gap-1 font-display text-md-on-surface-variant text-sm">
							<span>{props.hour}</span>
							{/* Bug: May be incorrect period if the past hour is AM and the current hour is PM */}
							<span>{props.period}</span>
						</div>
					</div>
				)}
				<div
					className={`flex flex-col gap-2 ${
						props.showTime ? "basis-2/3" : "basis-full"
					}`}
				>
					{props.children}
				</div>
			</div>
		)
	}

	return (
		<motion.div
			className={`relative flex flex-col overflow-y-auto ${props.className}`}
		>
			{/* Container for all time blocks with grid layout */}
			<div className="flex flex-col relative">
				{/* Past Events */}
				<div id="past-events" className="relative">
					<HourBlock
						hour={props.hour - 1}
						period={props.period}
						showTime={true}
					>
						<Glanceables
							isActive={false}
							icon="event"
							text="Past event"
						/>
					</HourBlock>
				</div>

				{/* Current Time Block - This will be our reference point */}
				<div id="current-time-block" className="relative">
					<HourBlock
						hour={props.hour}
						period={props.period}
						showTime={false}
					>
						<Glanceables
							isActive={true}
							icon="rainy"
							text="Drizzle in 15 min"
						/>
						<Glanceables
							isActive={true}
							icon="event"
							text="Pick up groceries in 20 min"
						/>
					</HourBlock>
				</div>

				{/* Future Events */}
				<div id="future-events" className="relative">
					<HourBlock
						hour={props.hour + 1}
						period={props.period}
						showTime={true}
					>
						<Glanceables
							isActive={false}
							icon="event"
							text="Future event"
						/>
					</HourBlock>
				</div>
			</div>
		</motion.div>
	)
})

export const Timeline = () => {
	const { hour, minute, period, dateString, timeString } = useNowTime()
	const minuteString = minute.toString().padStart(2, "0")
	const time = `${hour}:${minuteString}`

	const [isScrolling, setIsScrolling] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)

	const overlayAnimation = useAnimationControls()

	const [displayedHour, setDisplayedHour] = useState(hour)
	const [displayedMinute, setDisplayedMinute] = useState(minuteString)
	const [displayedPeriod, setDisplayedPeriod] = useState(period)

	const Overlay = (props: { position: "top" | "bottom" }) => {
		const overlayVariants = {
			initial: {
				opacity: 1,
			},
			isExpanded: {
				opacity: 0,
			},
		}

		return (
			<motion.div
				className={`fixed ${
					props.position === "top"
						? "top-0 bg-gradient-to-b"
						: "bottom-0 bg-gradient-to-t"
				} left-0 w-full h-24 from-md-surface to-transparent z-10`}
				variants={overlayVariants}
				initial="initial"
				animate={isExpanded ? "isExpanded" : "initial"}
				transition={transition.onScreen}
			/>
		)
	}

	const contentContainerRef = useRef<HTMLDivElement>(null)
	const scrollTimeout = useRef<NodeJS.Timeout>()

	const updateTimeFromScroll = useCallback(() => {
		const container = contentContainerRef.current
		if (!container) return

		const scrollPosition = container.scrollTop
		const hourBlockHeight = container.clientHeight / 3 // Height of each hour block

		// Calculate hour and minute from scroll position
		const scrollRatio = scrollPosition / hourBlockHeight
		const hourOffset = Math.floor(scrollRatio)
		const minuteOffset = Math.floor((scrollRatio % 1) * 60)

		let newHour = hour + hourOffset

		// Ensure hour stays within 1-12 range
		if (newHour > 12) {
			newHour = newHour % 12 || 12
		} else if (newHour <= 0) {
			newHour = 12 + (newHour % 12)
		}

		// Update period if we cross AM/PM boundary
		let newPeriod = period
		const totalHours = hour + hourOffset
		if (totalHours >= 12 && totalHours < 24) {
			newPeriod = "PM"
		} else {
			newPeriod = "AM"
		}

		// Format minutes with leading zero
		const newMinute = minuteOffset.toString().padStart(2, "0")

		setDisplayedHour(newHour)
		setDisplayedMinute(newMinute)
		setDisplayedPeriod(newPeriod)
	}, [hour, period])

	useEffect(() => {
		const handleTouchStart = () => {
			setIsScrolling(true)
			setIsExpanded(true)
			overlayAnimation.start("isExpanded")
		}

		const handleTouchEnd = () => {
			setIsScrolling(false)
			setIsExpanded(false)
			overlayAnimation.start("initial")
		}

		const handleScroll = () => {
			setIsScrolling(true)
			updateTimeFromScroll()
			if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
			scrollTimeout.current = setTimeout(() => {
				setIsScrolling(false)
			}, 150)
		}

		const container = contentContainerRef.current
		if (!container) return

		container.addEventListener("touchstart", handleTouchStart)
		container.addEventListener("touchmove", () => setIsScrolling(true))
		container.addEventListener("touchend", handleTouchEnd)
		container.addEventListener("scroll", handleScroll)

		return () => {
			container.removeEventListener("touchstart", handleTouchStart)
			container.removeEventListener("touchmove", () =>
				setIsScrolling(true)
			)
			container.removeEventListener("touchend", handleTouchEnd)
			container.removeEventListener("scroll", handleScroll)
			clearTimeout(scrollTimeout.current)
		}
	}, [])

	return (
		<AnimatePresence>
			<motion.div
				className="relative w-full h-4/5 bg-md-surface flex flex-col items-left justify-start overflow-y-auto"
				ref={contentContainerRef}
			>
				{/* Top gradient overlay */}
				<Overlay position="top" />

				<TimeIndicator
					className="fixed top-24 z-[30]"
					date={dateString}
					time={`${displayedHour}:${displayedMinute}`}
					period={displayedPeriod}
					isActive={isScrolling}
				/>
				<Content
					timeString={timeString}
					dateString={dateString}
					hour={displayedHour}
					minute={displayedMinute}
					period={displayedPeriod}
				/>
				{/* Bottom gradient overlay */}
				<Overlay position="bottom" />
			</motion.div>
		</AnimatePresence>
	)
}
