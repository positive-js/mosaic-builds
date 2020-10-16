/**
 * @fileoverview added by tsickle
 * Generated from: modal-util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IClickPosition() { }
if (false) {
    /** @type {?} */
    IClickPosition.prototype.x;
    /** @type {?} */
    IClickPosition.prototype.y;
}
export class ModalUtil {
    /**
     * @param {?} document
     */
    constructor(document) {
        this.document = document;
        this.lastPosition = { x: -1, y: -1 };
        this.listenDocumentClick();
    }
    /**
     * @return {?}
     */
    getLastClickPosition() {
        return this.lastPosition;
    }
    /**
     * @return {?}
     */
    listenDocumentClick() {
        this.document.addEventListener('click', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.lastPosition = { x: event.clientX, y: event.clientY };
        }));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ModalUtil.prototype.lastPosition;
    /**
     * @type {?}
     * @private
     */
    ModalUtil.prototype.document;
}
/** @type {?} */
export const modalUtilObject = new ModalUtil(document);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLG9DQUdDOzs7SUFGRywyQkFBVTs7SUFDViwyQkFBVTs7QUFHZCxNQUFNLE9BQU8sU0FBUzs7OztJQUdsQixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELG9CQUFvQjtRQUNoQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTzs7OztRQUFFLENBQUMsS0FBaUIsRUFBRSxFQUFFO1lBQzFELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBQyxDQUFDO1FBQzdELENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKOzs7Ozs7SUFoQkcsaUNBQXFDOzs7OztJQUV6Qiw2QkFBMEI7OztBQWdCMUMsTUFBTSxPQUFPLGVBQWUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIElDbGlja1Bvc2l0aW9uIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgTW9kYWxVdGlsIHtcbiAgICBwcml2YXRlIGxhc3RQb3NpdGlvbjogSUNsaWNrUG9zaXRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCkge1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHt4OiAtMSwgeTogLTF9O1xuICAgICAgICB0aGlzLmxpc3RlbkRvY3VtZW50Q2xpY2soKTtcbiAgICB9XG5cbiAgICBnZXRMYXN0Q2xpY2tQb3NpdGlvbigpOiBJQ2xpY2tQb3NpdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBsaXN0ZW5Eb2N1bWVudENsaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHt4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZfTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbW9kYWxVdGlsT2JqZWN0ID0gbmV3IE1vZGFsVXRpbChkb2N1bWVudCk7XG4iXX0=