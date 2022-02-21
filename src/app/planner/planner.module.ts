import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PlannerComponent} from "./planner.component";


@NgModule({
    declarations: [
        PlannerComponent
    ],
    imports: [
        RouterModule.forChild(
            [
                {path: '', component: PlannerComponent}
            ]
        )
    ]
})
export class PlannerModule {

}
