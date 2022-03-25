import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {LoginGuard} from "./login.guard";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    { path: 'signup', component: SignupComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
