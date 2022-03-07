import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PlannerModuleItem } from './planner-module.model'
import { RootObject } from './planner-module.model';

@Injectable()
export class PlannerModuleService {

    constructor(private http: HttpClient) { }

    plannermodules: PlannerModuleItem[];
    heroesUrl: String;

    getProductsSmall() {
        return this.http.get<RootObject>('assets/plannermoduleitems.json').pipe(map(
            raw => this.plannermodules = raw.data))
    }
}
