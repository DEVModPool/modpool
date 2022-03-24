import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Message} from "primeng/api";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
    displayModal = false;
    invalidMessages: Message[];
    subscription: Subscription;

    authForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.loginModalDisplayed.subscribe(
            displayed => {
                this.displayModal = displayed;
            }
        )
        this.invalidMessages = this.authService.autoLogoutMessage;
    }

    login(): any {
        const user = {
            email: this.authForm.controls.email.value,
            password: this.authForm.controls.password.value
        }

        this.authService.login(user).subscribe({
            next: () => this.closeModal(),
            error: () => {
                this.invalidMessages = [{
                    severity: 'error',
                    summary: 'Login failed!',
                    detail: 'Wrong username or password.'
                }]
            }
        });
    }

    closeModal() {
        this.authService.loginModalDisplayed.next(false);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
