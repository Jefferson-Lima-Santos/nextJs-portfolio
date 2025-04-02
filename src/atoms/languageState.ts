import { atomWithStorage } from "jotai/utils";

interface Language {
    code: string;
    name: string;
    uuid: string;
}

export const languageState = atomWithStorage<Language | null>('languageState', null);
