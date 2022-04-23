import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime } from "rxjs";
import { ModulesService } from "../modules.service";
import { PaginationModel } from "../../pagination/pagination.model";
import { FilterInterface } from "../../interaction/filter-interface";
import { ModuleItem } from "../module-list/module-item/module-item.model";
import { PaginationService } from "../../pagination/pagination.service";
import { FormControl, FormGroup } from "@angular/forms";

interface Department {
    id: string,
    name: string
}

@Component({
    selector: 'app-module-filter',
    templateUrl: './module-filter.component.html',
    styleUrls: ['./module-filter.component.scss']
})
export class ModuleFilterComponent extends FilterInterface<ModuleItem, qp> {
    departments: Department[];
    semesters: any[] = [{name: 'Semester 1', value: 1}, {name: 'Semester 2', value: 2}];
    creditOptions: any[] = [7.5, 15];
    selectedCreditOptions: any[];
    moduleLevels: any[] = [100, 200, 300, 400, 500];
    selectedModuleLevels: any[];

    constructor(
        moduleService: ModulesService,
        private _activatedRoute: ActivatedRoute,
        router: Router,
        paginationService: PaginationService,
    ) {
        super(moduleService, _activatedRoute, router, paginationService);
    }

    ngOnInit(): void {

        super.ngOnInit();

        this._activatedRoute.data.subscribe(
            response => {
                this.departments = response.moduleData.viewmodel.departments;
            }
        )

        this.storeSubscription(
            this.filterForm.valueChanges
                .pipe(debounceTime(200))
                .subscribe(() => this.onSearch())
        );
    }

    getFilterForm(): FormGroup {
        return new FormGroup({
            q: new FormControl(''),
            levels: new FormControl(''),
            semesters: new FormControl(''),
            credits: new FormControl(''),
            departmentIds: new FormControl('')
        });
    }

    override patchValueFromParams(params) {
        let data = {}

        if (params.q) {
            data['q'] = params.q;
        }

        if (params.levels) {
            data['levels'] =
                typeof params.levels == 'string'
                    ? [+params.levels]
                    : params.levels.map(value => +value);
        }

        if (params.semesters) {
            data['semesters'] =
                typeof params.semesters == 'string'
                    ? [+params.semesters]
                    : params.semesters.map(value => +value);
        }

        if (params.credits) {
            data['credits'] =
                typeof params.credits == 'string'
                    ? [+params.credits]
                    : params.credits.map(value => +value);
        }

        if (params.departmentIds) {
            data['departmentIds'] =
                typeof params.departmentIds == 'string'
                    ? [params.departmentIds]
                    : params.departmentIds;
        }

        console.log(data);
        this.filterForm.patchValue(data);
    }
}

interface qp extends PaginationModel {
    q: string,
    levels: string[],
    semesters: string[],
    credits: string[],
    departmentIds: string[],
}
