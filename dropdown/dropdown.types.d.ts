import { FocusOrigin } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, InjectionToken, TemplateRef } from '@angular/core';
import { McDropdownContent } from './dropdown-content.directive';
export declare type DropdownPositionX = 'before' | 'after';
export declare type DropdownPositionY = 'above' | 'below';
/** Reason why the menu was closed. */
export declare type DropdownCloseReason = void | 'click' | 'keydown' | 'tab';
/**
 * Interface for a custom dropdown panel that can be used with `mcDropdownTriggerFor`.
 * @docs-private
 */
export interface McDropdownPanel {
    xPosition: DropdownPositionX;
    yPosition: DropdownPositionY;
    overlapTriggerX: boolean;
    overlapTriggerY: boolean;
    templateRef: TemplateRef<any>;
    closed: EventEmitter<DropdownCloseReason>;
    parent?: McDropdownPanel | undefined;
    triggerWidth?: string;
    direction?: Direction;
    lazyContent?: McDropdownContent;
    backdropClass?: string;
    hasBackdrop?: boolean;
    focusFirstItem(origin?: FocusOrigin): void;
    resetActiveItem(): void;
    setPositionClasses?(x: DropdownPositionX, y: DropdownPositionY): void;
}
/** Default `mc-dropdown` options that can be overridden. */
export interface McDropdownDefaultOptions {
    /** The x-axis position of the dropdown. */
    xPosition: DropdownPositionX;
    /** The y-axis position of the dropdown. */
    yPosition: DropdownPositionY;
    /** Whether the dropdown should overlap the dropdown trigger horizontally. */
    overlapTriggerX: boolean;
    /** Whether the dropdown should overlap the dropdown trigger vertically. */
    overlapTriggerY: boolean;
    /** Class to be applied to the dropdown's backdrop. */
    backdropClass: string;
    /** Whether the dropdown has a backdrop. */
    hasBackdrop: boolean;
}
/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * @docs-private
 */
export declare const MC_DROPDOWN_PANEL: InjectionToken<McDropdownPanel>;
/** Injection token to be used to override the default options for `mc-dropdown`. */
export declare const MC_DROPDOWN_DEFAULT_OPTIONS: InjectionToken<McDropdownDefaultOptions>;
/** @docs-private */
export declare function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY(): McDropdownDefaultOptions;
