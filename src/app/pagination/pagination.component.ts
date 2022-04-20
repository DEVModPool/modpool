import { Component, OnInit } from '@angular/core';
import { PaginationConfigurationModel, PaginationModel } from "./pagination.model";
import { PaginationService } from "./pagination.service";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

    configuration: PaginationConfigurationModel;
    pageSize: number = 0;
    totalCount: number = 0;
    currentPage: number = 0;

    get first() {
        return this.currentPage * this.pageSize;
    }

    constructor(
        private paginationService: PaginationService) {
    }

    ngOnInit(): void {
        this.paginationService.paginationConfiguration.subscribe(
            configuration => {
                this.pageSize = configuration.pageSize;
                this.totalCount = configuration.totalCount;
                this.currentPage = configuration.currentPage - 1;
                this.configuration = configuration
            }
        )
    }

    parseEvent(event): PaginationModel {
        return {
            page: event.page + 1,
            pageSize: event.rows,
        }
    }

    onPaginatorChanged(event) {
        this.paginationService.pageData.next(this.parseEvent(event));
    }
}
