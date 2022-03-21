import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ModuleItemComponent} from "./module-list/module-item/module-item.component";
import {ModulesComponent} from "./modules.component";
import {ModuleListComponent} from "./module-list/module-list.component";
import {ModuleFilterComponent} from "./module-filter/module-filter.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PaginatorModule} from "primeng/paginator";
import {TabViewModule} from "primeng/tabview";
import {ProgressBarModule} from "primeng/progressbar";
import {CheckboxModule} from "primeng/checkbox";
import {MultiSelectModule} from "primeng/multiselect";
import {ModulesRoutingModule} from "./modules-routing.module";
import {QueryParamModule} from "@ngqp/core";
import {DividerModule} from "primeng/divider";

@NgModule({
    declarations: [
        ModuleItemComponent,
        ModulesComponent,
        ModuleListComponent,
        ModuleFilterComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        PaginatorModule,
        TabViewModule,
        ProgressBarModule,
        CheckboxModule,
        MultiSelectModule,
        ModulesRoutingModule,
        QueryParamModule,
        DividerModule
    ]
})
export class ModulesModule {

}
