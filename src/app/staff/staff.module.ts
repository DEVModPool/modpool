import { NgModule } from "@angular/core";
import { StaffListComponent } from "./staff-list/staff-list.component";
import { StaffRoutingModule } from "./staff-routing.module";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
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
import { DialogModule } from "primeng/dialog";
import { RatingModule } from "primeng/rating";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessagesModule } from "primeng/messages";
import { PaginationModule } from "../pagination/pagination.module";
import { StaffReviewItemComponent } from "./staff-reviews/staff-review-item/staff-review-item.component";
import { StaffReviewListComponent } from "./staff-reviews/staff-review-list/staff-review-list.component";
import { TooltipModule } from "primeng/tooltip";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    declarations: [
        StaffListComponent,
        StaffFilterComponent,
        StaffComponent,
        StaffDetailsComponent,
        StaffReviewItemComponent,
        StaffReviewListComponent
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
        RippleModule,
        ReactiveFormsModule,
        DividerModule,
        ModulesModule,
        AuthModule,
        DialogModule,
        RatingModule,
        InputTextareaModule,
        MessagesModule,
        PaginationModule,
        TooltipModule,
        NgxSpinnerModule
    ]
})
export class StaffModule {
}
