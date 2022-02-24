export interface PlannerModuleItem {
    name?: string;
    code?: string;
    semester?: number;
    concatenation?: string;
    description?: string,
    assessment?: {coursework: string, exam: string},
    prerequisites?: string[],
    prerequisiteFor?: string[]
}
