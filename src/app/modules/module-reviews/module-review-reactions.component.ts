import { Component, Input } from "@angular/core";
import { ReactionsInterface } from "../../reviews/reaction-interface/reactions-interface";
import { AuthService } from "../../auth/auth.service";
import { ReviewsService } from "../../reviews/reviews.service";
import { environment } from "../../../environments/environment";

@Component({
    selector: 'app-module-review-reaction',
    templateUrl: '../../reviews/reaction-interface/reactions.component.html',
})
export class ModuleReviewReactionsComponent extends ReactionsInterface {

    @Input() reactionData;

    constructor(
        authService: AuthService,
        reviewsService: ReviewsService) {
        super(reviewsService, authService);

        this.setReactionData(this.reactionData);
    }

    override upvote() {
        const body = {
            reviewId: this.reactionData.reviewId,
            reviewerId: localStorage.getItem(environment['userId-key']),
            reactionType: 1
        }

        this.storeSubscription(
            this.reviewsService.sendReaction(body)
        );
    }

    override downvote() {
        const body = {
            reviewId: this.reactionData.reviewId,
            reviewerId: localStorage.getItem(environment['userId-key']),
            reactionType: 2
        }

        this.storeSubscription(
            this.reviewsService.sendReaction(body)
        );
    }
}
