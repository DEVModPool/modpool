import { NgModule, Component, ElementRef, AfterContentInit, AfterViewChecked, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {SharedModule,PrimeTemplate,FilterService} from 'primeng/api';
import {DomHandler} from 'primeng/dom';
import {RippleModule} from 'primeng/ripple';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ObjectUtils, UniqueComponentId} from 'primeng/utils';
import { PickList } from 'primeng/picklist';

@Component({
  selector: 'app-filteredpicklist',
  template: `
        <div [class]="styleClass" [ngStyle]="style" class='p-picklist p-component' cdkDropListGroup>
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls">
                <button type="button" [attr.aria-label]="upButtonAriaLabel" pButton pRipple icon="pi pi-angle-up" (click)="moveUp(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)"></button>
                <button type="button" [attr.aria-label]="topButtonAriaLabel" pButton pRipple icon="pi pi-angle-double-up" (click)="moveTop(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)"></button>
                <button type="button" [attr.aria-label]="downButtonAriaLabel" pButton pRipple icon="pi pi-angle-down" (click)="moveDown(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)"></button>
                <button type="button" [attr.aria-label]="bottomButtonAriaLabel" pButton pRipple icon="pi pi-angle-double-down" (click)="moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder,SOURCE_LIST)"></button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper">
                <div class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{sourceHeader}}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>


                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false">
                    <app-planner-filter>
                    </app-planner-filter>
                </div>


                <ul #sourcelist class="p-picklist-list p-picklist-source" cdkDropList [cdkDropListData]="source" (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsSource),'p-disabled': disabled}" pRipple cdkDrag [cdkDragData]="item" [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event,item,selectedItemsSource,onSourceSelect)" (dblclick)="onSourceItemDblClick()" (touchend)="onItemTouchEnd()" (keydown)="onItemKeydown($event,item,selectedItemsSource,onSourceSelect)"
                            *ngIf="isItemVisible(item, SOURCE_LIST)" tabindex="0" role="option" [attr.aria-selected]="isSelected(item, selectedItemsSource)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons">
                <button type="button" [attr.aria-label]="rightButtonAriaLabel" pButton pRipple icon="pi pi-angle-right" (click)="moveRight()"></button>
                <button type="button" [attr.aria-label]="allRightButtonAriaLabel" pButton pRipple icon="pi pi-angle-double-right" (click)="moveAllRight()"></button>
                <button type="button" [attr.aria-label]="leftButtonAriaLabel" pButton pRipple icon="pi pi-angle-left" (click)="moveLeft()"></button>
                <button type="button" [attr.aria-label]="allLeftButtonAriaLabel" pButton pRipple icon="pi pi-angle-double-left" (click)="moveAllLeft()"></button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper">
                <div class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{targetHeader}}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false">
                    <div class="p-picklist-filter">
                        <input #targetFilter type="text" role="textbox"  (keyup)="onFilter($event,target,TARGET_LIST)" class="p-picklist-filter-input p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="targetFilterPlaceholder" [attr.aria-label]="ariaTargetFilterLabel">
                        <span class="p-picklist-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <ul #targetlist class="p-picklist-list p-picklist-target" cdkDropList [cdkDropListData]="target" (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}" pRipple cdkDrag [cdkDragData]="item" [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event,item,selectedItemsTarget,onTargetSelect)" (dblclick)="onTargetItemDblClick()" (touchend)="onItemTouchEnd()" (keydown)="onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)"
                            *ngIf="isItemVisible(item, TARGET_LIST)" tabindex="0" role="option" [attr.aria-selected]="isSelected(item, selectedItemsTarget)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls">
                <button type="button" [attr.aria-label]="upButtonAriaLabel" pButton pRipple icon="pi pi-angle-up"  (click)="moveUp(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)"></button>
                <button type="button" [attr.aria-label]="topButtonAriaLabel" pButton pRipple icon="pi pi-angle-double-up"  (click)="moveTop(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)"></button>
                <button type="button" [attr.aria-label]="downButtonAriaLabel" pButton pRipple icon="pi pi-angle-down"  (click)="moveDown(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)"></button>
                <button type="button" [attr.aria-label]="bottomButtonAriaLabel" pButton pRipple icon="pi pi-angle-double-down"  (click)="moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder,TARGET_LIST)"></button>
            </div>
        </div>
    `,
    styleUrls: ["./filteredpicklist.component.scss"]
})
export class FilteredpicklistComponent extends PickList {

    constructor(public el: ElementRef, public cd: ChangeDetectorRef, public filterService: FilterService) {
      super(el, cd, filterService);
  }
}
