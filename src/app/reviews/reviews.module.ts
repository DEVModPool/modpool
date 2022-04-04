import { NgModule } from '@angular/core';
import { ReviewItemComponent } from "./review-item/review-item.component";
import { RatingModule } from "primeng/rating";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DividerModule } from "primeng/divider";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { SharedModule } from "primeng/api";
import { TooltipModule } from "primeng/tooltip";
import { ReviewListComponent } from "./review-list/review-list.component";
import { RippleModule } from "primeng/ripple";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from "primeng/dialog";

@NgModule({
    declarations: [
        ReviewItemComponent,
        ReviewListComponent,
    ],
    exports: [
        ReviewListComponent
    ],
    imports: [
        RatingModule,
        FormsModule,
        RouterModule,
        DividerModule,
        CommonModule,
        ButtonModule,
        SharedModule,
        TooltipModule,
        RippleModule,
        InputTextareaModule,
        DropdownModule,
        DialogModule,
        ReactiveFormsModule
    ]
})
export class ReviewsModule {
}
