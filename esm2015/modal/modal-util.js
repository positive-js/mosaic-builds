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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxvQ0FHQzs7O0lBRkcsMkJBQVU7O0lBQ1YsMkJBQVU7O0FBR2QsTUFBTSxPQUFPLFNBQVM7Ozs7SUFHbEIsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCxvQkFBb0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxtQkFBbUI7UUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU87Ozs7UUFBRSxDQUFDLEtBQWlCLEVBQUUsRUFBRTtZQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUMsQ0FBQztRQUM3RCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjs7Ozs7O0lBaEJHLGlDQUFxQzs7Ozs7SUFFekIsNkJBQTBCOzs7QUFnQjFDLE1BQU0sT0FBTyxlQUFlLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJQ2xpY2tQb3NpdGlvbiB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIE1vZGFsVXRpbCB7XG4gICAgcHJpdmF0ZSBsYXN0UG9zaXRpb246IElDbGlja1Bvc2l0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB7eDogLTEsIHk6IC0xfTtcbiAgICAgICAgdGhpcy5saXN0ZW5Eb2N1bWVudENsaWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0TGFzdENsaWNrUG9zaXRpb24oKTogSUNsaWNrUG9zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0UG9zaXRpb247XG4gICAgfVxuXG4gICAgbGlzdGVuRG9jdW1lbnRDbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB7eDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WX07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1vZGFsVXRpbE9iamVjdCA9IG5ldyBNb2RhbFV0aWwoZG9jdW1lbnQpO1xuIl19