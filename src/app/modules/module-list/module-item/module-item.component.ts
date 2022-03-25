import {Component, Input, OnInit} from '@angular/core';
import {ModuleItem} from "./module-item.model";


@Component({
    selector: 'app-module-item',
    templateUrl: './module-item.component.html',
    styleUrls: ['module-item.component.scss']
})
export class ModuleItemComponent implements OnInit {
    @Input() module: ModuleItem;

    constructor() {
    }

    ngOnInit(): void {
    }
}
