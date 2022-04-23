import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModuleReviewsService } from "../../modules/module-reviews/module-reviews.service";

@Component({
    selector: 'app-staff-details',
    templateUrl: './staff-details.component.html'
})
export class StaffDetailsComponent implements OnInit {

    lecturer: any;
    modules: any;
    reviews: any;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private reviewsService: ModuleReviewsService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(
            response => {
                console.log(response);
                this.lecturer = response.staffData.coordinator;
                this.modules = response.staffData.modules;
                this.reviews = response.staffData.reviews;
                console.log(this.reviews);
            }
        )
    }

    reroute(url): void {
        this.router.navigate([url]);
    }
}
