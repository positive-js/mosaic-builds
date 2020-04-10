import { ChangeDetectorRef } from '@angular/core';
export declare class McVerticalNavbarHeader {
}
export declare class McVerticalNavbarTitle {
}
export declare class McVerticalNavbar {
    private cd;
    expanded: boolean;
    constructor(cd: ChangeDetectorRef);
    toggle(): void;
}
