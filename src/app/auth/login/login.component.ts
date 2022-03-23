import {Component} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Message} from "primeng/api";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [`./login.component.scss`]
})
export class LoginComponent {
    invalidMessages: Message[];
    subscription: Subscription;

    authForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    constructor(
        public configService: ConfigService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.invalidMessages = this.authService.autoLogoutMessage;
    }

    login(): any {
        const user = {
            email: this.authForm.controls.email.value,
            password: this.authForm.controls.password.value
        }

        this.authService.login(user).subscribe({
            next: value => {
                const token = (<any>value).token;
                this.authService.setJwtToken(token);
                this.router.navigate(["/"]);
            },
            error: () => {
                this.invalidMessages = [{
                    severity: 'error',
                    summary: 'Login failed!',
                    detail: 'Wrong username or password.'
                }]
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
