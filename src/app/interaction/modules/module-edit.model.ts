import { Module } from "./module.model";

export interface ModuleEdit extends Module {
    credits: string;
    academicYear: string;
    department: Department;
    semester: number;
    description: string;
    selectedRequisites: RequisiteModule[];
    syllabus: string;
    learningOutcomes: string;
    assessments: Assessment[];
    studyHours: StudyHours;
}

interface Assessment {
    name: string;
    weight: string;
}

interface Department {
    id: string,
    name: string
}

interface RequisiteModule {
    id: string;
    name: string;
    code: string;
}

export interface StudyHours {
    lectures: number;
    seminars: number;
    tutorials: number;
    labPracticals: number;
    fieldworkPlacement: number;
    privateStudy: number;
    other: number;
    total: number;
    totalTeaching: number;
}
