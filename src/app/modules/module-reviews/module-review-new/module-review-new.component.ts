import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ReviewNewComponent } from "../../../reviews/review-new.component";
import { ModuleReviewsService } from "../module-reviews.service";
import { environment } from "../../../../environments/environment";

@Component({
    selector: 'app-module-review-new',
    templateUrl: './module-review-new.component.html',
    styleUrls: ['./module-review-new.component.scss']
})
export class ModuleReviewNewComponent extends ReviewNewComponent implements OnInit {

    academicYears: any[];
    moduleCode: string;

    constructor(private _reviewsService: ModuleReviewsService) {
        super(_reviewsService);
        this.initFormGroup({
            quality: new FormControl(),
            difficulty: new FormControl(),
            moduleAcademicYear: new FormControl(),
            content: new FormControl()
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this._reviewsService.academicYearObservable.subscribe(
            response => {
                this.academicYears = response.result.academicYears;
                this.moduleCode = response.result.moduleCode;
            }
        );
    }

    submitReview() {

        const body = {
            ...this.newReviewForm.value,
            reviewerId: localStorage[environment["userId-key"]],
            moduleCode: this.moduleCode
        }

        this._reviewsService.addReview(body);
    }
}
