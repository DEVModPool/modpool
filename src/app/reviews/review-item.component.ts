import { Injectable } from '@angular/core';

@Injectable()
export class ReviewItemComponent {

    expanded = false;
    sliceOptions = {
        start: 0,
        end: 300,
        default: 300
    }

    quality: number;
    difficulty: number;
    content: number;
    reactionData: { upvoteCount: number, downvoteCount: number, reactions: any[], reviewId: string };

    constructor() {
    }

    toggleReview() {
        this.expanded = !this.expanded;
        // TODO-TD: Add some kind of loader or a transition here.
        this.sliceOptions.end = this.sliceOptions.end ? undefined : this.sliceOptions.default;
    }

    parseReactionData(reviewObj) {
        return {
            reviewId: reviewObj.id,
            upvoteCount: reviewObj.upvoteCount,
            downvoteCount: reviewObj.downvoteCount,
            reactions: reviewObj.reactions
        }
    }
}
