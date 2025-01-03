interface Event {
    hour: number;
    events: {
        startTime: Date;
        endTime: Date;
        title: string;
        description: string;
    }[];
}

export const events: Event[] = [
    {
        hour: 2,
        events: [
            {
                startTime: new Date("2025-01-04T02:00:00"),
                endTime: new Date("2025-01-04T02:30:00"),
                title: "Sleep",
                description: "Sleep",
            },
        ],
    },
    {
        hour: 9,
        events: [
            {
                startTime: new Date("2025-01-04T09:00:00"),
                endTime: new Date("2025-01-01T09:30:00"),
                title: "Team Meeting",
                description: "Daily standup with the development team",
            },
            {
                startTime: new Date("2024-03-20T09:30:00"),
                endTime: new Date("2024-03-20T10:00:00"),
                title: "Follow-up",
                description: "Review action items from standup",
            },
        ],
    },
    {
        hour: 12,
        events: [
            {
                startTime: new Date("2025-01-01T12:30:00"),
                endTime: new Date("2025-01-01T13:30:00"),
                title: "Lunch Break",
                description: "Lunch with colleagues",
            },
        ],
    },
    {
        hour: 15,
        events: [
            {
                startTime: new Date("2025-01-04T15:00:00"),
                endTime: new Date("2025-01-04T15:45:00"),
                title: "Client Call",
                description: "Project review call with the client",
            },
            {
                startTime: new Date("2024-03-20T15:45:00"),
                endTime: new Date("2024-03-20T16:30:00"),
                title: "Documentation",
                description: "Update project documentation based on client feedback",
            },
        ],
    },
    {
        hour: 17,
        events: [
            {
                startTime: new Date("2025-01-04T17:00:00"),
                endTime: new Date("2025-01-04T17:30:00"),
                title: "Meeting",
                description: "Weekly team meeting",
            },
            {
                startTime: new Date("2025-01-04T17:30:00"),
                endTime: new Date("2025-01-04T18:00:00"),
                title: "Meeting",
                description: "Weekly team meeting",
            },
        ],
    },
];