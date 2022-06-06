import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { ReviewsService } from "../../reviews/reviews.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { PaginationService } from "../../pagination/pagination.service";
import { environment } from "../../../environments/environment";
import { tap, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Response } from "../../interaction/response"
import { UserService } from "../../user/user.service";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class ModuleReviewsService extends ReviewsService {
    constructor(
        _http: HttpClient,
        private _router: Router,
        authService: AuthService,
        paginationService: PaginationService,
        private userService: UserService,
        spinner: NgxSpinnerService) {
        super(_http, _router, paginationService, authService, spinner);
    }

    addReview(review) {
        return this.http
            .post<Response<any>>(environment.baseUrl + environment.reviewsUrl, review)
            .pipe(
                catchError(error => {
                    return throwError(error);
                })
            ).subscribe(
                _ => {
                    this.closeModal();
                }
            );
    }

    editReview(review) {
        return this.http
            .put<Response<any>>(environment.baseUrl + environment.profileUrl + environment.reviewsUrl, review)
            .subscribe(
                _ => {
                    this.userService.getReviews();
                    this.closeModal();
                }
            );
    }

    deleteReview(reviewId) {
        return this.http
            .request<Response<any>>(
                'DELETE',
                environment.baseUrl + environment.profileUrl + environment.reviewsUrl,
                {body: {reviewId}}
            )
            .subscribe(
                _ => {
                    this.userService.getReviews();
                }
            )
    }
}

