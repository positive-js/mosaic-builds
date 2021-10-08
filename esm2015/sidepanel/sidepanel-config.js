import { InjectionToken } from '@angular/core';
/** Injection token that can be used to access the data that was passed in to a sidepanel. */
export const MC_SIDEPANEL_DATA = new InjectionToken('McSidepanelData');
export var McSidepanelPosition;
(function (McSidepanelPosition) {
    McSidepanelPosition["Right"] = "right";
    McSidepanelPosition["Left"] = "left";
    McSidepanelPosition["Top"] = "top";
    McSidepanelPosition["Bottom"] = "bottom";
})(McSidepanelPosition || (McSidepanelPosition = {}));
export class McSidepanelConfig {
    constructor() {
        /** Data being injected into the child component. */
        this.data = null;
        this.position = McSidepanelPosition.Right;
        /** Whether the sidepanel has a backdrop. */
        this.hasBackdrop = true;
        /** When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true. */
        this.requiredBackdrop = false;
        /** Whether the user can use escape or clicking outside to close the sidepanel. */
        this.disableClose = false;
        /** Custom class for the overlay pane. */
        this.overlayPanelClass = '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9zaWRlcGFuZWwvc2lkZXBhbmVsLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9DLDZGQUE2RjtBQUM3RixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBTSxpQkFBaUIsQ0FBQyxDQUFDO0FBRTVFLE1BQU0sQ0FBTixJQUFZLG1CQUtYO0FBTEQsV0FBWSxtQkFBbUI7SUFDM0Isc0NBQWUsQ0FBQTtJQUNmLG9DQUFhLENBQUE7SUFDYixrQ0FBVyxDQUFBO0lBQ1gsd0NBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUxXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFLOUI7QUFFRCxNQUFNLE9BQU8saUJBQWlCO0lBQTlCO1FBSUksb0RBQW9EO1FBQ3BELFNBQUksR0FBYyxJQUFJLENBQUM7UUFFdkIsYUFBUSxHQUF5QixtQkFBbUIsQ0FBQyxLQUFLLENBQUM7UUFFM0QsNENBQTRDO1FBQzVDLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBSTdCLHlHQUF5RztRQUN6RyxxQkFBZ0IsR0FBYSxLQUFLLENBQUM7UUFFbkMsa0ZBQWtGO1FBQ2xGLGlCQUFZLEdBQWEsS0FBSyxDQUFDO1FBRS9CLHlDQUF5QztRQUN6QyxzQkFBaUIsR0FBdUIsRUFBRSxDQUFDO0lBQy9DLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFjY2VzcyB0aGUgZGF0YSB0aGF0IHdhcyBwYXNzZWQgaW4gdG8gYSBzaWRlcGFuZWwuICovXG5leHBvcnQgY29uc3QgTUNfU0lERVBBTkVMX0RBVEEgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignTWNTaWRlcGFuZWxEYXRhJyk7XG5cbmV4cG9ydCBlbnVtIE1jU2lkZXBhbmVsUG9zaXRpb24ge1xuICAgIFJpZ2h0ID0gJ3JpZ2h0JyxcbiAgICBMZWZ0ID0gJ2xlZnQnLFxuICAgIFRvcCA9ICd0b3AnLFxuICAgIEJvdHRvbSA9ICdib3R0b20nXG59XG5cbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbENvbmZpZzxEID0gYW55PiB7XG4gICAgLyoqIElEIGZvciB0aGUgc2lkZXBhbmVsLiBJZiBvbWl0dGVkLCBhIHVuaXF1ZSBvbmUgd2lsbCBiZSBnZW5lcmF0ZWQuICovXG4gICAgaWQ/OiBzdHJpbmc7XG5cbiAgICAvKiogRGF0YSBiZWluZyBpbmplY3RlZCBpbnRvIHRoZSBjaGlsZCBjb21wb25lbnQuICovXG4gICAgZGF0YT86IEQgfCBudWxsID0gbnVsbDtcblxuICAgIHBvc2l0aW9uPzogTWNTaWRlcGFuZWxQb3NpdGlvbiA9IE1jU2lkZXBhbmVsUG9zaXRpb24uUmlnaHQ7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2lkZXBhbmVsIGhhcyBhIGJhY2tkcm9wLiAqL1xuICAgIGhhc0JhY2tkcm9wPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xuXG4gICAgLyoqIFdoZW4gd2Ugb3BlbiBtdWx0aXBsZSBzaWRlcGFuZWxzLCBiYWNrZHJvcCBhcHBlYXJzIG9ubHkgb25jZSwgZXhjZXB0IGNhc2VzIHRoZW4gdGhpcyBmbGFnIGlzIHRydWUuICovXG4gICAgcmVxdWlyZWRCYWNrZHJvcD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB1c2VyIGNhbiB1c2UgZXNjYXBlIG9yIGNsaWNraW5nIG91dHNpZGUgdG8gY2xvc2UgdGhlIHNpZGVwYW5lbC4gKi9cbiAgICBkaXNhYmxlQ2xvc2U/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQ3VzdG9tIGNsYXNzIGZvciB0aGUgb3ZlcmxheSBwYW5lLiAqL1xuICAgIG92ZXJsYXlQYW5lbENsYXNzPzogc3RyaW5nIHwgc3RyaW5nW10gPSAnJztcbn1cbiJdfQ==