import { Component, OnInit } from '@angular/core';

import {ModulesService} from "../modules.service";
import {Module} from "../../interaction/modules/module.model";

@Component({
    selector: 'app-module-list',
    templateUrl: './module-list.component.html'
})
export class ModuleListComponent implements OnInit {
    modules: Module[];

    constructor(
        private moduleService: ModulesService
    ) {
    }

    ngOnInit(): void {
        this.moduleService.modules.subscribe(modules =>
            this.modules = modules
        )
    }
}
