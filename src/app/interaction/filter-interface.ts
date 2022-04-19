import { AfterViewInit, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { BaseService } from "./base-service";
import { PaginationModel } from "../pagination/pagination.model";
import { PaginationService } from "../pagination/pagination.service";
import { SubscriptionHandler } from "./subscription-handler";

@Injectable()
export abstract class FilterInterface<ResolveT, QueryParamsT extends PaginationModel>
    extends SubscriptionHandler
    implements OnInit, AfterViewInit {

    isLoading = false;
    searchFilters: QueryParamsT;
    filterForm: FormGroup;

    private filterFields: string[];
    private paginationData: PaginationModel;

    abstract getFilterForm(): FormGroup;

    private getFields() {
        this.filterForm = this.getFilterForm();

        this.filterFields = Object.keys(this.filterForm.value);
    }

    protected constructor(
        private itemService: BaseService<ResolveT>,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private paginationService: PaginationService
    ) {
        super();
    }

    ngOnInit(): void {
        this.getFields();
        this.storeSubscription(
            this.activatedRoute.queryParams.subscribe(
                (params: QueryParamsT) => {
                    this.searchFilters = params;
                    this.filterForm.patchValue(params);

                    if (params.page) {
                        this.paginationData = params as PaginationModel;
                    }
                }
            )
        );

        this.storeSubscription(
            this.paginationService.pageData.subscribe(
                (data: PaginationModel) => {
                    this.searchFilters = {...this.searchFilters, ...data}
                    this.paginationData = data;
                    this.onSearch();
                }
            )
        );
    }

    getItems() {
        // console.log(this.searchFilters);

        this.itemService.getAll(this.searchFilters).subscribe(
            response => {
                // console.log(response);
            }
        );

    }

    ngAfterViewInit(): void {
        let qp = this.getQueryParams();

        let pagination = []
        if (this.paginationData) {
            pagination = Object.keys(this.paginationData);
        }

        for (let field of [...this.filterFields, ...pagination]) {
            if (qp[field] != undefined) {
                this.getItems();
                return;
            }
        }
    }

    onSearch() {
        this.router.navigate(
            ['./'],
            {
                relativeTo: this.activatedRoute,
                queryParams: this.getQueryParams()
            }
        ).then(() => {
            this.getItems();
        });
    }

    getQueryParams(): any {
        let qp: QueryParamsT = {} as QueryParamsT;

        // console.log(this.filterForm.controls.name.value);

        for (let key of this.filterFields) {
            let formValue = this.filterForm.controls[key].value;
            if (formValue) {
                qp[key] = formValue;
            }
        }

        if (!this.paginationData) {
            return qp;
        }

        console.log(this.paginationData);

        for (let key of Object.keys(this.paginationData)) {
            console.log(`${key} - ${this.paginationData[key]}`);
            qp[key] = this.paginationData[key];
        }

        // console.log(qp);

        return qp;
    }
}

