import { Injectable, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ReviewItemComponent implements OnInit {

    expanded = false;
    sliceOptions = {
        start: 0,
        end: 300,
        default: 300
    }

    quality: number;
    difficulty: number;
    content: number;

    toggleReview() {
        this.expanded = !this.expanded;
        // TODO-TD: Add some kind of loader or a transition here.
        this.sliceOptions.end = this.sliceOptions.end ? undefined : this.sliceOptions.default;
    }

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    onUpvote() {
        this.authService.requireLogIn(() => console.log('like'));
    }

    onDownvote() {
        this.authService.requireLogIn(() => console.log('dislike'));
    }
}
