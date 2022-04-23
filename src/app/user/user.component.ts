import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import { SubscriptionHandler } from "../interaction/subscription-handler";
import { UserService } from "./user.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent extends SubscriptionHandler implements OnInit {

    userName;
    reviews;

    constructor(private userService: UserService) {
        super();
    }

    ngOnInit(): void {
        this.userName = localStorage.getItem(environment["user-key"]);

        this.storeSubscription(
            this.userService.reviewsObservable.subscribe(
                response => {
                    this.reviews = response.reviews;
                }
            )
        );

        this.userService.getReviews();
    }

}
