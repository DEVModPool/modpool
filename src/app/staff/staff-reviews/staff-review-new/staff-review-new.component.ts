import { Component, OnInit } from '@angular/core';
import { ReviewNewComponent } from "../../../reviews/review-new.component";
import { FormControl } from "@angular/forms";
import { ModuleReviewsService } from "../../../modules/module-reviews/module-reviews.service";

@Component({
    selector: 'app-staff-review-new',
    templateUrl: './staff-review-new.component.html',
    styleUrls: ['./staff-review-new.component.scss']
})
export class StaffReviewNewComponent extends ReviewNewComponent implements OnInit {

    constructor(reviewsService: ModuleReviewsService) {
        super(reviewsService);
        this.initFormGroup({
            quality: new FormControl(),
            module: new FormControl(),
            review: new FormControl()
        })
    }

    submitReview() {
        console.log(this.newReviewForm.value);
    }
}
