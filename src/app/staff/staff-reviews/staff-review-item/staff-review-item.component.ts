import { Component, Input } from '@angular/core';
import { ReviewItemComponent } from "../../../reviews/review-item.component";
import { ReviewsService } from "../../../reviews/reviews.service";

@Component({
    selector: 'app-staff-review-item',
    templateUrl: './staff-review-item.component.html',
    styleUrls: ['./staff-review-item.component.scss']
})
export class StaffReviewItemComponent extends ReviewItemComponent {

    @Input() review;
    reactionData;

    constructor(private reviewsService: ReviewsService) {
        super();
    }

    ngOnInit() {
        this.reactionData = this.parseReactionData(this.review);

        this.reviewsService.reactionsObservable.subscribe(
            reactionData => {
                if (this.review.id == reactionData.reviewId) {
                    this.reactionData = reactionData;
                }
            }
        )
    }
}
