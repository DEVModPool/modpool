import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { ServiceInterface } from "../interaction/service-interface";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { PaginationService } from "../pagination/pagination.service";
import { Response } from "../interaction/response"

@Injectable({
    providedIn: 'root'
})
export class ReviewsService extends ServiceInterface<any> {
    public reviewEditModalDisplayed = new Subject<boolean>();
    public reviewNewModalDisplayed = new Subject<boolean>();
    public academicYearObservable = new Subject<any>();
    public reactionsObservable = new Subject<any>();

    protected constructor(
        http: HttpClient,
        router: Router,
        paginationService: PaginationService,
        private authService: AuthService) {
        super(http, router, paginationService);
    }

    public displayNewReviewModal(code: string) {
        this.authService.requireLogIn(
            () => {
                this.reviewNewModalDisplayed.next(true);
                this.http.get<Response<any>>(environment.baseUrl + environment.reviewsUrl + environment.modulesUrl + code + '/academic-years')
                    .subscribe(
                        response => {
                            console.log(response);
                            this.academicYearObservable.next(response);
                        }
                    );
            }
        )
    }

    public displayEditReviewModal(code: string, body: any) {
        this.authService.requireLogIn(
            () => {
                console.log("IM sending");
                this.reviewEditModalDisplayed.next(true);
                this.http.get<Response<any>>(environment.baseUrl + environment.reviewsUrl + environment.modulesUrl + code + '/academic-years')
                    .subscribe(
                        response => {
                            response.result['patchData'] = body;

                            console.log(response);
                            this.academicYearObservable.next(response);
                        }
                    );
            }
        )
    }

    closeModal() {
        this.reviewEditModalDisplayed.next(false);
        this.reviewNewModalDisplayed.next(false);
    }

    sendReaction(body) {
        return this.http.post(environment.baseUrl + environment.reviewsUrl + 'reactions', body)
            .subscribe(
                _ => {
                    this.http.get<Response<any>>(environment.baseUrl + 'reactions/' + environment.reviewsUrl + body.reviewId)
                        .subscribe(
                            response => {
                                this.reactionsObservable.next(response.result);
                            }
                        )
                }
            );
    }

    initialUrl(): string {
        return environment.reviewsUrl;
    }
}

