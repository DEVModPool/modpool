import {RouterModule, Routes} from "@angular/router";
import { PlannerComponent } from "./planner.component";
import {NgModule} from "@angular/core";
import {BaseResolver} from "../interaction/base-resolver";
import {environment} from "../../environments/environment";

const routes: Routes = [
    {
        path: '',
        component: PlannerComponent,
        resolve: { filterData: BaseResolver },
        data: { url: environment.baseUrl + environment.modulesUrl }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlannerRoutingModule {}
