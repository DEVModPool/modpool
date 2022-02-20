import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ModuleItemComponent} from "./module-list/module-item/module-item.component";
import {ModulesComponent} from "./modules.component";
import {ModuleListComponent} from "./module-list/module-list.component";
import {ModuleFilterComponent} from "./module-filter/module-filter.component";
import {ModuleSearchComponent} from "./module-search/module-search.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PaginatorModule} from "primeng/paginator";
import {TabViewModule} from "primeng/tabview";
import {ProgressBarModule} from "primeng/progressbar";
import {CheckboxModule} from "primeng/checkbox";
import {MultiSelectModule} from "primeng/multiselect";
import {ModulesRoutingModule} from "./modules-routing.module";

@NgModule({
    declarations: [
        ModuleItemComponent,
        ModulesComponent,
        ModuleListComponent,
        ModuleFilterComponent,
        ModuleSearchComponent
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
        ModulesRoutingModule
    ]
})
export class ModulesModule {

}
