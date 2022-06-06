import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ModuleItem } from "./module-list/module-item/module-item.model";
import { environment } from "../../environments/environment";
import { ServiceInterface } from "../interaction/service-interface";
import { Router } from "@angular/router";
import { PaginationService } from "../pagination/pagination.service";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class ModulesService extends ServiceInterface<ModuleItem> {

    constructor(
        http: HttpClient,
        router: Router,
        paginationService: PaginationService,
        spinner: NgxSpinnerService
    ) {
        super(http, router, paginationService, spinner);
    }

    initialUrl(): string {
        return environment.modulesUrl;
    }


}

