import { Component, OnDestroy, OnInit, HostBinding} from '@angular/core';
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
    code: any[];
    filterOpen: Boolean;
    public paramGroup: QueryParamGroup;
    public paramGroupSelected: QueryParamGroup;
    private componentDestroyed$ = new Subject<void>();
    display: boolean = false;

    showDialog() {
        this.display = true;
    }

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
        this.paramGroupSelected = qpb.group({
            code: qpb.stringParam('code', {multi:true})
        })
    }

    ngOnInit(): void {
        const myname = JSON.parse(localStorage.getItem('selectedModuleStorage'));
        if (myname.every(x => x.hasOwnProperty('code'))){
        this.paramGroupSelected.setValue({'code':myname.map(r => r.code)})
        this.activatedRoute.data.subscribe(
            response => {
                this.semesters = response.filterData.viewmodel.semesters;
                this.departments = response.filterData.viewmodel.departments;
                this.creditOptions = response.filterData.viewmodel.creditOptions;
                this.moduleLevels = response.filterData.viewmodel.moduleLevels;
                this.code = response.filterData.viewmodel.codes;
            }
        )
        this.plannerModuleService.getModules(this.paramGroupSelected.value)
        .subscribe(response => {
            this.plannerModuleService.selectedModules.next(response.result);
        });
    }

        this.paramGroup.valueChanges.pipe(
            switchMap(() => this.plannerModuleService.getModules(this.paramGroup.value)),
            takeUntil(this.componentDestroyed$),
        ).subscribe(response => {
            this.plannerModuleService.plannerModules.next(response.result);
        });
        this.filterOpen = false;
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
    getQueryParams() {

    }
}
