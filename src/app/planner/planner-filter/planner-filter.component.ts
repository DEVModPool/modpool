import { Component, OnDestroy, OnInit, HostBinding} from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import {merge, Subject, switchMap, takeUntil, tap} from "rxjs";
import { PlannerModuleService } from '../planner-picklist.service';

interface Department {
    id: string,
    name: string
}

@Component({
  selector: 'app-planner-filter',
  templateUrl: './planner-filter.component.html',
  styleUrls: ['./planner-filter.component.scss']
})
export class PlannerFilterComponent implements OnInit, OnDestroy{

    filterOpen: Boolean;
    public paramGroup: QueryParamGroup;
    private componentDestroyed$ = new Subject<void>();

    constructor(
        private qpb: QueryParamBuilder,
        private plannerModuleService: PlannerModuleService
    ) {
        this.paramGroup = qpb.group({
            q: qpb.stringParam('q')
        });
    }

    ngOnInit(): void {

    }
    search() {
        this.plannerModuleService.getModules(this.paramGroup.value).subscribe(response => {
            this.plannerModuleService.plannerModules.next(response.result);
        })
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    getQueryParams() {

    }
}
