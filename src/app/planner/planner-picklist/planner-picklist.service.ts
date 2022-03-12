import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Subject} from "rxjs";
import { PlannerModule } from 'src/app/interaction/modules/planner.model';
import {Response} from "../interaction/response";

@Injectable({
    providedIn: 'root'
})
export class PlannerModuleService {

    constructor(private http: HttpClient) { }

    plannermodules: PlannerModuleItem[];

    getProductsSmall() {
        return this.http.get<RootObject>('assets/plannermoduleitems.json').pipe(
            map(raw => this.plannermodules = raw.data))
    }
}


