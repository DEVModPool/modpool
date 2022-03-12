export class RequisiteModule {
    constructor(id: string, name: string) {}
}

export class  PlannerModule{
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public description: string,
        public assessment: {coursework: string, exam: string},
        public prerequisites?: RequisiteModule[],
        public prerequisiteFor?: RequisiteModule[],
        public semester?: number,
        public concatenation?: string,
        public missing?: string[],
    ) {}
}
