export type WorkExperienceItem = {
    startDate: string;
    endDate?: string;
    companyName: string;
    companyLogo: {
        url: string;
        alt: string;
    };
    companyUrl?: string;
    description: string;
    role?: string;
    technologies?: string[];
}