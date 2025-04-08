import { ReactElement } from "react";

export type TechItem = {
    name: string;
    icon: ReactElement;
}

export type ProjectItemType = {
    image: string;
    name: string;
    languagesUsed: TechItem[];
    frameworksUsed: TechItem[];
    techsUsed: TechItem[];
    gitHubUrl: string;
}