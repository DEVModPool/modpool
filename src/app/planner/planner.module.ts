import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PlannerComponent} from "./planner.component";
import {PickListModule} from 'primeng/picklist';
import { PlannerPicklistComponent } from './planner-picklist/planner-picklist.component';
import { PlannerModuleService } from './planner-picklist/planner-picklist.service';
import {ProgressBarModule} from "primeng/progressbar";
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
        ProgressBarModule
    ],
    exports: [
        PickListModule,
        ProgressBarModule
    ],
    providers: [PlannerModuleService]
})
export class PlannerModule {

}
