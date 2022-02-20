import {RouterModule, Routes} from "@angular/router";
import {ModulesComponent} from "./modules.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
    { path: '', component: ModulesComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModulesRoutingModule {}
