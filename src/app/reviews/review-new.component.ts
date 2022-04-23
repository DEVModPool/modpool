import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ReviewsService } from "./reviews.service";

@Injectable()
export abstract class ReviewNewComponent implements OnInit {
    displayModal = false;
    loading = false;
    newReviewForm;

    protected constructor(private reviewsService: ReviewsService) {
    }

    initFormGroup(controls) {
        this.newReviewForm = new FormGroup(controls);
    }

    ngOnInit(): void {
        this.reviewsService.getReviewModalSubject().subscribe(value => {
            this.displayModal = value;
        })
    }

    abstract submitReview();

    closeModal() {
        this.displayModal = false;
    }
}
