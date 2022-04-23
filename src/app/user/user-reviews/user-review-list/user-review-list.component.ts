import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-review-list',
    templateUrl: './user-review-list.component.html'
})
export class UserReviewListComponent {

    @Input() reviews;

    constructor() {
    }
}
