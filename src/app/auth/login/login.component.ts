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
    loading = false;
    authForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.invalidMessages = this.authService.autoLogoutMessage;
    }

    login(): any {
        this.loading = true;
        const user = {
            email: this.authForm.controls.email.value,
            password: this.authForm.controls.password.value
        }

        this.authService.login(user).subscribe({
            next: () => this.router.navigate(["/"]),
            error: () => {
                this.invalidMessages = [{
                    severity: 'error',
                    summary: 'Login failed!',
                    detail: 'Wrong username or password.'
                }]
            }
        }).add(() => this.loading = false);
    }
}
