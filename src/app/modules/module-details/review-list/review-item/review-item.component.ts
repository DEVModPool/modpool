import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-review-item',
    templateUrl: './review-item.component.html',
    styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {
    quality = 3;
    difficulty = 4

    constructor() {
    }

    ngOnInit(): void {
    }

    upvote() {
        return;
    }

    downvote() {

    }

}
