import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from "../app.main.component";

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" style="font-size: medium" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class MenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                // label: 'Home',
                items:[
                    {label: 'Module Finder',icon: 'pi pi-fw pi-book', routerLink: ['/modules']},
                    {label: 'Course Planner',icon: 'pi pi-fw pi-calendar', routerLink: ['/planner']},
                    {label: 'Lecturers & Staff',icon: 'pi pi-fw pi-users', routerLink: ['/login']},
                    {label: 'Anonymopool',icon: 'pi pi-fw pi-question-circle', routerLink: ['/login']},
                    {label: 'Events',icon: 'pi pi-fw pi-map-marker', routerLink: ['/login']},
                    {label: 'Help',icon: 'pi pi-fw pi-info-circle', routerLink: ['/info']},
                ]
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
