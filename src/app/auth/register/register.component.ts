import { Component, OnInit } from '@angular/core';
import { AuthService, LoginRequest } from "../auth.service";
import { FormControl, FormGroup } from "@angular/forms";
import { SubscriptionHandler } from "../../interaction/subscription-handler";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent extends SubscriptionHandler implements OnInit {

    authForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        repeatPassword: new FormControl('')
    });

    passwordMatch: boolean = true;

    constructor(private authService: AuthService) {
        super();
    }

    ngOnInit(): void {
    }

    onRegister() {
        if (this.authForm.value.password !== this.authForm.value.repeatPassword) {
            this.passwordMatch = false;
            return;
        }

        const user = {
            email: <string>this.authForm.value.email,
            password: <string>this.authForm.value.password
        }

        this.storeSubscription(
            this.authService.register(user)
        );
    }

}
