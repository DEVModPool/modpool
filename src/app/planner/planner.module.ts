import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PlannerComponent} from "./planner.component";
import {PickListModule} from 'primeng/picklist';
import { PlannerPicklistComponent } from './planner-picklist/planner-picklist.component';
import { PlannerModuleService } from './planner-picklist/planner-picklist.service';
import {ProgressBarModule} from "primeng/progressbar";
import {PlannerRoutingModule} from "./planner-picklist/planner-routing.module"
@NgModule({
    declarations: [
        PlannerComponent,
        PlannerPicklistComponent
    ],
    imports: [
        RouterModule.forChild(
            [
                {path: '', component: PlannerComponent}
            ]
        ),
        PickListModule,
        ProgressBarModule,
        PlannerRoutingModule
    ],
    exports: [
        PickListModule,
        ProgressBarModule
    ],
    providers: [PlannerModuleService]
})
export class PlannerModule {

}
