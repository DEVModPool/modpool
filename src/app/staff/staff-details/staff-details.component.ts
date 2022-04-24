import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-staff-details',
    templateUrl: './staff-details.component.html'
})
export class StaffDetailsComponent implements OnInit {

    lecturer: any;
    modules: any;
    reviews: any;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(
            response => {
                console.log(response.staffData);
                this.lecturer = response.staffData.coordinator;
                this.modules = response.staffData.modules;
                this.reviews = response.staffData.reviews;
            }
        )
    }
}
