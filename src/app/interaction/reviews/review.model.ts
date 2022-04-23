export interface Review {
    id?: string;
    authorEmail?: string;
    status?: string;
    lastUpdated?: Date;
    content?: string;
    quality?: number;
    difficulty?: number;
    moduleCode?: string;
    moduleAcademicYear?: string;
}
