import { environment } from "../../environments/environment";
import { NgModule } from "@angular/core";
import { ModulesComponent } from "../modules/modules.component";
import { RouterModule, Routes } from "@angular/router";
import { BaseResolver } from "../interaction/base-resolver";
import { StaffListComponent } from "./staff-list/staff-list.component";

const routes: Routes = [
    {
        path: '',
        component: StaffListComponent,
        // resolve: { filterData: BaseResolver },
        // data: {url: environment.baseUrl + environment.staffUrl}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule {
}
