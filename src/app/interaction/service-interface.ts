import { Subject, tap, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Response } from "./response"
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { PaginationService } from "../pagination/pagination.service";
import { NgxSpinnerService } from "ngx-spinner";


export abstract class ServiceInterface<T> {
    getObservable = new Subject<T[]>();

    protected constructor(
        protected http: HttpClient,
        private router: Router,
        private paginationService: PaginationService,
        private spinner: NgxSpinnerService
    ) {
    }

    abstract initialUrl(): string;

    getAll(filters: any = {}) {
        const headers: HttpHeaders = new HttpHeaders();

        this.spinner.show('moduleListSpinner');

        return this.http
            .get<Response<any>>(environment.baseUrl + this.initialUrl(),
                {
                    params: filters,
                    headers: headers.append('bypassInterceptor', 'true')
                })
            .pipe(
                tap(response => {
                    this.paginationService.broadcastNewData(response.result);
                    this.getObservable.next(response.result.items);
                    this.spinner.hide('moduleListSpinner');
                }),
                catchError(error => {
                    return throwError(error);
                })
            )
            .subscribe();
    }
}




