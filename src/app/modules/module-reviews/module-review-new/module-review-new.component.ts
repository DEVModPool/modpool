import { Component, OnInit } from '@angular/core';
import { ModuleReviewsService } from "../module-reviews.service";
import { environment } from "../../../../environments/environment";
import { ModuleReviewBaseComponent } from "./module-review-base.component";
import { MessageService } from "primeng/api";


@Component({
    selector: 'app-module-review-new',
    templateUrl: './module-review-base.component.html',
    styleUrls: ['./module-review-base.component.scss']
})
export class ModuleReviewNewComponent extends ModuleReviewBaseComponent implements OnInit {

    academicYears: any[];
    moduleCode: string;
    patchData: any;

    constructor(
        private _reviewsService: ModuleReviewsService,
        private messageService: MessageService) {
        super(_reviewsService);
    }

    ngOnInit() {
        super.ngOnInit();

        this.storeSubscription(
            this.reviewsService.reviewNewModalDisplayed.subscribe(value => {
                this.setModalDisplayed(value);
            })
        );

        this.reviewsService.academicYearObservable.subscribe(
            response => {
                this.academicYears = response.result.academicYears;
                this.moduleCode = response.result.moduleCode;
            }
        );
    }

    override onSubmit() {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Your review will be visible soon!'
        });

        const body = {
            ...this.reviewForm.value,
            reviewerId: localStorage[environment["userId-key"]],
            moduleCode: this.moduleCode
        }

        this._reviewsService.addReview(body);
    }
}
