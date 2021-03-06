import { FocusOrigin } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, TemplateRef, InjectionToken } from '@angular/core';
import { McDropdownContent } from './dropdown-content';
import { DropdownPositionX, DropdownPositionY } from './dropdown-positions';
/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * @docs-private
 */
export declare const MC_DROPDOWN_PANEL: InjectionToken<McDropdownPanel<any>>;
/**
 * Interface for a custom dropdown panel that can be used with `mcDropdownTriggerFor`.
 * @docs-private
 */
export interface McDropdownPanel<T = any> {
    xPosition: DropdownPositionX;
    yPosition: DropdownPositionY;
    overlapTriggerX: boolean;
    overlapTriggerY: boolean;
    templateRef: TemplateRef<any>;
    closed: EventEmitter<void | 'click' | 'keydown' | 'tab'>;
    parent?: McDropdownPanel | undefined;
    direction?: Direction;
    lazyContent?: McDropdownContent;
    backdropClass?: string;
    hasBackdrop?: boolean;
    focusFirstItem(origin?: FocusOrigin): void;
    resetActiveItem(): void;
    setPositionClasses?(x: DropdownPositionX, y: DropdownPositionY): void;
    addItem?(item: T): void;
    removeItem?(item: T): void;
}
