import { Component, Input } from '@angular/core';
import { ReviewItemComponent } from "../../../reviews/review-item.component";
import { UserService } from "../../user.service";
import { ModuleReviewsService } from "../../../modules/module-reviews/module-reviews.service";
import { ConfirmationService } from "primeng/api";

@Component({
    selector: 'app-user-review-item',
    templateUrl: './user-review-item.component.html',
    styleUrls: ['./user-review-item.component.scss']
})
export class UserReviewItemComponent extends ReviewItemComponent {

    @Input() review: any;
    reactionData;

    constructor(
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private reviewService: ModuleReviewsService) {
        super();
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
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this review?',
            header: 'Delete review',
            accept: () => {
                this.reviewService.deleteReview(id);
            }
        });
    }

    ngOnInit() {
        this.reactionData = this.parseReactionData(this.review);
    }
}
