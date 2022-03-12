import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PlannerComponent} from "./planner.component";
import {PickListModule} from 'primeng/picklist';
import { PlannerPicklistComponent } from './planner-picklist/planner-picklist.component';
import { PlannerModuleService } from './planner-picklist.service';
import {ProgressBarModule} from "primeng/progressbar";
import {PlannerRoutingModule} from "./planner-routing.module";
import { PlannerFilterComponent } from './planner-filter/planner-filter.component'
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PaginatorModule} from "primeng/paginator";
import {TabViewModule} from "primeng/tabview";
import {CheckboxModule} from "primeng/checkbox";
import {MultiSelectModule} from "primeng/multiselect";
import {QueryParamModule} from "@ngqp/core";


@NgModule({
    declarations: [
        PlannerComponent,
        PlannerPicklistComponent,
        PlannerFilterComponent
    ],
    imports: [
        RouterModule,
        PickListModule,
        ProgressBarModule,
        PlannerRoutingModule,
        CommonModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        PaginatorModule,
        TabViewModule,
        ProgressBarModule,
        CheckboxModule,
        MultiSelectModule,
        QueryParamModule
    ],
    exports: [
        PickListModule,
        ProgressBarModule,
        PlannerFilterComponent
    ],
    providers: [PlannerModuleService]
})
export class PlannerModule {

}
