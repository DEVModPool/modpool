import { Component, OnInit } from '@angular/core';
import { StaffReviewsService } from "../staff-reviews.service";
import { ReviewNewComponent } from "../../../reviews/review-new.component";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'app-staff-review-new',
    templateUrl: './staff-review-new.component.html',
    styleUrls: ['./staff-review-new.component.scss']
})
export class StaffReviewNewComponent extends ReviewNewComponent implements OnInit {

    constructor(reviewsService: StaffReviewsService) {
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
