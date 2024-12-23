import { ProfilePreviewCard } from "@/lib/types/profiles";

export interface ProfilesPages {
    total : number,
    page: number,
    perPage: number,
    hasPrev: boolean,
    hasNext: boolean,
    results: ProfilePreviewCard[]
}