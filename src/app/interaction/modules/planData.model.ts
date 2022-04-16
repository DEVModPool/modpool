export class  PlanData{
    constructor(
        public modules: string[],
        public prerequisites: string[],
        public id?: string,
        public name?: string,
    ) {}
}
export class  PlanNames{
    constructor(
        public id: string,
        public name: string,
    ) {}
}
