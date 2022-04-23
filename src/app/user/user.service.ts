import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { PaginationService } from "../pagination/pagination.service";
import { Response } from "../interaction/response"
import { Subject } from "rxjs";
import { ReviewsService } from "../reviews/reviews.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    reviewsObservable: Subject<any> = new Subject<any>();

    protected constructor(
        private http: HttpClient,
        private reviewsService: ReviewsService,
        router: Router,
        paginationService: PaginationService,
        private authService: AuthService) {
    }

    getReviews() {
        this.http.get<Response<any>>(environment.baseUrl + environment.profileUrl)
            .subscribe(
                response => {
                    console.log(response);
                    this.reviewsObservable.next(response.result);
                }
            )
    }

    deleteReview(reviewId) {
        const body = {
            reviewId
        }

        return this.http
            .request<Response<any>>(
                'DELETE',
                environment.baseUrl + environment.profileUrl,
                {body})
            .subscribe(
                _ => {
                    this.getReviews();
                }
            );
    }
}

