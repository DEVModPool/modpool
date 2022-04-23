import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { LoginGuard } from "./login.guard";
import { RegisterComponent } from "./register/register.component";
import { CheckEmailComponent } from "./register/check-email/check-email.component";
import { EmailConfirmedComponent } from "./register/email-confirmed/email-confirmed.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'confirmEmail', component: CheckEmailComponent},
    {path: 'activateUser', component: EmailConfirmedComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
