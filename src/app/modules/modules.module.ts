import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ModuleItemComponent } from "./module-list/module-item/module-item.component";
import { ModulesComponent } from "./modules.component";
import { ModuleListComponent } from "./module-list/module-list.component";
import { ModuleFilterComponent } from "./module-filter/module-filter.component";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { PaginatorModule } from "primeng/paginator";
import { TabViewModule } from "primeng/tabview";
import { ProgressBarModule } from "primeng/progressbar";
import { CheckboxModule } from "primeng/checkbox";
import { MultiSelectModule } from "primeng/multiselect";
import { ModulesRoutingModule } from "./modules-routing.module";
import { QueryParamModule } from "@ngqp/core";
import { DividerModule } from "primeng/divider";
import { ModuleDetailsComponent } from './module-details/module-details.component';
import { ChartModule } from "primeng/chart";
import { AccordionModule } from "primeng/accordion";
import { RatingModule } from "primeng/rating";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { TooltipModule } from "primeng/tooltip";
import { MessagesModule } from "primeng/messages";
import { TableModule } from "primeng/table";
import { AuthModule } from "../auth/auth.module";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextareaModule } from "primeng/inputtextarea";
import { SplitButtonModule } from "primeng/splitbutton";
import { SpeedDialModule } from "primeng/speeddial";
import { ModuleReviewNewComponent } from "./module-reviews/module-review-new/module-review-new.component";
import { ModuleReviewListComponent } from "./module-reviews/module-review-list/module-review-list.component";
import { ModuleReviewItemComponent } from "./module-reviews/module-review-item/module-review-item.component";
import { PaginationModule } from "../pagination/pagination.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ModuleReviewReactionsComponent } from "./module-reviews/module-review-reactions.component";
import { ModuleReviewEditComponent } from "./module-reviews/module-review-new/module-review-edit.component";

@NgModule({
    declarations: [
        ModuleItemComponent,
        ModulesComponent,
        ModuleListComponent,
        ModuleFilterComponent,
        ModuleDetailsComponent,
        ModuleReviewNewComponent,
        ModuleReviewListComponent,
        ModuleReviewItemComponent,
        ModuleReviewReactionsComponent,
        ModuleReviewEditComponent
    ],
    exports: [
        ModuleReviewListComponent,
        ModuleReviewNewComponent,
        ModuleReviewReactionsComponent,
        ModuleReviewEditComponent
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
        DividerModule,
        ChartModule,
        AccordionModule,
        RatingModule,
        ScrollPanelModule,
        TooltipModule,
        MessagesModule,
        TableModule,
        AuthModule,
        DialogModule,
        ReactiveFormsModule,
        InputTextareaModule,
        SplitButtonModule,
        SpeedDialModule,
        PaginationModule,
        NgxSpinnerModule,
    ]
})
export class ModulesModule {

}
