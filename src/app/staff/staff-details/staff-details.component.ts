import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModulesService } from "../../modules/modules.service";
import { ReviewsService } from "../../reviews/reviews.service";

@Component({
    selector: 'app-staff-details',
    templateUrl: './staff-details.component.html'
})
export class StaffDetailsComponent implements OnInit {

    public lecturer: any;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private reviewsService: ReviewsService) {
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
