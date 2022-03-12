import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { PlannerModuleItem } from './planner-module.model';
import { PlannerModuleService } from './planner-picklist.service';

@Component({
  selector: 'app-planner-picklist',
  templateUrl: './planner-picklist.component.html',
  styleUrls: ['./planner-picklist.component.scss'],

})
export class PlannerPicklistComponent implements OnInit {

    plannerModules: PlannerModuleItem[];
    selectedModules: PlannerModuleItem[];
    constructor(private plannerModuleService: PlannerModuleService) { }
    ngOnInit() {
        let storedSelected = JSON.parse(localStorage.getItem('selectedModuleStorage'));

        if (storedSelected==null){
            this.selectedModules = []
        } else{
            this.selectedModules = storedSelected;
            this.selectedModules.forEach(element => {
                this.checkPrerequisites(element)  
            });
            this.sortTarget();
        }

        this.plannerModuleService.getProductsSmall().subscribe(
            result => this.plannerModules = result.filter(x =>
                !this.selectedModules.some(y => x.code==y.code)));
    }

    compareSemesters(a, b) {
        if (a.semester<b.semester) {
          return -1;
        }
        if (a.semester>b.semester) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }

    toSource(){
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules));
        this.toTarget();
    }
    toTarget(){
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules));
        this.sortTarget();
        this.plannerModules.forEach(mod => {
            mod.missing = [];
        });
        this.selectedModules.forEach(mod => {
            this.checkPrerequisites(mod);
        });

    }
    missingMods: String[];
    checkPrerequisites(mod){
        let result = this.selectedModules.map(a => a.code);
        this.missingMods = (mod.prerequisites.filter(x => result.indexOf(x) < 0).length==0) ? [] : ["Missing Prerequisites:  "] + mod.prerequisites.filter(x => result.indexOf(x) < 0);
        mod.missing=this.missingMods;
    }

    expand(rowID){
        let hidden: HTMLElement;
        hidden=rowID.srcElement.parentElement.parentElement.nextSibling.nextSibling;
        if(hidden.className == "hiddenRow gridRow shrink"){
            hidden.className = "hiddenRow gridRow grow";
            rowID.srcElement.innerHTML="-";
        } else {
            hidden.className = "hiddenRow gridRow shrink";
            rowID.srcElement.innerHTML="+";
        }
    }

    sortTarget(){
        this.selectedModules.sort(this.compareSemesters);
    }

}

