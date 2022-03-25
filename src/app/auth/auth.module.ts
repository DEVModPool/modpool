import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {CommonModule} from "@angular/common";
import {AuthRoutingModule} from "./auth-routing.module";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {LoginModalComponent} from "./login-modal/login-modal.component";
import {DialogModule} from "primeng/dialog";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        SignupComponent,
        LoginModalComponent
    ],
    exports: [
        LoginModalComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        PasswordModule,
        CheckboxModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        MessagesModule,
        ReactiveFormsModule,
        DialogModule
    ]
})
export class AuthModule {

}
