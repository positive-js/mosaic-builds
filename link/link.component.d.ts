import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import * as i0 from "@angular/core";
export declare class McLinkBase {
}
export declare const McLinkMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McLinkBase;
export declare const baseURLRegex: RegExp;
export declare class McLink extends McLinkMixinBase implements OnDestroy, HasTabIndex, CanDisable {
    private elementRef;
    private focusMonitor;
    private changeDetector;
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    get pseudo(): any;
    set pseudo(value: any);
    private _pseudo;
    get noUnderline(): any;
    set noUnderline(value: any);
    private _noUnderline;
    get useVisited(): any;
    set useVisited(value: any);
    private _useVisited;
    get hasIcon(): boolean;
    get print(): any;
    set print(value: any);
    private _print;
    printMode: boolean;
    icon: McIcon;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor, changeDetector: ChangeDetectorRef);
    ngOnDestroy(): void;
    focus(): void;
    getHostElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<McLink, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McLink, "[mc-link]", ["mcLink"], { "tabIndex": "tabIndex"; "disabled": "disabled"; "pseudo": "pseudo"; "noUnderline": "noUnderline"; "useVisited": "useVisited"; "print": "print"; }, {}, ["icon"]>;
}
