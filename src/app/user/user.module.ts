import { NgModule } from "@angular/core";
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
import { DividerModule } from "primeng/divider";
import { ModulesModule } from "../modules/modules.module";
import { AuthModule } from "../auth/auth.module";
import { DialogModule } from "primeng/dialog";
import { RatingModule } from "primeng/rating";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessagesModule } from "primeng/messages";
import { PaginationModule } from "../pagination/pagination.module";
import { TooltipModule } from "primeng/tooltip";
import { UserComponent } from "./user.component";
import { UserReviewItemComponent } from "./user-reviews/user-review-item/user-review-item.component";
import { UserReviewListComponent } from "./user-reviews/user-review-list/user-review-list.component";
import { TagModule } from "primeng/tag";

@NgModule({
    declarations: [
        UserComponent,
        UserReviewItemComponent,
        UserReviewListComponent
    ],
    imports: [
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
        TagModule
    ]
})
export class UserModule {
}
