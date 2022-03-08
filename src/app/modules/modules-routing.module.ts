import {RouterModule, Routes} from "@angular/router";
import {ModulesComponent} from "./modules.component";
import {NgModule} from "@angular/core";
import {BaseResolver} from "../interaction/base-resolver";


const routes: Routes = [
    {
        path: '',
        component: ModulesComponent,
        resolve: { filterData: BaseResolver },
        data: { url: 'http://localhost:3000/modulesViewModel' }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModulesRoutingModule {}
