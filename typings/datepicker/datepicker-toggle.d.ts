import { AfterContentInit, ChangeDetectorRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { McButton } from '@ptsecurity/mosaic/button';
import { McDatepicker } from './datepicker';
import { McDatepickerIntl } from './datepicker-intl';
/** Can be used to override the icon of a `mcDatepickerToggle`. */
export declare class McDatepickerToggleIcon {
}
export declare class McDatepickerToggle<D> implements AfterContentInit, OnChanges, OnDestroy {
    intl: McDatepickerIntl;
    private changeDetectorRef;
    /** Whether the toggle button is disabled. */
    disabled: boolean;
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
    constructor(intl: McDatepickerIntl, changeDetectorRef: ChangeDetectorRef, defaultTabIndex: string);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    open(event: Event): void;
    private watchStateChanges;
}
