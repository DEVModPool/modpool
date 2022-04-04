import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {
    private reviewModalDisplayed = new Subject<boolean>();

    constructor(private authService: AuthService) {
    }

    public displayReviewModal() {
        this.authService.isLoggedIn() ?
            this.reviewModalDisplayed.next(true) :
            this.authService.loginModalDisplayed.next(true);
    }

    public getReviewModalSubject() {
        return this.reviewModalDisplayed;
    }
}

