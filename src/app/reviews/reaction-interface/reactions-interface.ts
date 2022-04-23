import { Injectable, OnInit } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { SubscriptionHandler } from "../../interaction/subscription-handler";
import { environment } from "../../../environments/environment";
import { ReviewsService } from "../reviews.service";

@Injectable({
    providedIn: 'root'
})
export abstract class ReactionsInterface extends SubscriptionHandler implements OnInit {

    reactionData: { upvoteCount: number, downvoteCount: number, reactions: any[], reviewId: string };

    protected constructor(
        protected reviewsService: ReviewsService,
        private authService: AuthService) {
        super();
    }

    ngOnInit(): void {
        // this.reviewsService.reactionsObservable.subscribe(
        //     reactionData => {
        //         this.reactionData = reactionData;
        //     }
        // )
    }

    protected setReactionData(reactionData) {
        this.reactionData = reactionData;
    }

    protected findId(id: any, reactions: any[]): any {
        for (let reaction of reactions) {
            if (reaction.studentId === id) return reaction;
        }
        return null;
    }

    userUpvoted(): boolean {
        const userId = localStorage.getItem(environment["userId-key"]);
        const reaction = this.findId(userId, this.reactionData.reactions);

        if (!reaction) {
            return false;
        }

        return reaction.reactionType == 1;
    }

    userDownvoted(): boolean {
        const userId = localStorage.getItem(environment["userId-key"]);
        const reaction = this.findId(userId, this.reactionData.reactions);

        if (!reaction) {
            return false;
        }

        return reaction.reactionType == 2;
    }

    abstract upvote();

    abstract downvote();

    onUpvote() {
        this.authService.requireLogIn(() => this.upvote());
    }

    onDownvote() {
        this.authService.requireLogIn(() => this.downvote());
    }
}
