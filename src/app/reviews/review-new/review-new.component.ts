import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ModulesService } from "../../modules/modules.service";
import { ReviewsService } from "../reviews.service";

@Component({
    selector: 'app-review-new',
    templateUrl: './review-new.component.html',
    styleUrls: ['./review-new.component.scss']
})
export class ReviewNewComponent implements OnInit {
    displayModal = false;
    newReviewForm = new FormGroup({});

    loading = false;

    constructor(private reviewsService: ReviewsService) {
    }

    ngOnInit(): void {
        this.reviewsService.getReviewModalSubject().subscribe(value => {
            this.displayModal = value;
        })
    }

    submitReview() {
        console.log("Form submitted.");
    }

    closeModal() {
        this.displayModal = false;

    }
}
