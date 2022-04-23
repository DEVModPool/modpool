import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { ServiceInterface } from "../interaction/service-interface";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { PaginationService } from "../pagination/pagination.service";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService extends ServiceInterface<any> {
    private reviewModalDisplayed = new Subject<boolean>();
    public academicYearObservable = new Subject<any>()

    protected constructor(
        http: HttpClient,
        router: Router,
        paginationService: PaginationService,
        private authService: AuthService) {
        super(http, router, paginationService);
    }

    public displayReviewModal(code: string) {
        this.authService.requireLogIn(
            () => {
                this.reviewModalDisplayed.next(true);
                this.http.get(environment.baseUrl + 'reviews/' + code + '/academic-years')
                    .subscribe(
                        response => {
                            this.academicYearObservable.next(response);
                        }
                    );
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

