import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

import { PlannerModuleItem } from './plannermodule'

@Injectable()
export class PlannerModuleService {

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return lastValueFrom(this.http.get<any>('assets/plannermoduleitems.json'))
        .then(res => <PlannerModuleItem[]>res.data)
        .then(data => { return data; });
    }

}
