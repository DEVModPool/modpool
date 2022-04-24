export class SaveReturn {
    constructor(
        public result: string,
        public errors: any[],
        public hasErrors: boolean
    ) {
    }
}

export class PlanData {
    constructor(
        public modules: string[],
        public prerequisites: string[],
        public id?: string,
        public name?: string,
    ) {
    }
}

export class PlanReturn {
    constructor(
        public modules: PlanData[],
        public id: string,
    ) {
    }
}

export class PlanList {
    constructor(
        public modulePlanners: PlanNames[],
        public viewModel: any
    ) {
    }
}

export class PlanNames {
    constructor(
        public id: string,
        public name: string,
    ) {
    }
}
