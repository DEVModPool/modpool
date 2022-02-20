import {Component, OnInit} from '@angular/core';

interface Department {
    name: string
}

@Component({
    selector: 'app-module-filter',
    templateUrl: './module-filter.component.html'
})
export class ModuleFilterComponent implements OnInit {
    departments: Department[] = [
        {name: 'Computer Science'},
        {name: 'School of Biological Sciences'},
        {name: 'Civil engineering and Industrial Design'},
        {name: 'Mechanical, Materials and Aerospace Engineering'},
        {name: 'Population, Community and Behavioural Sciences'}
    ];
    selectedDepartments: Department[];



    semesters: any[] = [
        {name:'Semester 1', key: '1'},
        {name:'Semester 2', key: '2'}
    ]
    selectedSemesters: any[];
    creditOptions: any[] = [
        {name: '7.5', key: '7.5'},
        {name: '15', key: '15'},
        {name: '30', key: '30'},
        {name: '60', key: '60'}
    ]
    selectedCreditOptions: any[];

    moduleLevels: any[] = [
        {name: '100', key: '100'},
        {name: '200', key: '200'},
        {name: '300', key: '400'},
        {name: '400', key: '400'},
        {name: '500', key: '500'}
    ]
    selectedModuleLevels: any[];

    constructor() {
    }

    ngOnInit(): void {}

}
