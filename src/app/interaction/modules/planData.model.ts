export class  PlanData{
    constructor(
        public modules: string[],
        public prerequisites: string[],
        public id?: string,
        public name?: string,
    ) {}
}
