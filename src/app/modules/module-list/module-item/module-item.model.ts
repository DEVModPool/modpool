export class RequisiteModule {
    constructor(public id: string, public name: string) {}
}

export class ModuleItem {
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
