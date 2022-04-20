import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from "./app.main.component";
import { LoginGuard } from "./auth/login.guard";

const routes: Routes = [
    {
        path: '',
        component: AppMainComponent,
        children: [
            {path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)},
            {path: 'planner', loadChildren: () => import('./planner/planner.module').then(m => m.PlannerModule)},
            {path: 'coordinators', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)}
        ],
    },
    {
        path: 'auth',
        canActivate: [LoginGuard],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            scrollOffset: [0, 100],
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
