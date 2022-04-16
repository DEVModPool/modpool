import { NgModule, Component, ElementRef, AfterContentInit, AfterViewChecked, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {FilterService} from 'primeng/api';
import { PickList } from 'primeng/picklist';
import { PlanData } from 'src/app/interaction/modules/planData.model';
import { PlannerModuleService } from '../../planner-picklist.service';
@Component({
  selector: 'app-filteredpicklist',
  template: `
        <div [class]="styleClass" [ngStyle]="style" class='p-picklist p-component' cdkDropListGroup>
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
                <button type="button" [attr.aria-label]="leftButtonAriaLabel" pButton pRipple icon="pi pi-angle-left" (click)="moveLeft()"></button>
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
                <ul #targetlist class="p-picklist-list p-picklist-target" cdkDropList [cdkDropListData]="target" (cdkDropListDropped)="onDrop($event, TARGET_LIST)" [ngStyle]="targetStyle" role="listbox" aria-multiselectable="multiple">
                    <p-splitter layout="vertical">
                        <ng-template pTemplate>
                            <div class="test">
                            <h4 class="h4" *ngIf="semester1Selected">Semester 1</h4>
                                <p-listbox class="test">
                                <ng-template  ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                                    <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}" pRipple
                                    cdkDrag [cdkDragData]="item" [cdkDragDisabled]="!dragdrop"
                                    (click)="onItemClick($event,item,selectedItemsTarget,onTargetSelect)" (dblclick)="onTargetItemDblClick()"
                                    (touchend)="onItemTouchEnd()" (keydown)="onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)"
                                    *ngIf="isItemVisible(item, TARGET_LIST) && item.semester =='1'" tabindex="0" role="option"
                                    [attr.aria-selected]="isSelected(item, selectedItemsTarget)">

                                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}">
                                        </ng-container>
                                    </li>
                                </ng-template>
                                </p-listbox>
                            </div>
                        </ng-template>
                        <ng-template pTemplate>
                            <h4 class="h4" *ngIf="semester2Selected">Semester 2</h4>
                            <p-listbox>
                                <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                                    <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}" pRipple
                                    cdkDrag [cdkDragData]="item" [cdkDragDisabled]="!dragdrop"
                                    (click)="onItemClick($event,item,selectedItemsTarget,onTargetSelect)" (dblclick)="onTargetItemDblClick()"
                                    (touchend)="onItemTouchEnd()" (keydown)="onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)"
                                    *ngIf="isItemVisible(item, TARGET_LIST) && item.semester =='2'" tabindex="0" role="option"
                                    [attr.aria-selected]="isSelected(item, selectedItemsTarget)">
                                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}">
                                    </ng-container>
                                    </li>
                                </ng-template>
                            </p-listbox>
                        </ng-template>
                    </p-splitter>
                </ul>
                <ng-container *ngTemplateOutlet="currentTemplate" >

                </ng-container>

            </div>
        </div>
    `,
    styleUrls: ["./filteredpicklist.component.scss"]
})
export class FilteredpicklistComponent extends PickList {

    constructor(public el: ElementRef, public cd: ChangeDetectorRef, public filterService: FilterService, private plannerModuleService: PlannerModuleService) {
      super(el, cd, filterService);
  }
  @Input()
    initialTemplate: TemplateRef<any>;
    currentTemplate: TemplateRef<any>;
    ngOnInit() {
      this.currentTemplate = this.initialTemplate;
   }


   @Input() semester1Selected: boolean;
   @Input() semester2Selected: boolean;

   @Input() selectedPrereqs = [];






}

