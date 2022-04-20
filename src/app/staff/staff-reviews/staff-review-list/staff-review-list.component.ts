import { Component } from '@angular/core';
import { ReviewListComponent } from "../../../reviews/review-list.component";

@Component({
    selector: 'app-staff-review-list',
    templateUrl: './staff-review-list.component.html'
})
export class StaffReviewListComponent extends ReviewListComponent {
    constructor() {
        super();
    }
}
