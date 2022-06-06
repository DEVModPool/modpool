import { Component, Input } from '@angular/core';
import { ReviewItemComponent } from "../../../reviews/review-item.component";
import { ReviewsService } from "../../../reviews/reviews.service";

@Component({
    selector: 'app-module-review-item',
    templateUrl: './module-review-item.component.html',
    styleUrls: ['./module-review-item.component.scss']
})
export class ModuleReviewItemComponent extends ReviewItemComponent {

    @Input() review;

    constructor(
        private reviewsService: ReviewsService,) {
        super();
    }

    ngOnInit(): void {
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
