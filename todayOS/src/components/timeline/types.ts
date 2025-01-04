export interface TimelineEvent {
    id: string;
    title: string;
    startTime: Date;
    endTime?: Date;
    description?: string;
    color?: string;
} 