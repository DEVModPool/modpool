import { User } from "./user.model";

export interface UserEdit extends User {
    active?: boolean;
    lastLoggedOn?: Date;
}
