import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ModulesService} from "../../modules.service";

@Component({
    selector: 'app-new-review',
    templateUrl: './new-review.component.html',
    styleUrls: ['./new-review.component.scss']
})
export class NewReviewComponent implements OnInit {
    displayModal = false;
    newReviewForm = new FormGroup({
    });

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
