import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ModulesService } from "../../modules/modules.service";

@Component({
    selector: 'app-review-new',
    templateUrl: './review-new.component.html',
    styleUrls: ['./review-new.component.scss']
})
export class ReviewNewComponent implements OnInit {
    displayModal = false;
    newReviewForm = new FormGroup({});

    loading = false;

    constructor(private moduleService: ModulesService) {
    }

    ngOnInit(): void {
        this.moduleService.reviewModalDisplayed.subscribe(value => {
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
