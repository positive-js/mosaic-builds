import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { McTreeBase } from './tree-base';
import * as i0 from "@angular/core";
import * as i1 from "./outlet";
export class McTree extends McTreeBase {
}
/** @nocollapse */ McTree.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTree, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTree.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTree, selector: "mc-tree", host: { classAttribute: "mc-tree" }, exportAs: ["mcTree"], usesInheritance: true, ngImport: i0, template: `<ng-container mcTreeNodeOutlet></ng-container>`, isInline: true, styles: [".mc-tree{display:block}\n"], directives: [{ type: i1.McTreeNodeOutlet, selector: "[mcTreeNodeOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTree, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree',
                    exportAs: 'mcTree',
                    template: `<ng-container mcTreeNodeOutlet></ng-container>`,
                    styleUrls: ['./tree.scss'],
                    host: {
                        class: 'mc-tree'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90cmVlL3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQWN6QyxNQUFNLE9BQU8sTUFBTyxTQUFRLFVBQWU7O3NIQUE5QixNQUFNOzBHQUFOLE1BQU0saUlBUkwsZ0RBQWdEOzJGQVFqRCxNQUFNO2tCQVhsQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsUUFBUSxFQUFFLGdEQUFnRDtvQkFDMUQsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUMxQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLFNBQVM7cUJBQ25CO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWNUcmVlQmFzZSB9IGZyb20gJy4vdHJlZS1iYXNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRyZWUnLFxuICAgIGV4cG9ydEFzOiAnbWNUcmVlJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgbWNUcmVlTm9kZU91dGxldD48L25nLWNvbnRhaW5lcj5gLFxuICAgIHN0eWxlVXJsczogWycuL3RyZWUuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10cmVlJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWUgZXh0ZW5kcyBNY1RyZWVCYXNlPGFueT4ge31cbiJdfQ==