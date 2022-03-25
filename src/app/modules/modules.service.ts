import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {ModuleItem} from "./module-list/module-item/module-item.model";
import {Response} from "../interaction/response";

@Injectable({
    providedIn: 'root'
})
export class ModulesService {
    modules = new Subject<ModuleItem[]>();

    constructor(private http: HttpClient) {
    }
    getModules(moduleFilters?: any) {
        console.log(moduleFilters);
        return this.http.get<Response<ModuleItem[]>>('http://localhost:3000/moduleList',{params: moduleFilters})
    }
}

