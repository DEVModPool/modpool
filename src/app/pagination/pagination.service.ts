import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PaginationConfigurationModel, PaginationModel } from "./pagination.model";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    pageData = new Subject<PaginationModel>(); // Communication Pagination -> Filtering
    paginationConfiguration = new Subject<PaginationConfigurationModel>(); // Communication Get -> Pagination

    constructor() {
    }

    parseConfiguration(object): PaginationConfigurationModel {
        return {
            currentPage: object.currentPage,
            pageSize: object.pageSize,
            totalCount: object.totalCount,
            totalPages: object.totalPages
        }
    }
}
