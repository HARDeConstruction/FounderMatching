import { ProfilePreviewCard } from "@/lib/types/profiles";

export interface DashboardData {
    reachedCount: number;
    viewedCount: number;
    viewedHistory: ViewedHistory[];
    connectRequestCount: number;
    matchedProfilesCount: number;
    sampleProfiles: ProfilePreviewCard[];
}

interface ViewedHistory {
    time: string;
    count: number;
}