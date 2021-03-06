import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

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
                this.lecturer = response.staffData.coordinator;
                this.modules = response.staffData.modules;
                this.reviews = response.staffData.reviews;
            }
        )
    }
}
