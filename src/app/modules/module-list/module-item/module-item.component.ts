import {Component, Input, OnInit} from '@angular/core';
import { PlannerModuleService } from 'src/app/planner/planner-picklist.service';
import {ModuleItem} from "./module-item.model";


@Component({
    selector: 'app-module-item',
    templateUrl: './module-item.component.html',
    styleUrls: ['module-item.component.scss']
})
export class ModuleItemComponent implements OnInit {
    @Input() module: ModuleItem;
    icon = "pi pi-calendar-plus"
    buttontext = "Add to planner"
    planList

    //TODO: Remove item list
    items = [
        {label: 'Add to plan 1', icon: 'pi pi-plus-circle', command: () => {console.log("") }},
        {label: 'Add to plan 2', icon: 'pi pi-plus-circle', command: () => {console.log("") }},
        {label: 'Add to plan 3', icon: 'pi pi-plus-circle', command: () => {console.log("") }},
    ];

    constructor() {
    }

    ngOnInit(): void {
        let selectedModules = JSON.parse(localStorage.getItem('selectedModuleStorage'))
        console.log(selectedModules)
        if (selectedModules.includes(this.module.id)){
            this.icon='pi pi-check'
            this.buttontext = "Added to planner"
        }

    }

    addToPlanner(moduleId){
        console.log(moduleId)
        let selectedModules = JSON.parse(localStorage.getItem('selectedModuleStorage'))
        if (selectedModules == null){
            selectedModules = [moduleId]
            this.setStyling(true)
        } else
        if (!selectedModules.includes(moduleId)){
            selectedModules.push(moduleId)
            this.setStyling(true)
        } else {
            console.log(selectedModules)
            let n = []
            selectedModules.forEach(x => {
                if(x!=moduleId){
                    n.push(x)
                }
            });
            console.log(n)
            selectedModules = n
            this.setStyling(false)
        }
        localStorage.setItem('selectedModuleStorage', JSON.stringify(selectedModules));
    }

    setStyling(add){
        if (add){
        this.icon='pi pi-check'
        this.buttontext = "Added to planner"
        } else{
            this.icon = "pi pi-calendar-plus"
            this.buttontext = "Add to planner"
        }
    }
}
