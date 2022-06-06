export class RequisiteModule {
    code: any;

    constructor() {
    }
}

export class PlannerModule {
    constructor(
        public id: string,
        public fullName: string,
        public semester: number,
        public missing: string[],
        public prerequisiteModules: RequisiteModule[],
    ) {
    }
}
