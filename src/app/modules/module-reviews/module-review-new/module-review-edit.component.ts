import { Component, OnInit } from '@angular/core';
import { ModuleReviewsService } from "../module-reviews.service";
import { environment } from "../../../../environments/environment";
import { ModuleReviewBaseComponent } from "./module-review-base.component";

@Component({
    selector: 'app-module-review-edit',
    templateUrl: './module-review-base.component.html',
    styleUrls: ['./module-review-base.component.scss']
})
export class ModuleReviewEditComponent extends ModuleReviewBaseComponent implements OnInit {

    academicYears: any[];
    moduleCode: string;
    patchData: any;

    review;

    constructor(
        private _reviewsService: ModuleReviewsService) {
        super(_reviewsService);
    }


    ngOnInit() {
        super.ngOnInit();

        this.storeSubscription(
            this.reviewsService.reviewEditModalDisplayed.subscribe(value => {
                this.setModalDisplayed(value);
            })
        );

        this.reviewsService.academicYearObservable.subscribe(
            response => {
                this.academicYears = response.result.academicYears;
                this.moduleCode = response.result.moduleCode;

                this.review = response.result.patchData;
                this.reviewForm.patchValue(response.result.patchData);
            }
        );
    }

    override onSubmit() {
        const body = {
            ...this.reviewForm.value,
            reviewId: this.review.id,
            reviewerId: localStorage[environment["userId-key"]],
            moduleCode: this.review.moduleCode
        }
        this._reviewsService.editReview(body);
    }
}
