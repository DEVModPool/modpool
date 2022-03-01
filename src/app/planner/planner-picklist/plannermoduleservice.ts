import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, lastValueFrom, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { PlannerModuleItem } from './plannermodule'
import { RootObject } from './plannermodule';

@Injectable()
export class PlannerModuleService {
    [x: string]: any;

    constructor(private http: HttpClient) { }

    plannermodules: PlannerModuleItem[];
    heroesUrl: String;

    getProductsSmall() {
        return this.http.get<RootObject>('assets/plannermoduleitems.json').pipe(map(
            raw => this.plannermodules = raw.data))
    }
}

