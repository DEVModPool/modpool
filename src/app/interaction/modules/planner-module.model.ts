export class RequisiteModule {
    code: any;
    constructor(id: string, name: string, code: string) {}
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
        public missing?: string[],
    ) {}
}
