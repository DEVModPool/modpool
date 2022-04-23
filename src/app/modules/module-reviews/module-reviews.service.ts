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

@Injectable({
    providedIn: 'root'
})
export class ModuleReviewsService extends ReviewsService {
    constructor(
        _http: HttpClient,
        private _router: Router,
        authService: AuthService,
        paginationService: PaginationService) {
        super(_http, _router, paginationService, authService);
    }

    addReview(review) {
        return this.http
            .post<Response<any>>(environment.baseUrl + environment.reviewsUrl, review)
            .pipe(
                catchError(error => {
                    console.log(error.errors);
                    return throwError(error);
                })
            ).subscribe();
    }
}

