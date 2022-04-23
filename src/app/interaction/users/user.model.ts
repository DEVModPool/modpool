export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    roles?: Role[];
}

export interface Role {
    id?: string;
    name?: string;
}
