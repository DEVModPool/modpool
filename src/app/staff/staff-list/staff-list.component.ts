import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StaffService } from "../staff.service";
import { SubscriptionHandler } from "../../interaction/subscription-handler";

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html'
})
export class StaffListComponent extends SubscriptionHandler implements OnInit {

    departments: any[];
    staffList: any[];

    constructor(
        private staffService: StaffService,
        private activatedRoute: ActivatedRoute) {
        super();
    }

    ngOnInit() {

        this.storeSubscription(
            this.staffService.getObservable.subscribe(
                response => {
                    this.staffList = response;
                }
            )
        );
        this.storeSubscription(
            this.activatedRoute.data
                .subscribe(
                    response => {
                        this.departments = response.staffData.viewmodel.departments;
                    }
                )
        )
    }
}
