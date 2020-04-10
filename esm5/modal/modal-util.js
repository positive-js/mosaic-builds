/**
 * @fileoverview added by tsickle
 * Generated from: modal-util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var ModalUtil = /** @class */ (function () {
    function ModalUtil(document) {
        this.document = document;
        this.lastPosition = { x: -1, y: -1 };
        this.listenDocumentClick();
    }
    /**
     * @return {?}
     */
    ModalUtil.prototype.getLastClickPosition = /**
     * @return {?}
     */
    function () {
        return this.lastPosition;
    };
    /**
     * @return {?}
     */
    ModalUtil.prototype.listenDocumentClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.document.addEventListener('click', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.lastPosition = { x: event.clientX, y: event.clientY };
        }));
    };
    return ModalUtil;
}());
export { ModalUtil };
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
export var modalUtilObject = new ModalUtil(document);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxvQ0FHQzs7O0lBRkcsMkJBQVU7O0lBQ1YsMkJBQVU7O0FBR2Q7SUFHSSxtQkFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCx3Q0FBb0I7OztJQUFwQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsdUNBQW1COzs7SUFBbkI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTzs7OztRQUFFLFVBQUMsS0FBaUI7WUFDdEQsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFDLENBQUM7UUFDN0QsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDOzs7Ozs7O0lBaEJHLGlDQUFxQzs7Ozs7SUFFekIsNkJBQTBCOzs7QUFnQjFDLE1BQU0sS0FBTyxlQUFlLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJQ2xpY2tQb3NpdGlvbiB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIE1vZGFsVXRpbCB7XG4gICAgcHJpdmF0ZSBsYXN0UG9zaXRpb246IElDbGlja1Bvc2l0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB7eDogLTEsIHk6IC0xfTtcbiAgICAgICAgdGhpcy5saXN0ZW5Eb2N1bWVudENsaWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0TGFzdENsaWNrUG9zaXRpb24oKTogSUNsaWNrUG9zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0UG9zaXRpb247XG4gICAgfVxuXG4gICAgbGlzdGVuRG9jdW1lbnRDbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB7eDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WX07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1vZGFsVXRpbE9iamVjdCA9IG5ldyBNb2RhbFV0aWwoZG9jdW1lbnQpO1xuIl19