import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { PlannerModuleItem } from './planner-module.model';
import { PlannerModuleService } from './planner-picklist.service';
import { PrimeNGConfig } from 'primeng/api';


@Injectable()
export class Greeter {
  suffix = '!';
}
@Component({
  selector: 'app-picklist-prerequisites',
  template: '<p>Missing modules: </p><ng-content></ng-content>'
})
export class PicklistPrerequisitesComponent {
    missing: String[];
    constructor(public greeter: Greeter) {}
}

@Component({
  selector: 'app-planner-picklist',
  templateUrl: './planner-picklist.component.html',
  styleUrls: ['./planner-picklist.component.scss'],

})
export class PlannerPicklistComponent implements OnInit {

    plannermodules: PlannerModuleItem[];
    selectedmodules: PlannerModuleItem[];
    constructor(private plannermoduleservice: PlannerModuleService, private primengConfig: PrimeNGConfig) { }
    split: Element;
    ngOnInit() {
        let storedSelected = JSON.parse(localStorage.getItem('selectedmods'));

        if (storedSelected==null){
            this.selectedmodules = []
        } else{
            this.selectedmodules = storedSelected;
            this.selectedmodules.forEach(element => {
                this.checkPrequisites(element)
            });
        }

        this.plannermoduleservice.getProductsSmall().subscribe(
            result => this.plannermodules = result.filter(x =>
                !this.selectedmodules.some(y => x.code==y.code)));
    }

    comparesemesters(a, b) {
        if (a.semester<b.semester) {
          return -1;
        }
        if (a.semester>b.semester) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }

    toSource(item){
        localStorage.setItem('selectedmods', JSON.stringify(this.selectedmodules));
        this.toTarget(item);
    }
    toTarget(item){
        localStorage.setItem('selectedmods', JSON.stringify(this.selectedmodules));
        this.sortTarget();
        this.plannermodules.forEach(mod => {
            mod.missing = [];
        });
        this.selectedmodules.forEach(mod => {
            this.checkPrequisites(mod);
        });

    }

    checkPrequisites(mod){
        let result = this.selectedmodules.map(a => a.code);
        let missingMods = ["Missing Prerequisites:  "] + mod.prerequisites.filter(x => result.indexOf(x) < 0);
        mod.missing=missingMods;
    }

    expand(rowid){
        let hidden: HTMLElement;
        hidden=rowid.srcElement.parentElement.parentElement.nextSibling.nextSibling;
        if(hidden.className == "hiddenrow gridrow shrink"){
            hidden.className = "hiddenrow gridrow grow";
            rowid.srcElement.innerHTML="-";
        } else {
            hidden.className = "hiddenrow gridrow shrink";
            rowid.srcElement.innerHTML="+";
        }
    }

    sortTarget(){
        this.selectedmodules.sort(this.comparesemesters);
    }

}

