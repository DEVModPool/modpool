import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Subject} from "rxjs";
import { PlannerModule } from 'src/app/interaction/modules/planner-module.model';
import {Response} from "../../interaction/response";

@Injectable({
    providedIn: 'root'
})
export class PlannerModuleService {
    plannerModules = new Subject<PlannerModule[]>();
    constructor(private http: HttpClient) { }

    getModules(moduleFilters?: any) {
        console.log(moduleFilters);
        return this.http.get<Response<PlannerModule[]>>('http://localhost:3000/moduleList',{params: moduleFilters})
    }
}


