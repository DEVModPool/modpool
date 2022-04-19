import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth.service";

@Component({
    selector: 'app-email-confirmed',
    templateUrl: 'email-confirmed.component.html',
})
export class EmailConfirmedComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            params => {


                console.log(params);
            }
        )
    }
}
