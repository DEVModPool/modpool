import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../auth/auth.service";

@Component({
    selector: 'app-review-item',
    templateUrl: './review-item.component.html',
    styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {
    quality = 3;
    difficulty = 4;
    expanded = false;
    sliceOptions = {
        start: 0,
        end: 300,
        default: 300
    }

    details = "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original."

    // details = "Very good module";

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
        this.authService.isLoggedIn() ? console.log("Like") : this.authService.loginModalDisplayed.next(true);
    }

    onDownvote() {
        this.authService.isLoggedIn() ? console.log("Dislike") : this.authService.loginModalDisplayed.next(true);
    }
}
