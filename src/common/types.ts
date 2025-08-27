export type EventItem = {
    name: string;
    type: string;
    id: string;
    test: boolean;
    url: string;
    locale: string;
    images: Array<{
        ratio: string;
        url: string;
        width: number;
        height: number;
        fallback: boolean;
    }>;
    sales?: {
        public?: {
            startDateTime?: string;
            endDateTime?: string;
        };
    };
    dates?: {
        start?: {
            localDate?: string;
            localTime?: string;
            dateTime?: string;
        };
        timezone?: string;
        status?: { code?: string };
        spanMultipleDays?: boolean;
    };
    classifications?: Array<{
        primary?: boolean;
        segment?: { name?: string };
        genre?: { name?: string };
        subGenre?: { name?: string };
    }>;
    ageRestrictions?: { legalAgeEnforced?: boolean };
    _embedded?: {
        venues?: Array<{
            name?: string;
            city?: { name?: string };
            country?: { name?: string };
            address?: { line1?: string };
            location?: {
                latitude?: number | string;
                longitude?: number | string;
            };
        }>;
        attractions?: Array<{
            name?: string;
            url?: string;
        }>;
    };
};
