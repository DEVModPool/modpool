import {RouterModule, Routes} from "@angular/router";
import {ModulesComponent} from "./modules.component";
import {NgModule} from "@angular/core";
import {BaseResolver} from "../interaction/base-resolver";
import {environment} from "../../environments/environment";

const routes: Routes = [
    {
        path: '',
        component: ModulesComponent,
        resolve: { filterData: BaseResolver },
        data: { url: environment.baseUrl + environment.modulesUrl }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModulesRoutingModule {}
