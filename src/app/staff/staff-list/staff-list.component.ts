import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnInit {


    departments = [
        {id: 1, name: 'Computer Science'},
        {id: 2, name: 'Engineering'},
        {id: 3, name: 'Chemistry'},
        {id: 4, name: 'Life Sciences'},
    ]
    staff: any[];

    constructor() {
    }

    ngOnInit() {
        this.staff = [
            {name: "Amy Elsner", department: 'Computer Science', isTeaching: true, rating: 4.1},
            {name: "Amy Elsner", department: 'Computer Science', isTeaching: true, rating: 3.1},
            {name: "Amy Elsner", department: 'Computer Science', isTeaching: true, rating: 5},
            {name: "Amy Elsner", department: 'Computer Science', isTeaching: true, rating: 2.1},
        ];
    }
}
