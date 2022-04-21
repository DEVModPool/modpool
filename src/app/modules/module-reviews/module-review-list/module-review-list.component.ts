import { Component, Input } from '@angular/core';
import { ReviewListComponent } from "../../../reviews/review-list.component";

@Component({
    selector: 'app-module-review-list',
    templateUrl: './module-review-list.component.html'
})
export class ModuleReviewListComponent extends ReviewListComponent {

    @Input() reviews;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        console.log(this.reviews);
    }
}
