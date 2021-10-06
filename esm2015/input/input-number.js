import { Attribute, Directive, ElementRef, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { END, C, V, X, A, Z, DELETE, BACKSPACE, TAB, ENTER, ESCAPE, ZERO, NINE, NUMPAD_ZERO, NUMPAD_NINE, NUMPAD_MINUS, DASH, FF_MINUS, LEFT_ARROW, RIGHT_ARROW, HOME, UP_ARROW, DOWN_ARROW, F1, F12 } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export const BIG_STEP = 10;
export const SMALL_STEP = 1;
export function normalizeSplitter(value) {
    return value ? value.replace(/,/g, '.') : value;
}
export function isFloat(value) {
    return /^-?\d+\.\d+$/.test(value);
}
export function isInt(value) {
    return /^-?\d+$/.test(value);
}
export function isDigit(value) {
    return isFloat(value) || isInt(value);
}
export function getPrecision(value) {
    const arr = value.toString().split('.');
    return arr.length === 1
        ? 1
        // tslint:disable-next-line:no-magic-numbers
        : Math.pow(10, arr[1].length);
}
export function add(value1, value2) {
    const precision = Math.max(getPrecision(value1), getPrecision(value2));
    return (value1 * precision + value2 * precision) / precision;
}
export class McNumberInput {
    constructor(elementRef, ngControl, step, bigStep, min, max) {
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.focused = false;
        this.stateChanges = new Subject();
        this.step = isDigit(step) ? parseFloat(step) : SMALL_STEP;
        this.bigStep = isDigit(bigStep) ? parseFloat(bigStep) : BIG_STEP;
        this.min = isDigit(min) ? parseFloat(min) : -Infinity;
        this.max = isDigit(max) ? parseFloat(max) : Infinity;
        if ('valueAsNumber' in this.nativeElement) {
            Object.defineProperty(Object.getPrototypeOf(this.nativeElement), 'valueAsNumber', {
                // tslint:disable-next-line:no-reserved-keywords
                get() {
                    const res = parseFloat(normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        const keyCode = event.keyCode;
        const isCtrlA = (e) => e.keyCode === A && (e.ctrlKey || e.metaKey);
        const isCtrlC = (e) => e.keyCode === C && (e.ctrlKey || e.metaKey);
        const isCtrlV = (e) => e.keyCode === V && (e.ctrlKey || e.metaKey);
        const isCtrlX = (e) => e.keyCode === X && (e.ctrlKey || e.metaKey);
        const isCtrlZ = (e) => e.keyCode === Z && (e.ctrlKey || e.metaKey);
        const isFKey = (e) => e.keyCode >= F1 && e.keyCode <= F12;
        const isNumber = (e) => (e.keyCode >= ZERO && e.keyCode <= NINE) ||
            (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE);
        const isPeriod = (e) => e.key === '.' || e.key === ',';
        const minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        const serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        const arrows = [LEFT_ARROW, RIGHT_ARROW];
        const allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
        if (allowedKeys.indexOf(keyCode) !== -1 ||
            isCtrlA(event) ||
            isCtrlC(event) ||
            isCtrlV(event) ||
            isCtrlX(event) ||
            isCtrlZ(event) ||
            isFKey(event) ||
            isPeriod(event)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is not a number and stop the keypress
        if (event.shiftKey || !isNumber(event)) {
            event.preventDefault();
            // process steps
            const step = event.shiftKey ? this.bigStep : this.step;
            if (keyCode === UP_ARROW) {
                this.stepUp(step);
            }
            if (keyCode === DOWN_ARROW) {
                this.stepDown(step);
            }
        }
    }
    onPaste(event) {
        if (!isDigit(normalizeSplitter(event.clipboardData.getData('text')))) {
            event.preventDefault();
        }
    }
    stepUp(step) {
        this.elementRef.nativeElement.focus();
        const res = Math.max(Math.min(add(this.nativeElement.valueAsNumber || 0, step), this.max), this.min);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    }
    stepDown(step) {
        this.elementRef.nativeElement.focus();
        const res = Math.min(Math.max(add(this.nativeElement.valueAsNumber || 0, -step), this.min), this.max);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    }
    viewToModelUpdate(value) {
        if (this.ngControl) {
            this.ngControl.control.setValue(value);
        }
    }
}
/** @nocollapse */ McNumberInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNumberInput, deps: [{ token: i0.ElementRef }, { token: i1.NgControl, optional: true, self: true }, { token: 'step', attribute: true }, { token: 'big-step', attribute: true }, { token: 'min', attribute: true }, { token: 'max', attribute: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNumberInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McNumberInput, selector: "input[mcInput][type=\"number\"]", inputs: { bigStep: "bigStep", step: "step", min: "min", max: "max" }, host: { listeners: { "blur": "focusChanged(false)", "focus": "focusChanged(true)", "paste": "onPaste($event)", "keydown": "onKeyDown($event)" } }, exportAs: ["mcNumericalInput"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNumberInput, decorators: [{
            type: Directive,
            args: [{
                    selector: `input[mcInput][type="number"]`,
                    exportAs: 'mcNumericalInput',
                    host: {
                        '(blur)': 'focusChanged(false)',
                        '(focus)': 'focusChanged(true)',
                        '(paste)': 'onPaste($event)',
                        '(keydown)': 'onKeyDown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['step']
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['big-step']
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['min']
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['max']
                }] }]; }, propDecorators: { bigStep: [{
                type: Input
            }], step: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2lucHV0L2lucHV0LW51bWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFFBQVEsRUFDUixJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFDSCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQ2pELE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLElBQUksRUFDaEUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFDekUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFHL0IsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUMzQixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRTVCLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUFhO0lBQzNDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3BELENBQUM7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFDLEtBQWE7SUFDakMsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFD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MkJBQUMsS0FBSzs0Q0EzQnBCLE9BQU87c0JBRE4sS0FBSztnQkFJTixJQUFJO3NCQURILEtBQUs7Z0JBSU4sR0FBRztzQkFERixLQUFLO2dCQUlOLEdBQUc7c0JBREYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQXR0cmlidXRlLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIEVORCwgQywgViwgWCwgQSwgWiwgREVMRVRFLCBCQUNLU1BBQ0UsIFRBQiwgRU5URVIsXG4gICAgRVNDQVBFLCBaRVJPLCBOSU5FLCBOVU1QQURfWkVSTywgTlVNUEFEX05JTkUsIE5VTVBBRF9NSU5VUywgREFTSCxcbiAgICBGRl9NSU5VUywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIEhPTUUsIFVQX0FSUk9XLCBET1dOX0FSUk9XLCBGMSwgRjEyXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IGNvbnN0IEJJR19TVEVQID0gMTA7XG5leHBvcnQgY29uc3QgU01BTExfU1RFUCA9IDE7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVTcGxpdHRlcih2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS5yZXBsYWNlKC8sL2csICcuJykgOiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmxvYXQodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXi0/XFxkK1xcLlxcZCskLy50ZXN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL14tP1xcZCskLy50ZXN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlnaXQodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0Zsb2F0KHZhbHVlKSB8fCBpc0ludCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmVjaXNpb24odmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgYXJyID0gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuXG4gICAgcmV0dXJuIGFyci5sZW5ndGggPT09IDFcbiAgICAgICAgPyAxXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIDogIE1hdGgucG93KDEwLCBhcnJbMV0ubGVuZ3RoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZCh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHByZWNpc2lvbiA9IE1hdGgubWF4KGdldFByZWNpc2lvbih2YWx1ZTEpLCBnZXRQcmVjaXNpb24odmFsdWUyKSk7XG5cbiAgICByZXR1cm4gKHZhbHVlMSAqIHByZWNpc2lvbiArIHZhbHVlMiAqIHByZWNpc2lvbikgLyBwcmVjaXNpb247XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBpbnB1dFttY0lucHV0XVt0eXBlPVwibnVtYmVyXCJdYCxcbiAgICBleHBvcnRBczogJ21jTnVtZXJpY2FsSW5wdXQnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhibHVyKSc6ICdmb2N1c0NoYW5nZWQoZmFsc2UpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXNDaGFuZ2VkKHRydWUpJyxcbiAgICAgICAgJyhwYXN0ZSknOiAnb25QYXN0ZSgkZXZlbnQpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTnVtYmVySW5wdXQge1xuICAgIEBJbnB1dCgpXG4gICAgYmlnU3RlcDogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBzdGVwOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIG1pbjogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBtYXg6IG51bWJlcjtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ3N0ZXAnKSBzdGVwOiBzdHJpbmcsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ2JpZy1zdGVwJykgYmlnU3RlcDogc3RyaW5nLFxuICAgICAgICBAQXR0cmlidXRlKCdtaW4nKSBtaW46IHN0cmluZyxcbiAgICAgICAgQEF0dHJpYnV0ZSgnbWF4JykgbWF4OiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5zdGVwID0gaXNEaWdpdChzdGVwKSA/IHBhcnNlRmxvYXQoc3RlcCkgOiBTTUFMTF9TVEVQO1xuICAgICAgICB0aGlzLmJpZ1N0ZXAgPSBpc0RpZ2l0KGJpZ1N0ZXApID8gcGFyc2VGbG9hdChiaWdTdGVwKSA6IEJJR19TVEVQO1xuICAgICAgICB0aGlzLm1pbiA9IGlzRGlnaXQobWluKSA/IHBhcnNlRmxvYXQobWluKSA6IC1JbmZpbml0eTtcbiAgICAgICAgdGhpcy5tYXggPSBpc0RpZ2l0KG1heCkgPyBwYXJzZUZsb2F0KG1heCkgOiBJbmZpbml0eTtcblxuICAgICAgICBpZiAoJ3ZhbHVlQXNOdW1iZXInIGluIHRoaXMubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzLm5hdGl2ZUVsZW1lbnQpLCAndmFsdWVBc051bWJlcicsIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcmVzZXJ2ZWQta2V5d29yZHNcbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHBhcnNlRmxvYXQobm9ybWFsaXplU3BsaXR0ZXIodGhpcy52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpc05hTihyZXMpID8gbnVsbCA6IHJlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzQ2hhbmdlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGNvbnN0IGlzQ3RybEEgPSAoZSkgPT4gZS5rZXlDb2RlID09PSBBICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KTtcbiAgICAgICAgY29uc3QgaXNDdHJsQyA9IChlKSA9PiBlLmtleUNvZGUgPT09IEMgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpO1xuICAgICAgICBjb25zdCBpc0N0cmxWID0gKGUpID0+IGUua2V5Q29kZSA9PT0gViAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSk7XG4gICAgICAgIGNvbnN0IGlzQ3RybFggPSAoZSkgPT4gZS5rZXlDb2RlID09PSBYICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KTtcbiAgICAgICAgY29uc3QgaXNDdHJsWiA9IChlKSA9PiBlLmtleUNvZGUgPT09IFogJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpO1xuXG4gICAgICAgIGNvbnN0IGlzRktleSA9IChlKSA9PiBlLmtleUNvZGUgPj0gRjEgJiYgZS5rZXlDb2RlIDw9IEYxMjtcblxuICAgICAgICBjb25zdCBpc051bWJlciA9IChlKSA9PiAoZS5rZXlDb2RlID49IFpFUk8gJiYgZS5rZXlDb2RlIDw9IE5JTkUpIHx8XG4gICAgICAgICAgICAoZS5rZXlDb2RlID49IE5VTVBBRF9aRVJPICYmIGUua2V5Q29kZSA8PSBOVU1QQURfTklORSk7XG5cbiAgICAgICAgY29uc3QgaXNQZXJpb2QgPSAoZSkgPT4gZS5rZXkgPT09ICcuJyB8fCBlLmtleSA9PT0gJywnO1xuXG4gICAgICAgIGNvbnN0IG1pbnVzZXMgPSBbTlVNUEFEX01JTlVTLCBEQVNILCBGRl9NSU5VU107XG4gICAgICAgIGNvbnN0IHNlcnZpY2VLZXlzID0gW0RFTEVURSwgQkFDS1NQQUNFLCBUQUIsIEVTQ0FQRSwgRU5URVJdO1xuICAgICAgICBjb25zdCBhcnJvd3MgPSBbTEVGVF9BUlJPVywgUklHSFRfQVJST1ddO1xuICAgICAgICBjb25zdCBhbGxvd2VkS2V5cyA9ICBbSE9NRSwgRU5EXS5jb25jYXQoYXJyb3dzKS5jb25jYXQoc2VydmljZUtleXMpLmNvbmNhdChtaW51c2VzKTtcblxuICAgICAgICBpZiAoYWxsb3dlZEtleXMuaW5kZXhPZihrZXlDb2RlKSAhPT0gLTEgfHxcbiAgICAgICAgICAgIGlzQ3RybEEoZXZlbnQpIHx8XG4gICAgICAgICAgICBpc0N0cmxDKGV2ZW50KSB8fFxuICAgICAgICAgICAgaXNDdHJsVihldmVudCkgfHxcbiAgICAgICAgICAgIGlzQ3RybFgoZXZlbnQpIHx8XG4gICAgICAgICAgICBpc0N0cmxaKGV2ZW50KSB8fFxuICAgICAgICAgICAgaXNGS2V5KGV2ZW50KSB8fFxuICAgICAgICAgICAgaXNQZXJpb2QoZXZlbnQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBub3QgYSBudW1iZXIgYW5kIHN0b3AgdGhlIGtleXByZXNzXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSB8fCAhaXNOdW1iZXIoZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBwcm9jZXNzIHN0ZXBzXG4gICAgICAgICAgICBjb25zdCBzdGVwID0gZXZlbnQuc2hpZnRLZXkgPyB0aGlzLmJpZ1N0ZXAgOiB0aGlzLnN0ZXA7XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBVUF9BUlJPVykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RlcFVwKHN0ZXApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RlcERvd24oc3RlcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBhc3RlKGV2ZW50KSB7XG4gICAgICAgIGlmICghaXNEaWdpdChub3JtYWxpemVTcGxpdHRlcihldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKSkpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RlcFVwKHN0ZXA6IG51bWJlcikge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIGNvbnN0IHJlcyA9IE1hdGgubWF4KE1hdGgubWluKGFkZCh0aGlzLm5hdGl2ZUVsZW1lbnQudmFsdWVBc051bWJlciB8fCAwLCBzdGVwKSwgdGhpcy5tYXgpLCB0aGlzLm1pbik7XG5cbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlID0gcmVzLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdGhpcy52aWV3VG9Nb2RlbFVwZGF0ZSh0aGlzLm5hdGl2ZUVsZW1lbnQudmFsdWVBc051bWJlcik7XG4gICAgfVxuXG4gICAgc3RlcERvd24oc3RlcDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgY29uc3QgcmVzID0gTWF0aC5taW4oTWF0aC5tYXgoYWRkKHRoaXMubmF0aXZlRWxlbWVudC52YWx1ZUFzTnVtYmVyIHx8IDAsIC1zdGVwKSwgdGhpcy5taW4pLCB0aGlzLm1heCk7XG5cbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlID0gcmVzLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdGhpcy52aWV3VG9Nb2RlbFVwZGF0ZSh0aGlzLm5hdGl2ZUVsZW1lbnQudmFsdWVBc051bWJlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aWV3VG9Nb2RlbFVwZGF0ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbCEuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19