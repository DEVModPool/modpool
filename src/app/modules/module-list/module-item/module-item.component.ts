import {Component, Input, OnInit} from '@angular/core';

export class Module {
    constructor(
        public name: string,
        public code: string,
        public description: string,
        public assessment: {coursework: string, exam: string},
        public prerequisites: string[],
        public prerequisiteFor: string[]) {}
}

@Component({
  selector: 'app-module-item',
  templateUrl: './module-item.component.html'
})
export class ModuleItemComponent implements OnInit {
  @Input() module: Module;

  constructor() { }

  ngOnInit(): void {}
}
