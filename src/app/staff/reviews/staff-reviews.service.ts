import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { ReviewsService } from "../../reviews/reviews.service";

@Injectable({
    providedIn: 'root'
})
export class StaffReviewsService extends ReviewsService {
    constructor(authService: AuthService) {
        super(authService);
    }
}

