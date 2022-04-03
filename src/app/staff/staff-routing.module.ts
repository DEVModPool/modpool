import { environment } from "../../environments/environment";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseResolver } from "../interaction/base-resolver";
import { StaffComponent } from "./staff.component";
import { StaffDetailsComponent } from "./staff-details/staff-details.component";

const routes: Routes = [
    {
        path: '',
        component: StaffComponent,
        resolve: {data: BaseResolver},
        data: {url: environment.baseUrl + environment.staffList}
    },
    {
        path: ':id',
        component: StaffDetailsComponent,
        resolve: {staffDetails: BaseResolver},
        data: {url: environment.baseUrl + environment.staffDetails}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule {
}
