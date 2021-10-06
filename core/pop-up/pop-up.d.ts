import { AnimationEvent } from '@angular/animations';
import { ChangeDetectorRef, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PopUpVisibility } from './constants';
import * as i0 from "@angular/core";
export declare abstract class McPopUp implements OnDestroy {
    private changeDetectorRef;
    header: string | TemplateRef<any>;
    content: string | TemplateRef<any>;
    classMap: {};
    warning: boolean;
    visibility: PopUpVisibility;
    visibleChange: EventEmitter<boolean>;
    protected prefix: string;
    /** Subject for notifying that the tooltip has been hidden from the view */
    protected readonly onHideSubject: Subject<any>;
    protected closeOnInteraction: boolean;
    private showTimeoutId;
    private hideTimeoutId;
    protected constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    isTemplateRef(value: any): boolean;
    show(delay: number): void;
    hide(delay: number): void;
    isVisible(): boolean;
    updateClassMap(placement: string, customClass: string, classMap?: any): void;
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden(): Observable<void>;
    markForCheck(): void;
    animationStart(): void;
    animationDone({ toState }: AnimationEvent): void;
    handleBodyInteraction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPopUp, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McPopUp, never, never, {}, {}, never>;
}
