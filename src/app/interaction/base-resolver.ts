import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EMPTY, map, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Response } from "./response"
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: "root",
})
export class BaseResolver<T> implements Resolve<T> {
    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
        let url = route.data['url'];
        const id = route.params['id'];

        if (id) {
            url += `${id}/`
        }

        url += environment.resolverUrl;

        return this.http.get<Response<T>>(url).pipe(
            map(response => {
                return response.result;
            }),
            catchError(() => {
                this.router.navigate(['']);
                return EMPTY;
            })
        );
    }
}

