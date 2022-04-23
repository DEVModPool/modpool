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

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
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

    reroute(url): void {
        this.router.navigate([url]);
    }
}
