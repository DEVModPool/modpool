import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ReviewsService } from "./reviews.service";
import { SubscriptionHandler } from "../interaction/subscription-handler";

@Injectable()
export abstract class ReviewNewComponent extends SubscriptionHandler {
    displayModal = false;
    loading = false;
    reviewForm;

    protected constructor(protected reviewsService: ReviewsService) {
        super()
    }

    initFormGroup(controls) {
        this.reviewForm = new FormGroup(controls);
    }

    abstract onSubmit();

    setModalDisplayed(value) {
        value ? this.displayModal = true : this.closeModal();
    }

    closeModal() {
        this.displayModal = false;
        this.reviewForm.reset();
    }
}
