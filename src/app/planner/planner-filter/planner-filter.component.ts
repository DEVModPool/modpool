import { Component, OnDestroy, OnInit, HostBinding} from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import {Subject, switchMap, takeUntil} from "rxjs";
import { PlannerModuleService } from '../planner-picklist.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

interface Department {
    id: string,
    name: string
}

@Component({
  selector: 'app-planner-filter',
  templateUrl: './planner-filter.component.html',
  styleUrls: ['./planner-filter.component.scss'],
  animations: [
    trigger('extendFilter',[
        state('open', style({
            maxHeight: '500px',
            overflow: 'auto',
            'border-width': '2px'
        })),
        state('closed', style({
            maxHeight: '0px',
            overflow: 'hidden',
            'border-width': '0px'
        })),
        transition('open => closed', [
            animate('0.5s')
        ]),
        transition('closed => open', [
            animate('0.5s')
        ]),
    ]),
  ]
})
export class PlannerFilterComponent implements OnInit, OnDestroy{
    departments: Department[];
    semesters: any[];
    creditOptions: any[];
    selectedCreditOptions: any[];
    moduleLevels: any[];
    selectedModuleLevels: any[];
    filterOpen: Boolean;
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
        this.filterOpen = false;
    }
    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    openfilter() {
        console.log("hello");
        let elem = document.getElementById("filterButton");
        if (this.filterOpen){
            elem.setAttribute("class", "pi pi-filter");
        } else {
            elem.setAttribute("class", "pi pi-filter-slash");
        }
        this.filterOpen=(!this.filterOpen);
    }
    getQueryParams() {

    }
}
