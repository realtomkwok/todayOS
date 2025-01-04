import { TimelineEvent } from "@/components/timeline/types";

export const sampleEvents: TimelineEvent[] = [
    {
        id: "1",
        title: "Morning Coffee",
        startTime: new Date(new Date().setHours(8, 30)),
        color: "var(--md-sys-color-tertiary)",
        description: "Start the day right"
    },
    {
        id: "2",
        title: "Team Meeting",
        startTime: new Date(new Date().setHours(10, 0)),
        endTime: new Date(new Date().setHours(11, 0)),
        color: "var(--md-sys-color-primary)",
        description: "Weekly sync"
    },
    {
        id: "3",
        title: "Lunch Break",
        startTime: new Date(new Date().setHours(12, 30)),
        endTime: new Date(new Date().setHours(13, 30)),
        color: "var(--md-sys-color-secondary)",
        description: "Time to eat!"
    }
];