export interface Module {
    id?: number;
    code?: string;
    name?: string;
    coordinator?: ModuleCoordinator;
    lastUpdated?: string;
}

export interface ModuleCoordinator {
    fullName: string,
    id: string
}



