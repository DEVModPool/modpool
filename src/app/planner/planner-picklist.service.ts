import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { PlannerModule } from 'src/app/interaction/modules/planner-module.model';
import { Response } from "../interaction/response";
import { PlanData, PlanList, PlanNames, PlanReturn } from '../interaction/modules/planData.model';
import { environment } from "../../environments/environment";
import { env } from 'process';

@Injectable({
    providedIn: 'root'
})
export class PlannerModuleService {
    plannerModules = new Subject<PlannerModule[]>();
    selectedModules = new Subject<PlannerModule[]>();
    requestedModule = new Subject<PlannerModule>();
    returnPlan = new Subject<PlanReturn>();
    returnNames = new Subject<PlanNames[]>();
    constructor(private http: HttpClient) { }

    getModules(moduleFilters?: any) {
        let out = this.http.get<Response<any>>(environment.baseUrl + environment.modulePlanners + environment.modulesUrl ,{params: moduleFilters})
        console.log("called")
        return out;
    }

    getModule(moduleFilters?: any) {
        let out = this.http.get<Response<PlannerModule>>(environment.baseUrl + environment.modulePlanners + environment.modulesUrl + moduleFilters)
        return out;
    }

    getPlan(nameFilters?: any) {
        let out = this.http.get<Response<PlanReturn>>(environment.baseUrl + environment.modulePlanners + nameFilters)
        return out;
    }

    getNames(nameFilters?: any) {
        let out = this.http.get<Response<PlanList>>(environment.baseUrl + environment.modulePlanners + environment.resolverUrl, {headers: nameFilters})
        return out;
    }

    savePlan(plan: any){
        return this.http.post<Response<any>>(environment.baseUrl + environment.modulePlanners, plan)
                .pipe(
                    catchError(error => {
                        console.log(error.errors);
                        return throwError(error.errors);
                    })
                ).subscribe();

    }
    deletePlan(plan: any){
        return this.http.post<Response<any>>(environment.baseUrl + environment.modulePlanners, plan)
                .pipe(
                    catchError(error => {
                        console.log(error.errors);
                        return throwError(error.errors);
                    })
                ).subscribe();

    }
}


