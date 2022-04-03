import {Component, Input, OnInit} from '@angular/core';
import {ModuleItem} from "./module-item.model";


@Component({
    selector: 'app-module-item',
    templateUrl: './module-item.component.html',
    styleUrls: ['module-item.component.scss']
})
export class ModuleItemComponent implements OnInit {
    @Input() module: ModuleItem;

    items = [
        {label: 'Add to plan 1', icon: 'pi pi-plus-circle', command: () => {console.log("") }},
        {label: 'Add to plan 2', icon: 'pi pi-plus-circle', command: () => {console.log("") }},
        {label: 'Add to plan 3', icon: 'pi pi-plus-circle', command: () => {console.log("") }},
    ];

    constructor() {
    }

    ngOnInit(): void {
    }
}
