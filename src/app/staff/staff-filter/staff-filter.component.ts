import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FilterInterface } from "../../interaction/filter-interface";
import { StaffModel } from "../staff.model";
import { PaginationModel } from "../../pagination/pagination.model";
import { StaffService } from "../staff.service";
import { PaginationService } from "../../pagination/pagination.service";
import { debounceTime } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
    selector: 'app-staff-filter',
    templateUrl: './staff-filter.component.html'
})
export class StaffFilterComponent
    extends FilterInterface<StaffModel, qp>
    implements OnInit {

    departments: { name: string }[];

    constructor(
        staffService: StaffService,
        private _activatedRoute: ActivatedRoute,
        router: Router,
        paginationService: PaginationService,
        private messageService: MessageService) {
        super(staffService, _activatedRoute, router, paginationService);
    }

    showMessage() {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
    }

    ngOnInit(): void {
        super.ngOnInit();
        this._activatedRoute.data.subscribe(
            response => {
                this.departments = response.staffData.viewmodel.departments;
            }
        )

        this.storeSubscription(this.filterForm.valueChanges
            .pipe(debounceTime(200))
            .subscribe(() => this.onSearch()));
    }

    getFilterForm(): FormGroup {
        return new FormGroup({
            name: new FormControl(''),
            departmentId: new FormControl('')
        });
    }
}

interface qp extends PaginationModel {
    name: string,
    department: string
}
