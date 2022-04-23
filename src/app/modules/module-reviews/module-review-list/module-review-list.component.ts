import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-module-review-list',
    templateUrl: './module-review-list.component.html'
})
export class ModuleReviewListComponent {

    @Input() reviews;

    constructor() {
    }
}
