import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { ReviewsService } from "../../reviews/reviews.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { PaginationService } from "../../pagination/pagination.service";

@Injectable({
    providedIn: 'root'
})
export class ModuleReviewsService extends ReviewsService {
    constructor(
        http: HttpClient,
        router: Router,
        authService: AuthService,
        paginationService: PaginationService) {
        super(http, router, paginationService, authService);
    }
}

