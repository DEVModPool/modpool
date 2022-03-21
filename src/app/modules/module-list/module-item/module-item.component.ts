import {Component, Input, OnInit} from '@angular/core';
import {Module} from "../../../interaction/modules/module.model";


@Component({
    selector: 'app-module-item',
    templateUrl: './module-item.component.html',
    styleUrls: ['module-item.component.scss']
})
export class ModuleItemComponent implements OnInit {
    @Input() module: Module;

    constructor() {
    }

    ngOnInit(): void {
    }
}
