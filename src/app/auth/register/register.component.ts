import { Component, OnInit } from '@angular/core';
import { AuthService, LoginRequest } from "../auth.service";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import { SubscriptionHandler } from "../../interaction/subscription-handler";
import {patternValidator} from "./pattern.directive";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss']

})
export class RegisterComponent extends SubscriptionHandler implements OnInit {

    get email() { return this.authForm.get('email'); }
    get password() { return this.authForm.get('password'); }

    authForm = new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, [
            // 1. Password Field is Required
            Validators.required,
            // 2. check whether the entered password has a number
            patternValidator(/\d/, {hasNumber: true}),
            // 3. check whether the entered password has upper case letter
            patternValidator(/[A-Z]/, {hasCapitalCase: true}),
            // 4. check whether the entered password has a lower-case letter
            patternValidator(/[a-z]/, {hasSmallCase: true}),
            // 6. Has a minimum length of 8 characters
            Validators.minLength(8)]
        ),
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
        else {
            const user = {
                email: <string>this.authForm.value.email,
                password: <string>this.authForm.value.password
            }

            this.storeSubscription(
                this.authService.register(user)
            );
        }
    }

}
