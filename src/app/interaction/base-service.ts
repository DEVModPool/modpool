import { Subject, tap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Response } from "./response"
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { PaginationService } from "../pagination/pagination.service";


export abstract class BaseService<T> {
    getObservable = new Subject<T[]>();

    protected constructor(
        private http: HttpClient,
        private router: Router,
        private paginationService: PaginationService
    ) {
    }

    abstract initialUrl(): string;

    getAll(filters: any) {
        return this.http
            .get<Response<any>>(environment.baseUrl + this.initialUrl(), {params: filters})
            .pipe(tap(response => {
                const pageConfiguration = this.paginationService.parseConfiguration(response.result)
                this.paginationService.paginationConfiguration.next(pageConfiguration);
                this.getObservable.next(response.result.items);
            }));
    }

    addNew(object) {
        return this.http
            .post<Response<any>>(environment.baseUrl + this.initialUrl(), object)
            .pipe(
                tap(
                    response => {
                        this.router.navigate([this.initialUrl() + response.result.id])
                    }
                ),
                catchError(error => {
                    console.log(error.errors);
                    return throwError(error);
                })
            ).subscribe();
    }

    edit(id, data) {
        return this.http
            .put<Response<any>>(environment.baseUrl + this.initialUrl() + id, data)
            .pipe(
                tap(
                    response => {
                        this.router.navigate([this.initialUrl()])
                            .then(() => {
                                return this.router.navigate([this.initialUrl() + response.result.id]);
                            })
                    },
                ),
                catchError(error => {
                    console.log(error);
                    return throwError(error);
                })
            ).subscribe();
    }
}




