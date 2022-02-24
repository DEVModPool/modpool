import { Component, OnInit } from '@angular/core';
import { PlannerModuleItem } from './plannermodule';
import { PlannerModuleService } from './plannermoduleservice';
import { PrimeNGConfig } from 'primeng/api';
import { style } from '@angular/animations';

@Component({
  selector: 'app-planner-picklist',
  templateUrl: './planner-picklist.component.html',
  styleUrls: ['./planner-picklist.component.scss']
})


export class PlannerPicklistComponent implements OnInit {

    plannermodules: PlannerModuleItem[];
    selectedmodules: PlannerModuleItem[];
    constructor(private plannermoduleservice: PlannerModuleService, private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.plannermodules = [];
        this.plannermoduleservice.getProductsSmall().then(
            todules => {
                for (let i = 0; i < todules.length; i++) {
                    this.plannermodules[i] = todules[i];
            }}
            );
        console.log(this.plannermodules);
        this.selectedmodules = [];
        this.primengConfig.ripple = true;


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

    toSelected(){
        this.selectedmodules.sort(this.comparesemesters);
    }
    toggleprequisites(item){
        if(document.getElementById(item.items[0].code).getElementsByClassName("hiddenrow")[0].getAttribute("style") == "display: none;"){
            document.getElementById(item.items[0].code).getElementsByClassName("hiddenrow")[0].setAttribute("style", "display: inline;");
        } else {
            document.getElementById(item.items[0].code).getElementsByClassName("hiddenrow")[0].setAttribute("style", "display: none;");
        }

    }

}
