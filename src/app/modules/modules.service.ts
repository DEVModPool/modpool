import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { ModuleItem } from "./module-list/module-item/module-item.model";
import { Response } from "../interaction/response";
import { environment } from "../../environments/environment";
import { ServiceInterface } from "../interaction/service-interface";
import { Router } from "@angular/router";
import { PaginationService } from "../pagination/pagination.service";

@Injectable({
    providedIn: 'root'
})
export class ModulesService extends ServiceInterface<ModuleItem> {

    constructor(
        http: HttpClient,
        router: Router,
        paginationService: PaginationService
    ) {
        super(http, router, paginationService);
    }

    initialUrl(): string {
        return environment.modulesUrl;
    }

    // modules = new Subject<ModuleItem[]>();
    //
    // constructor(private http: HttpClient) {
    // }

    // getModules(moduleFilters?: any) {
    //     console.log(moduleFilters);
    //     return this.http.get<Response<ModuleItem[]>>(environment.baseUrl + 'modules', {params: moduleFilters})
    // }
}

