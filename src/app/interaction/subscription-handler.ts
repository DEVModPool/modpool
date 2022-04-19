import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable()
export class SubscriptionHandler implements OnDestroy {

    private subscriptions: Subscription[] = [];

    protected storeSubscription(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
}
