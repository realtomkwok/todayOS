import { useNowTime } from "../../utils/getLiveTime"
import { TimeIndicator } from "./TimeIndicator"
import { Glanceables } from "./glanceables/Base"
import { useState, useEffect } from "react"

export const Content = () => {
    return (
        <div className="flex flex-col justify-center items-start gap-4 w-full h-fit p-4">
            <Glanceables isActive={true} icon="rainy" text="Drizzle in 15 min" />
            <Glanceables isActive={true} icon="event" text="Pick up groceries in 20 min" />
            <Glanceables isActive={false} icon="event" text="Pick up groceries in 20 min" />
        </div>
    )
}

export const Timeline = () => {
    const { time, period, dateString } = useNowTime()
    const [isScrolling, setIsScrolling] = useState(false)
    let scrollTimeout: NodeJS.Timeout

    const handleTouchStart = () => {
        setIsScrolling(true)
    }

    const handleTouchEnd = () => {
        // Add a small delay before setting isScrolling to false
        // to account for momentum scrolling
        setTimeout(() => {
            setIsScrolling(false)
        }, 100)
    }

    useEffect(() => {
        // Add scroll and touch event listeners
        window.addEventListener('touchstart', handleTouchStart)
        window.addEventListener('touchend', handleTouchEnd)
        
        // Cleanup
        return () => {
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
            clearTimeout(scrollTimeout)
        }
    }, [])
    
    return (
        <div className="relative w-full h-full bg-md-surface flex flex-col items-left justify-start">
            {/* Top gradient overlay */}
            <div className="fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-md-surface to-transparent z-10" />
            
            <TimeIndicator 
                className="fixed top-24" 
                date={dateString} 
                time={time} 
                period={period} 
                isActive={isScrolling} 
            />
            <Content />
            {/* Bottom gradient overlay */}
            <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-md-surface to-transparent z-10" />
        </div>
    )
}
