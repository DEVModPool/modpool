export class  PlanData{
    constructor(
        public modules: string[],
        public prerequisites: string[],
        public id?: string,
        public name?: string,
    ) {}
}
export class  PlanList{
    constructor(
        public modulePlanners: PlanNames[],
        public viewModel: any
    ) {}
}
export class  PlanNames{
    constructor(
        public id: string,
        public name: string,
    ) {}
}
