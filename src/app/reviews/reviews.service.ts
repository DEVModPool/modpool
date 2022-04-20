import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { BaseService } from "../interaction/base-service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { PaginationService } from "../pagination/pagination.service";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService extends BaseService<any> {
    private reviewModalDisplayed = new Subject<boolean>();

    protected constructor(
        http: HttpClient,
        router: Router,
        paginationService: PaginationService,
        private authService: AuthService) {
        super(http, router, paginationService);
    }

    public displayReviewModal() {
        this.authService.requireLogIn(
            () => {
                this.reviewModalDisplayed.next(true);
            }
        )
    }

    public getReviewModalSubject() {
        return this.reviewModalDisplayed;
    }

    initialUrl(): string {
        return environment.reviewsUrl;
    }
}

