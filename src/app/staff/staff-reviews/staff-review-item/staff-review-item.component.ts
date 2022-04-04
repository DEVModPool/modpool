import { Component } from '@angular/core';
import { ReviewItemComponent } from "../../../reviews/review-item.component";
import { AuthService } from "../../../auth/auth.service";

@Component({
    selector: 'app-staff-review-item',
    templateUrl: './staff-review-item.component.html',
    styleUrls: ['./staff-review-item.component.scss']
})
export class StaffReviewItemComponent extends ReviewItemComponent {
    constructor(authService: AuthService) {
        super(authService);
    }
}
