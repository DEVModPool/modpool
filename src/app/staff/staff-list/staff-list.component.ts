import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StaffService } from "../staff.service";

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnInit {
    departments = [
        {id: 1, name: 'Computer Science'},
        {id: 2, name: 'Engineering'},
        {id: 3, name: 'Chemistry'},
        {id: 4, name: 'Life Sciences'},
    ]

    staffList: any[];

    constructor(
        private staffService: StaffService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(
            response => {
                console.log(response);
                this.staffList = response.staffData.coordinators.items;
                this.departments = response.staffData.viewmodel.departments;
            }
        )

        this.staffService.getObservable.subscribe(
            response => {
                this.staffList = response;
            }
        )
    }
}
