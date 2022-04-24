export class RequisiteModule {
    constructor(public id: string, public name: string) {
    }
}

export class ModuleItem {
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public description: string,
        public assessment: { coursework: string, exam: string },
        public averageRating: number,
        public reviewsCount: number,
        public prerequisiteModules?: RequisiteModule[],
        public prerequisiteForModules?: RequisiteModule[],
    ) {
    }
}
export class PlanListItem {
    constructor(
            public label: String,
            public icon: String,
            public command: any,
    ) {}
}
