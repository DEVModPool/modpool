import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from "./app.main.component";

const routes: Routes = [
    {
        path: '',
        component: AppMainComponent,
        pathMatch: 'full',
        children: [
            { path: '', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)},
        ],
    },
    { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
