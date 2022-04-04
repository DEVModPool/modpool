import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ReviewsService } from "../reviews.service";

@Injectable()
export abstract class ReviewNewComponent implements OnInit {
    displayModal = false;
    newReviewForm = new FormGroup({});
    loading = false;

    protected constructor(private reviewsService: ReviewsService) {
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
