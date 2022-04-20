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

    get academicYears() {

        let years = [];

        for (let i = 10; i <= 30; i++) {
            years.push(`20${i}/20${i + 1}`);
        }

        return years;
    }

    constructor(private _reviewsService: ModuleReviewsService) {
        super(_reviewsService);
        this.initFormGroup({
            quality: new FormControl(),
            difficulty: new FormControl(),
            moduleAcademicYear: new FormControl(this.academicYears[0]),
            content: new FormControl()
        });
    }

    submitReview() {

        const body = {
            ...this.newReviewForm.value,
            reviewerId: localStorage[environment["userId-key"]],
            moduleCode: 'asdasd'
        }

        console.log(body);

        this._reviewsService.addReview(body);

    }
}
