import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ReviewNewComponent } from "../../../reviews/review-new.component";
import { ModuleReviewsService } from "../module-reviews.service";

@Component({
    selector: 'app-module-review-new',
    templateUrl: './module-review-new.component.html',
    styleUrls: ['./module-review-new.component.scss']
})
export class ModuleReviewNewComponent extends ReviewNewComponent implements OnInit {

    constructor(reviewsService: ModuleReviewsService) {
        super(reviewsService)
    }

    submitReview() {
        console.log("Form submitted.");
    }
}
