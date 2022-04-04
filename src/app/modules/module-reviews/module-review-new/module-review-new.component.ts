import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ReviewNewComponent } from "../../../reviews/review-new.component";
import { ModuleReviewsService } from "../module-reviews.service";

@Component({
    selector: 'app-module-review-new',
    templateUrl: './module-review-new.component.html',
    styleUrls: ['./module-review-new.component.scss']
})
export class ModuleReviewNewComponent extends ReviewNewComponent implements OnInit {

    constructor(reviewsService: ModuleReviewsService) {
        super(reviewsService);
        this.initFormGroup({
            quality: new FormControl(),
            difficulty: new FormControl(),
            coordinator: new FormControl(),
            year: new FormControl(),
            review: new FormControl()
        });
    }

    submitReview() {
        console.log(this.newReviewForm.value);
    }
}
