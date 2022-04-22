export class RequisiteModule {
    code: any;
    constructor(id: string, name: string, code: string) {}
}

export class  PlannerModule{
    constructor(
        public id: string,
        public fullName: string,
        public semester: number,
        public missing: string[],
        public prerequisiteModules: RequisiteModule[],
    ) {}
}
