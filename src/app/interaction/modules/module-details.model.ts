import {RequisiteModule} from "./module.model";

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
        public assessmentMethods: Assessment[],
        public syllabus: string,
        public totalReviews: number,
        public averageReviewRating: number,
        public prerequisites?: RequisiteModule[],
        public prerequisiteFor?: RequisiteModule[],

    ) {
    }
}

interface ModuleDepartment {
    id: string;
    name: string;
}

interface ModuleCoordinator {
    id: string;
    name: string;
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

