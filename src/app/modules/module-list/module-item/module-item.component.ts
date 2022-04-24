import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PlanNames } from 'src/app/interaction/modules/planData.model';
import { PlannerModuleService } from 'src/app/planner/planner-picklist.service';
import {ModuleItem} from "./module-item.model";
import { PlanListItem } from './module-item.model';
import { Subject, subscribeOn } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
    selector: 'app-module-item',
    templateUrl: './module-item.component.html',
    styleUrls: ['module-item.component.scss']
})

export class ModuleItemComponent implements OnInit {
    @Input() module: ModuleItem;
    @Output() someOutput = new EventEmitter<any>();
    icon = "pi pi-calendar-plus"
    buttontext = "Add to planner"
    planList: PlanNames[] = [];
    planOutput: PlanListItem[] = [];
    output: JSON;
    obj: any


    constructor(private plannerModuleService: PlannerModuleService, private authService: AuthService) {
    }

    ngOnInit(): void {
        let selectedModules = JSON.parse(localStorage.getItem('selectedModuleStorage'))
        if (selectedModules){
            if (selectedModules.includes(this.module.id)){
                this.icon='pi pi-check'
                this.buttontext = "Added to planner"
            }
        }
        this.assignList()
    }
    checkList(){
        let needRefresh=true;
        this.authService.requireLogIn( () => {
            this.assignList()
            needRefresh = false;
        })
        if (needRefresh){
            this.planOutput=[];
            this.someOutput.emit()
        }
    }

    assignList() {
        this.plannerModuleService.returnNames.subscribe(result => {
            this.planList = result;
            if (result){
                this.planList.forEach(x =>{
                    this.planOutput.push(
                        {label: x.name, icon: 'pi pi-plus-circle', command: () => {
                            this.plannerModuleService.getPlan(x.id).subscribe(response => {
                                this.plannerModuleService.returnPlan.next(response.result);
                            });
                            this.plannerModuleService.returnPlan.subscribe(result => {
                                if (!result.modules.map(x => x.id).includes(this.module.id)){
                                    let modules = result.modules.map(x=>x.id)
                                    modules.push(this.module.id)
                                    this.obj =
                                        {
                                            "modulePlannerId": result.id,
                                            "name": result.name ,
                                            "moduleIDs": modules,
                                            "studentID": localStorage.getItem('userId')
                                        };
                                    this.output = <JSON>this.obj;
                                    this.plannerModuleService.savePlan(this.output).subscribe( x => {
                                        this.plannerModuleService.saveReturn.next(x.errors)
                                    })
                                }
                            })
                        }}
                    )
                })
            }
        })
    }


    addToPlanner(moduleId){
        let selectedModules = JSON.parse(localStorage.getItem('selectedModuleStorage'))
        if (selectedModules == null){
            selectedModules = [moduleId]
            this.setStyling(true)
        } else
        if (!selectedModules.includes(moduleId)){
            selectedModules.push(moduleId)
            this.setStyling(true)
        } else {
            let n = []
            selectedModules.forEach(x => {
                if(x!=moduleId){
                    n.push(x)
                }
            });
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
