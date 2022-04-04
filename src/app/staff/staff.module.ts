import { NgModule } from "@angular/core";
import { StaffListComponent } from "./staff-list/staff-list.component";
import { StaffRoutingModule } from "./staff-routing.module";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { QueryParamModule } from "@ngqp/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { SliderModule } from "primeng/slider";
import { ProgressBarModule } from "primeng/progressbar";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { RippleModule } from "primeng/ripple";
import { StaffFilterComponent } from "./staff-filter/staff-filter.component";
import { StaffComponent } from "./staff.component";
import { StaffDetailsComponent } from "./staff-details/staff-details.component";
import { DividerModule } from "primeng/divider";
import { ModulesModule } from "../modules/modules.module";
import { AuthModule } from "../auth/auth.module";

@NgModule({
    declarations: [
        StaffListComponent,
        StaffFilterComponent,
        StaffComponent,
        StaffDetailsComponent
    ],
    imports: [
        StaffRoutingModule,
        TableModule,
        InputTextModule,
        MultiSelectModule,
        FormsModule,
        DropdownModule,
        SliderModule,
        ProgressBarModule,
        ButtonModule,
        CommonModule,
        QueryParamModule,
        RippleModule,
        ReactiveFormsModule,
        DividerModule,
        ModulesModule,
        AuthModule,
    ],
})
export class StaffModule {
}
