import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-review-list',
    templateUrl: './staff-review-list.component.html'
})
export class StaffReviewListComponent {

    @Input() reviews;

    constructor() {
    }
}
