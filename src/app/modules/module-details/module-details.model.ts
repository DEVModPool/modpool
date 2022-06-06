import { RequisiteModule } from "../module-list/module-item/module-item.model";

export class ModuleDetails {
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public department: ModuleDepartment,
        public semester: string,
        public coordinator: ModuleCoordinator,
        public credits: number,
        public description: string,
        public learningOutcomes: string,
        public studyHours: StudyHours,
        public assessments: Assessment[],
        public syllabus: string,
        public reviewsCount: number,
        public averageRating: number,
        public prerequisiteModules?: RequisiteModule[],
        public prerequisiteForModules?: RequisiteModule[],
    ) {
    }
}

interface ModuleDepartment {
    id: string;
    name: string;
}

interface ModuleCoordinator {
    id: string;
    fullName: string;
}

export interface StudyHours {
    lectures: number;
    seminars: number;
    tutorials: number;
    labPracticals: number;
    fieldwork: number;
    other: number;
    totalStudyHours: {
        totalStudy: number;
        totalTeaching: number;
        privateStudy: number;

    }
}

interface Assessment {
    type: string,
    weight: number,
}

