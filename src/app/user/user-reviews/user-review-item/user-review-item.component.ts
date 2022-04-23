import { Component, Input } from '@angular/core';
import { ReviewItemComponent } from "../../../reviews/review-item.component";
import { AuthService } from "../../../auth/auth.service";
import { Review } from "../../../interaction/reviews/review.model";
import { UserService } from "../../user.service";
import { ReviewsService } from "../../../reviews/reviews.service";
import { ModuleReviewsService } from "../../../modules/module-reviews/module-reviews.service";

@Component({
    selector: 'app-user-review-item',
    templateUrl: './user-review-item.component.html',
    styleUrls: ['./user-review-item.component.scss']
})
export class UserReviewItemComponent extends ReviewItemComponent {

    @Input() review: any;
    reactionData;

    constructor(
        private userService: UserService,
        private reviewService: ModuleReviewsService,
        authService: AuthService) {
        super(authService);
    }

    getTagStatus(review: any) {
        if (review.reviewStatus === 'Approved') {
            return 'success';
        } else if (review.reviewStatus === 'Pending') {
            return 'warning';
        }
        return 'danger';
    }

    editReview(code) {
        this.reviewService.displayEditReviewModal(code, this.review);
    }

    deleteReview(id) {

    }

    ngOnInit() {
        this.reactionData = this.parseReactionData(this.review);
    }
}
