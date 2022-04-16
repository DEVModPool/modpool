import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { PlannerModule } from 'src/app/interaction/modules/planner-module.model';
import { Response } from "../interaction/response";
import { PlanData } from '../interaction/modules/planData.model';

@Injectable({
    providedIn: 'root'
})
export class PlannerModuleService {
    plannerModules = new Subject<PlannerModule[]>();
    selectedModules = new Subject<PlannerModule[]>();
    requestedModule = new Subject<PlannerModule>();
    returnPlan = new Subject<PlanData>();
    constructor(private http: HttpClient) { }

    getModules(moduleFilters?: any) {
        let out = this.http.get<Response<PlannerModule[]>>('http://localhost:3000/moduleList',{params: moduleFilters})
        return out;
    }
    getModule(moduleFilters?: any) {
        let out = this.http.get<Response<PlannerModule>>('http://localhost:3000/moduleList',{params: moduleFilters})
        return out;
    }
    getPlan(moduleFilters?: any) {
        let out = this.http.get<Response<PlanData>>('http://localhost:3000/plannerData',{params: null})
        return out;
    }
}


