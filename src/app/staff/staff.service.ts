import { Injectable } from "@angular/core";
import { BaseService } from "../interaction/base-service";
import { StaffModel } from "./staff.model";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PaginationService } from "../pagination/pagination.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class StaffService extends BaseService<StaffModel> {

    constructor(
        http: HttpClient,
        router: Router,
        paginationService: PaginationService
    ) {
        super(http, router, paginationService);
    }

    initialUrl(): string {
        return environment.coordinatorsUrl;
    }
}