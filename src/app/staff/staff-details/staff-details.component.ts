import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StaffReviewsService } from "../reviews/staff-reviews.service";

@Component({
    selector: 'app-staff-details',
    templateUrl: './staff-details.component.html'
})
export class StaffDetailsComponent implements OnInit {

    public lecturer: any;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private reviewsService: StaffReviewsService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(
            response => {
                this.lecturer = response.staffDetails;
            }
        )
    }

    reroute(url): void {
        this.router.navigate([url]);
    }

    onLeaveReview() {
        this.reviewsService.displayReviewModal();
    }
}
