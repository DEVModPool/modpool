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
    departments: Department[];
    semesters: any[] = [{name: 'Semester 1', value: 1}, {name: 'Semester 2', value: 2}];
    selectedSemesters: any[] = [];
    creditOptions: any[] = [30, 60];
    selectedCreditOptions: any[];
    moduleLevels: any[] = [100, 200, 300, 400, 500];
    selectedModuleLevels: any[];
    code: any[];
    filterOpen: Boolean;
    public paramGroup: QueryParamGroup;
    public paramGroupId: QueryParamGroup;
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
            Levels: qpb.stringParam('Levels',{multi:true}),
            semesters: qpb.stringParam('semesters', {multi:true}),
            credits: qpb.stringParam('credits', {multi:true}),
            department: qpb.stringParam('department', {multi:true})
        });
        this.paramGroupId = qpb.group({
            id: qpb.stringParam('id', {multi:true})
        })
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(
            response => {
                this.departments = response.filterData.viewmodel.departments;
            }
        )
        console.log(this.paramGroup.value)
        this.paramGroup.valueChanges.pipe(
            switchMap(() => this.plannerModuleService.getModules(this.paramGroup.value)),
            takeUntil(this.componentDestroyed$),
        ).subscribe(response => {
            this.plannerModuleService.plannerModules.next(response.result);
        });
        this.filterOpen = false;
    }

    levelChange() {
        this.paramGroup.patchValue(
            {
                Levels: this.selectedModuleLevels,
            }
        )
    }
    semesterChange() {
        this.paramGroup.patchValue(
            {
                semesters: this.selectedSemesters,
            }
        )
    }
    creditChange() {
        this.paramGroup.patchValue(
            {
                credits: this.selectedCreditOptions,
            }
        )
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
    getQueryParams() {

    }
}
