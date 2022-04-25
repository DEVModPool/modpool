import {NgModule} from "@angular/core";
import {ModuleItemComponent} from "../modules/module-list/module-item/module-item.component";
import {ModulesComponent} from "../modules/modules.component";
import {ModuleListComponent} from "../modules/module-list/module-list.component";
import {ModuleFilterComponent} from "../modules/module-filter/module-filter.component";
import {ModuleDetailsComponent} from "../modules/module-details/module-details.component";
import {ModuleReviewNewComponent} from "../modules/module-reviews/module-review-new/module-review-new.component";
import {ModuleReviewListComponent} from "../modules/module-reviews/module-review-list/module-review-list.component";
import {ModuleReviewItemComponent} from "../modules/module-reviews/module-review-item/module-review-item.component";
import {ModuleReviewReactionsComponent} from "../modules/module-reviews/module-review-reactions.component";
import {ModuleReviewEditComponent} from "../modules/module-reviews/module-review-new/module-review-edit.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PaginatorModule} from "primeng/paginator";
import {TabViewModule} from "primeng/tabview";
import {ProgressBarModule} from "primeng/progressbar";
import {CheckboxModule} from "primeng/checkbox";
import {MultiSelectModule} from "primeng/multiselect";
import {ModulesRoutingModule} from "../modules/modules-routing.module";
import {QueryParamModule} from "@ngqp/core";
import {DividerModule} from "primeng/divider";
import {ChartModule} from "primeng/chart";
import {AccordionModule} from "primeng/accordion";
import {RatingModule} from "primeng/rating";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {TooltipModule} from "primeng/tooltip";
import {MessagesModule} from "primeng/messages";
import {TableModule} from "primeng/table";
import {AuthModule} from "../auth/auth.module";
import {DialogModule} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SplitButtonModule} from "primeng/splitbutton";
import {SpeedDialModule} from "primeng/speeddial";
import {PaginationModule} from "../pagination/pagination.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {BaseResolver} from "../interaction/base-resolver";
import {environment} from "../../environments/environment";
import {AboutComponent} from "./about.component";

@NgModule({
    declarations: [
        AboutComponent,
    ],
    exports: [
    ],
    imports: [
        RouterModule,
        CommonModule,
        ButtonModule,
        RippleModule,
        RouterModule.forChild([
            {
                path: '',
                component: AboutComponent,
            }
        ]),
        DividerModule
    ]
})
export class AboutModule {

}
