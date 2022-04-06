export class RequisiteModule {
    constructor(id: string, name: string, code: string) {}
}

export class Module {
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public description: string,
        public assessment: {coursework: string, exam: string},
        public prerequisites?: RequisiteModule[],
        public prerequisiteFor?: RequisiteModule[]
    ) {}
}
