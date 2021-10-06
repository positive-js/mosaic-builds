import { AfterContentInit, ChangeDetectorRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { McButton } from '@ptsecurity/mosaic/button';
import { McDatepickerIntl } from './datepicker-intl';
import { McDatepicker } from './datepicker.component';
import * as i0 from "@angular/core";
/** Can be used to override the icon of a `mcDatepickerToggle`. */
export declare class McDatepickerToggleIcon {
    static ɵfac: i0.ɵɵFactoryDeclaration<McDatepickerToggleIcon, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McDatepickerToggleIcon, "[mcDatepickerToggleIcon]", never, {}, {}, never>;
}
export declare class McDatepickerToggle<D> implements AfterContentInit, OnChanges, OnDestroy {
    intl: McDatepickerIntl;
    private changeDetectorRef;
    /** Whether the toggle button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Datepicker instance that the button will toggle. */
    datepicker: McDatepicker<D>;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    /** Custom icon set by the consumer. */
    customIcon: McDatepickerToggleIcon;
    /** Underlying button element. */
    button: McButton;
    private stateChanges;
    private _disabled;
    constructor(intl: McDatepickerIntl, changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    open(event: Event): void;
    private watchStateChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<McDatepickerToggle<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McDatepickerToggle<any>, "mc-datepicker-toggle", ["mcDatepickerToggle"], { "disabled": "disabled"; "datepicker": "for"; "tabIndex": "tabIndex"; }, {}, ["customIcon"], ["[mcDatepickerToggleIcon]"]>;
}
