import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import {Subject, switchMap, takeUntil} from "rxjs";
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
    departments: Department[];
    semesters: any[];
    creditOptions: any[];
    selectedCreditOptions: any[];
    moduleLevels: any[];
    selectedModuleLevels: any[];

    public paramGroup: QueryParamGroup;
    private componentDestroyed$ = new Subject<void>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private qpb: QueryParamBuilder,
        private plannerModuleService: PlannerModuleService
    ) {
        this.paramGroup = qpb.group({
            q: qpb.stringParam('q'),
            moduleLevel: qpb.stringParam('moduleLevel',{multi:true}),
            semester: qpb.stringParam('semester', {multi:true}),
            credits: qpb.stringParam('credits', {multi:true}),
            department: qpb.stringParam('department', {multi:true})
        });
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(
            response => {
                this.departments = response.filterData.viewmodel.departments;
                this.semesters = response.filterData.viewmodel.semesters;
                this.departments = response.filterData.viewmodel.departments;
                this.creditOptions = response.filterData.viewmodel.creditOptions;
                this.moduleLevels = response.filterData.viewmodel.moduleLevels;
            }
        )
        this.paramGroup.valueChanges.pipe(
            switchMap(() => this.plannerModuleService.getModules(this.paramGroup.value)),
            takeUntil(this.componentDestroyed$),
        ).subscribe(response => {
            this.plannerModuleService.plannerModules.next(response.result);
        });
    }
    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    getQueryParams() {

    }
}
