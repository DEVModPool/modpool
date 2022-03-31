import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-staff-details',
    templateUrl: './staff-details.component.html'
})
export class StaffDetailsComponent implements OnInit {

    public lecturer: any;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(
            response => {
                this.lecturer = response.staffDetails;
            }
        )
    }

}
