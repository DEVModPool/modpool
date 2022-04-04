import { Component } from '@angular/core';
import { ReviewItemComponent } from "../../../reviews/review-item.component";
import { AuthService } from "../../../auth/auth.service";

@Component({
    selector: 'app-module-review-item',
    templateUrl: './module-review-item.component.html',
    styleUrls: ['./module-review-item.component.scss']
})
export class ModuleReviewItemComponent extends ReviewItemComponent {
    constructor(authService: AuthService) {
        super(authService);
    }
}
