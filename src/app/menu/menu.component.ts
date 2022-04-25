import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from "../app.main.component";

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" style="font-size: medium"
                    *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
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

    constructor(public appMain: AppMainComponent) {
    }

    ngOnInit() {
        this.model = [
            {
                items: [
                    {label: 'Module Finder', icon: 'pi pi-fw pi-book', routerLink: ['/modules'], preventExact: true},
                    {
                        label: 'Course Planner',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/planner'],
                        preventExact: true
                    },
                    {
                        label: 'Lecturers & Staff',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/coordinators'],
                        preventExact: true
                    },
                    {
                        label: 'About',
                        icon: 'pi pi-fw pi-info-circle',
                        routerLink: ['/about'],
                        preventExact: true
                    }
                ]
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
