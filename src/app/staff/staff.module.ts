import { NgModule } from "@angular/core";
import { StaffListComponent } from "./staff-list/staff-list.component";
import { StaffRoutingModule } from "./staff-routing.module";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { QueryParamModule } from "@ngqp/core";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { SliderModule } from "primeng/slider";
import { ProgressBarModule } from "primeng/progressbar";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        StaffListComponent
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
        QueryParamModule
    ],
})
export class StaffModule {
}
