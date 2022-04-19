import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-staff-filter',
    templateUrl: './staff-filter.component.html'
})
export class StaffFilterComponent implements OnInit {

    departments: { name: string }[] = [
        {name: 'Computer Science'},
        {name: 'Medicine'},
        {name: 'Some other department'},
    ];

    staffFilters: { name: string, department: string }
    staffFilterForm = new FormGroup({
        name: new FormControl(''),
        departments: new FormControl('')
    })

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(
            response => {
                this.departments = response.staffData.viewmodel;
            }
        )
    }

}
