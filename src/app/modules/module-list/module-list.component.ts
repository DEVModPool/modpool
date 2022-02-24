import { Component, OnInit } from '@angular/core';
import { Module } from './module-item/module-item.component'

@Component({
    selector: 'app-module-list',
    templateUrl: './module-list.component.html'
})
export class ModuleListComponent implements OnInit {
    modules: Module[] = [
        new Module(
            'Software Engineering I',
            'COMP 201',
            'The module is intended to develop an understanding of the problems associated with the development of significant computing systems (that is, systems that are too large to be designed and developed by a single person, and are designed to be used by many users) and to appreciate the techniques and tools necessary to develop such systems efficiently, in a cost-effective manner.',
            {coursework: '40', exam: '60'},
            ['COMP 122 - Object Oriented Programming'],
            ['COMP 282 - Advanced Object Oriented C Languages']
        ),
        new Module(
            'Database Development',
            'COMP 207',
            'To introduce students to\n' +
            '- the problems arising from databases, including concurrency in databases, information security considerations and how they are solved;\n' +
            '- the problems arising from the integration of heterogeneous sources of information and the use of semi-structured data;\n' +
            '- non-relational databases and the economic factors involved in their selection;\n' +
            '- techniques for analysing large amounts of data, the security issues and commercial factors involved with them.',
            {coursework: '30', exam: '70'},
            ['COMP 122 - Object Oriented Programming'],
            ['None']
        ),
        new Module(
            'Complexity of Algorithms',
            'COMP 202',
            'To demonstrate how the study of algorithmics has been applied in a number of different domains. To introduce formal concepts of measures of complexity and algorithms analysis. To introduce fundamental methods in data structures and algorithms design. To make students aware of computationally hard problems and possible ways of coping with them.',
            {coursework: '30', exam: '70'},
            ['COMP 108 - Data Structures and Algorithms', 'COMP 116 - Analytic Techniques for Computer Science'],
            ['None']
        )
    ];

    constructor() { }

    ngOnInit(): void {}
}
