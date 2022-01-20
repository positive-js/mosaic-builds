import { ChangeDetectorRef, Directive, EventEmitter, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PopUpVisibility } from './constants';
import * as i0 from "@angular/core";
// tslint:disable-next-line:naming-convention
export class McPopUp {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.classMap = {};
        this.visibility = PopUpVisibility.Initial;
        this.visibleChange = new EventEmitter();
        /** Subject for notifying that the tooltip has been hidden from the view */
        this.onHideSubject = new Subject();
        this.closeOnInteraction = false;
    }
    ngOnDestroy() {
        clearTimeout(this.showTimeoutId);
        clearTimeout(this.hideTimeoutId);
        this.onHideSubject.complete();
    }
    isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    show(delay) {
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
        }
        this.closeOnInteraction = true;
        this.showTimeoutId = setTimeout(() => {
            this.showTimeoutId = undefined;
            this.visibility = PopUpVisibility.Visible;
            this.visibleChange.emit(true);
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this.markForCheck();
        }, delay);
    }
    hide(delay) {
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
        }
        this.hideTimeoutId = setTimeout(() => {
            this.hideTimeoutId = undefined;
            this.visibility = PopUpVisibility.Hidden;
            this.visibleChange.emit(false);
            this.onHideSubject.next();
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this.markForCheck();
        }, delay);
    }
    isVisible() {
        return this.visibility === PopUpVisibility.Visible;
    }
    updateClassMap(placement, customClass, classMap) {
        this.classMap = {
            [`${this.prefix}_placement-${placement}`]: true,
            [customClass]: !!customClass,
            ...classMap
        };
    }
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden() {
        return this.onHideSubject.asObservable();
    }
    markForCheck() {
        this.changeDetectorRef.markForCheck();
    }
    animationStart() {
        this.closeOnInteraction = false;
    }
    animationDone({ toState }) {
        if (toState === PopUpVisibility.Hidden && !this.isVisible()) {
            this.onHideSubject.next();
        }
        if (toState === PopUpVisibility.Visible || toState === PopUpVisibility.Hidden) {
            this.closeOnInteraction = true;
        }
    }
    handleBodyInteraction() {
        if (this.closeOnInteraction) {
            this.hide(0);
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McPopUp.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McPopUp, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McPopUp.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McPopUp, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McPopUp, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wLXVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvcG9wLXVwL3BvcC11cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBYSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUk5Qyw2Q0FBNkM7QUFDN0MsTUFBTSxPQUFnQixPQUFPO0lBcUJ6QixZQUE4QixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQWpCbEUsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUlkLGVBQVUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUk1QywyRUFBMkU7UUFDeEQsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRTVDLHVCQUFrQixHQUFZLEtBQUssQ0FBQztJQUt1QixDQUFDO0lBRXRFLFdBQVc7UUFDUCxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQVU7UUFDcEIsT0FBTyxLQUFLLFlBQVksV0FBVyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYTtRQUNkLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FDM0IsR0FBRyxFQUFFO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFFL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLHdEQUF3RDtZQUN4RCwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUMsRUFDRCxLQUFLLENBQ1IsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYTtRQUNkLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQzNCLEdBQUcsRUFBRTtZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztZQUV6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTFCLHdEQUF3RDtZQUN4RCwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUMsRUFDRCxLQUFLLENBQ1IsQ0FBQztJQUNOLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFDdkQsQ0FBQztJQUVELGNBQWMsQ0FBQyxTQUFpQixFQUFFLFdBQW1CLEVBQUUsUUFBUztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLGNBQWMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJO1lBQy9DLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVc7WUFDNUIsR0FBRyxRQUFRO1NBQ2QsQ0FBQztJQUNOLENBQUM7SUFFRCxzRkFBc0Y7SUFDdEYsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVELGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBa0I7UUFDckMsSUFBSSxPQUFPLEtBQUssZUFBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN6RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxPQUFPLEtBQUssZUFBZSxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUMzRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtRQUNqQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQzs7MElBbkhpQixPQUFPOzhIQUFQLE9BQU87MkZBQVAsT0FBTztrQkFGNUIsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUG9wVXBWaXNpYmlsaXR5IH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbkBEaXJlY3RpdmUoKVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWNQb3BVcCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgaGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjbGFzc01hcCA9IHt9O1xuXG4gICAgd2FybmluZzogYm9vbGVhbjtcblxuICAgIHZpc2liaWxpdHkgPSBQb3BVcFZpc2liaWxpdHkuSW5pdGlhbDtcbiAgICB2aXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgcHJvdGVjdGVkIHByZWZpeDogc3RyaW5nO1xuXG4gICAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSB0b29sdGlwIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHRoZSB2aWV3ICovXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG9uSGlkZVN1YmplY3QgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBwcm90ZWN0ZWQgY2xvc2VPbkludGVyYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHNob3dUaW1lb3V0SWQ6IGFueTtcbiAgICBwcml2YXRlIGhpZGVUaW1lb3V0SWQ6IGFueTtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZW91dElkKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpbWVvdXRJZCk7XG5cbiAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgaXNUZW1wbGF0ZVJlZih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIHNob3coZGVsYXk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5oaWRlVGltZW91dElkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNob3dUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVvdXRJZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IFBvcFVwVmlzaWJpbGl0eS5WaXNpYmxlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWxheVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGhpZGUoZGVsYXk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZW91dElkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZW91dElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGlkZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlVGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IFBvcFVwVmlzaWJpbGl0eS5IaWRkZW47XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0Lm5leHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWxheVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJpbGl0eSA9PT0gUG9wVXBWaXNpYmlsaXR5LlZpc2libGU7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xhc3NNYXAocGxhY2VtZW50OiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcsIGNsYXNzTWFwPyk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsYXNzTWFwID0ge1xuICAgICAgICAgICAgW2Ake3RoaXMucHJlZml4fV9wbGFjZW1lbnQtJHtwbGFjZW1lbnR9YF06IHRydWUsXG4gICAgICAgICAgICBbY3VzdG9tQ2xhc3NdOiAhIWN1c3RvbUNsYXNzLFxuICAgICAgICAgICAgLi4uY2xhc3NNYXBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2hlbiB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB2aWV3LiAqL1xuICAgIGFmdGVySGlkZGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkhpZGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25TdGFydCgpIHtcbiAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25Eb25lKHsgdG9TdGF0ZSB9OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodG9TdGF0ZSA9PT0gUG9wVXBWaXNpYmlsaXR5LkhpZGRlbiAmJiAhdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0Lm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b1N0YXRlID09PSBQb3BVcFZpc2liaWxpdHkuVmlzaWJsZSB8fCB0b1N0YXRlID09PSBQb3BVcFZpc2liaWxpdHkuSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlT25JbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCb2R5SW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5oaWRlKDApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19