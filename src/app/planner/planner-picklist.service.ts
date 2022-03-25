import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { PlannerModule } from 'src/app/interaction/modules/planner-module.model';
import { Response } from "../interaction/response";

@Injectable({
    providedIn: 'root'
})
export class PlannerModuleService {
    plannerModules = new Subject<PlannerModule[]>();
    selectedModules = new Subject<PlannerModule[]>();

    constructor(private http: HttpClient) { }

    getModules(moduleFilters?: any) {
        let out = this.http.get<Response<PlannerModule[]>>('http://localhost:3000/moduleList',{params: moduleFilters})
        return out;
    }
}


