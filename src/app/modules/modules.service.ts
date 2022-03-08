import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {Module} from "../interaction/modules/module.model";
import {Response} from "../interaction/ response";

@Injectable({
    providedIn: 'root'
})
export class ModulesService {
    modules = new Subject<Module[]>();

    constructor(private http: HttpClient) {
    }
    getModules(moduleFilters?: any) {
        console.log(moduleFilters);
        return this.http.get<Response<Module[]>>('http://localhost:3000/moduleList',{params: moduleFilters})
    }
}

